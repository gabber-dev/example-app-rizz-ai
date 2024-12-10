import { NextRequest } from "next/server";
import crypto from "crypto";
import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";

export async function POST(req: NextRequest) {
  const textBody = await req.text();
  const webhookSignature = req.headers.get("X-Webhook-Signature");
  const key = process.env.GABBER_API_KEY;

  if (!webhookSignature) {
    return new Response("No signature provided", { status: 400 });
  }

  if (!key) {
    return new Response("Server misconfigured - missing API key");
  }

  const computedSignature = crypto
    .createHmac("sha256", key)
    .update(textBody, "utf8")
    .digest("hex");

  if (computedSignature !== webhookSignature) {
    // This could be from the wrong api key configured here or in the webhook gabber dashboard
    // or it could be from a malicious actor trying to send a request
    console.error("Signature mismatch");
    return new Response("Invalid signature", { status: 403 });
  }

  const parsedBody = JSON.parse(textBody);
  const { type, payload } = parsedBody;
  if (type === "usage.tracked") {
    const { human_id, type, value } = payload;
    if (type === "conversational_seconds") {
      // Use 1 credit per second
      const creditCost = value;
      const resp = await CreditsController.reportCreditUsage(
        human_id,
        creditCost * -1,
      );
      const entry = resp.data;
      await UserController.updateLimits(human_id, entry.balance);
    }
  }
  return new Response(null, { status: 200 });
}
