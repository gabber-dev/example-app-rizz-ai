"use client";
import Script from "next/script";
import { useClientSecret } from "./ClientSecretProvider";

export default function Page() {
  const { clientSecret } = useClientSecret();
  const html = `
    <script async src="https://js.stripe.com/v3/pricing-table.js"></script>
    <stripe-pricing-table 
      pricing-table-id="prctbl_1P9bv2FCylVNbM2lHZNTorN4"
      publishable-key="pk_live_51P9benFCylVNbM2lRlkF8vOwRrd6XyouAcXtBjEjAX6R29ZOKT2Y3De4ah4771Tp1G9G8AEbHPXpUjBVfuzsUQFO00cuQn8e3e"
      customer-session-client-secret="${clientSecret}"
    >
    </stripe-pricing-table>
  `;

  return (
    <>
      <Script
        async
        strategy="beforeInteractive"
        src="https://js.stripe.com/v3/pricing-table.js"
      ></Script>
      <div className="mt-10" dangerouslySetInnerHTML={{ __html: html }} />
    </>
  );
}
