import {
  Configuration,
  CreditApiFactory,
  CreditLedgerEntry,
} from "@/generated";
import Stripe from "stripe";
import { v4 } from "uuid";

export class CreditsController {
  private static getStripeClient() {
    if (!process.env.STRIPE_SECRET_KEY) {
      throw new Error("Stripe secret key not found");
    }
    return new Stripe(process.env.STRIPE_SECRET_KEY);
  }

  static async getCustomer(customer_id: string) {
    const client = await CreditsController.getStripeClient();
    const customer = await client.customers.retrieve(customer_id);
    if (customer.deleted) {
      throw new Error("Customer deleted");
    }
    return customer.id;
  }

  static async getCustomerByEmail(email: string) {
    const client = await CreditsController.getStripeClient();
    const customers = await client.customers.list({ email });
    if (customers.data.length === 0 || customers.data[0].deleted) {
      return null;
    }
    return customers.data[0];
  }

  static async getClientSecret({ customer }: { customer: string }) {
    const client = await CreditsController.getStripeClient();
    const session = await client.customerSessions.create({
      customer,
      components: {
        pricing_table: { enabled: true },
      },
    });

    return session.client_secret!;
  }

  static async createCheckoutSession({
    customer,
    price,
    gabberSession,
  }: {
    customer: string;
    price: string;
    gabberSession?: string;
  }) {
    const client = await CreditsController.getStripeClient();
    const priceObj = await client.prices.retrieve(price, {
      expand: ["product"],
    });
    const metadata = (priceObj.product as Stripe.Product).metadata;
    const mode = priceObj.type === "recurring" ? "subscription" : "payment";
    const redirectUrl = gabberSession
      ? process.env.STRIPE_REDIRECT_HOST + `/score?session=${gabberSession}`
      : process.env.STRIPE_REDIRECT_HOST;
    const session = await client.checkout.sessions.create({
      customer,
      payment_method_types: ["card"],
      line_items: [
        {
          price, // Replace with your Price ID
          quantity: 1,
        },
      ],
      mode,
      success_url: redirectUrl,
      cancel_url: redirectUrl,
      metadata,
      subscription_data: mode === "subscription" ? { metadata } : undefined,
      payment_intent_data:
        mode === "payment"
          ? {
              metadata,
            }
          : undefined,
    });
    return session;
  }

  static async createCustomer({ email }: { email: string }) {
    const client = await CreditsController.getStripeClient();
    const customer = await client.customers.create({ email });
    return customer;
  }

  static async getProducts() {
    const client = await CreditsController.getStripeClient();
    const products = await client.products.list({
      expand: ["data.default_price"],
    });
    return products.data;
  }

  static async grantFreeCredits(amountCents: number, customer: string) {
    // Free credits for first login
    const client = await CreditsController.getStripeClient();
    await client.billing.creditGrants.create({
      customer: customer,
      name: "Welcome Bonus Credit",
      applicability_config: {
        scope: {
          price_type: "metered",
        },
      },
      category: "promotional",
      amount: {
        type: "monetary",
        monetary: {
          value: amountCents,
          currency: "usd",
        },
      },
    });
  }

  static async getCreditBalance(customer: string) {
    if (!process.env.GABBER_CREDIT_ID) {
      throw new Error("Server misconfigured - missing credit id");
    }

    const configuration = new Configuration({
      apiKey: process.env.GABBER_API_KEY,
    });
    const creditApi = CreditApiFactory(configuration);
    const client = await CreditsController.getStripeClient();
    let latestCreditDate = new Date(0);
    try {
      const latestLedgerEntry = (
        await creditApi.apiV1CreditCreditLedgerLatestGet(
          process.env.GABBER_CREDIT_ID,
          { headers: { "x-human-id": customer } },
        )
      ).data;
      latestCreditDate = new Date(latestLedgerEntry.created_at);
    } catch (e: any) {
      console.error("Failed to get latest tracked charge", e.message);
    }

    // First apply any credits that have been paid for

    const charges = await client.charges.list({
      customer,
      expand: ["data.invoice", "data.payment_intent"],
      created: {
        // Fetch stripe charges 1 minute before the last credit to account for server drift.
        // Duplicates will be handled by the idempotency_key when adding the ledger entry
        // via the Gabber API
        gte: Math.round(latestCreditDate.getTime() / 1000) - 60 * 1000,
      },
    });

    let latestLedgerEntry: CreditLedgerEntry | null = null;
    for (const charge of charges.data) {
      let amountStr = "0";
      if (charge.invoice) {
        const invoice = charge.invoice as Stripe.Invoice;
        amountStr =
          invoice.subscription_details?.metadata?.credit_amount || "0";
      } else if (charge.payment_intent) {
        const paymentIntent = charge.payment_intent as Stripe.PaymentIntent;
        amountStr = paymentIntent.metadata.credit_amount || "0";
      }
      const amount = parseInt(amountStr);
      if (isNaN(amount)) {
        console.error(
          "Failed to parse metadata 'credit_amount' field. Make sure it exists on your product and is an integer",
          amount,
        );
        continue;
      }
      console.log("Processing charge", amount);
      try {
        latestLedgerEntry = (
          await creditApi.apiV1CreditCreditLedgerPost(
            process.env.GABBER_CREDIT_ID,
            {
              amount,
              idempotency_key: charge.id,
            },
            { headers: { "x-human-id": customer } },
          )
        ).data;
      } catch (e: any) {
        console.warn(
          "Failed to add ledger entry, this can be normal if idempotency_keys collide.\
          Collisions are themselves normal because the gabber server clock and stripe server clock may have drifted apart.",
          e.message,
        );
      }
    }

    try {
      const newLatestEntry = (
        await creditApi.apiV1CreditCreditLedgerLatestGet(
          process.env.GABBER_CREDIT_ID,
          { headers: { "x-human-id": customer } },
        )
      ).data;
      return newLatestEntry.balance;
    } catch (e: any) {
      return 0;
    }
  }

  static async checkHasPaid(customer: string) {
    const client = await CreditsController.getStripeClient();
    const charges = await client.charges.list({
      customer,
      limit: 1,
    });
    return charges.data.length > 0;
  }

  static async reportCreditUsage(customer: string, amount: number) {
    if (!process.env.GABBER_CREDIT_ID) {
      throw new Error("Server misconfigured - missing credit id");
    }
    const configuration = new Configuration({
      apiKey: process.env.GABBER_API_KEY,
    });
    const creditApi = CreditApiFactory(configuration);
    creditApi.apiV1CreditCreditLedgerPost(
      process.env.GABBER_CREDIT_ID,
      {
        amount,
        idempotency_key: v4(),
      },
      { headers: { "x-human-id": customer } },
    );
  }
}
