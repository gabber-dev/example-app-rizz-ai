import { ShinyButton } from "@/components/ShinyButton";
import { BorderButton } from "../../../../components/BorderButton";
import { useAppState } from "@/components/AppStateProvider";
import { useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import Stripe from "stripe";
import toast from "react-hot-toast";

export function PaywallPopup() {
  const { products, showPaywall } = useAppState();
  const router = useRouter();

  const recurringProducts = useMemo(() => {
    return products.filter(
      (product) => (product.default_price as any).type === "recurring",
    );
  }, [products]);

  const oneTimeProducts = useMemo(() => {
    return products.filter(
      (product) => (product.default_price as any).type === "one_time",
    );
  }, [products]);

  const getCheckoutSession = useCallback(
    async (priceId: string) => {
      const paywallSession = showPaywall?.session;
      console.log("NEIL paywallSession", paywallSession);
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price_id: priceId,
          gabber_session: paywallSession,
        }),
      });
      const data = await response.json();
      const checkoutSession: Stripe.Checkout.Session = data;
      if (!checkoutSession.url) {
        toast.error("Error creating checkout session");
        return;
      }
      router.push(checkoutSession.url);
    },
    [router, showPaywall?.session],
  );

  return (
    <div className="relative flex flex-col gap-2 items-center w-full h-full p-4 bg-base-100 rounded-lg">
      <div className="flex flex-col">
        <div className="w-full grow-2 flex gap-2">
          {recurringProducts.map((product) => {
            return (
              <ShinyButton
                key={product.id}
                className="h-full grow basis-0"
                onClick={async () => {
                  await getCheckoutSession((product.default_price as any).id);
                }}
              >
                <div className="flex flex-col gap-1">
                  <div className="text-lg font-bold text-primary-content">
                    ${(product.default_price as any).unit_amount / 100}
                  </div>
                  <div className="font-bold text-primary-content">
                    {product.name}
                  </div>
                </div>
              </ShinyButton>
            );
          })}
        </div>
      </div>
      <div className="w-full h-3/5 grow flex gap-2">
        {oneTimeProducts.map((product) => {
          return (
            <BorderButton
              onClick={() => {
                getCheckoutSession((product.default_price as any).id);
              }}
              key={product.id}
              className="h-full grow basis-0"
            >
              <div className="text-lg font-bold text-primary">
                ${(product.default_price as any).unit_amount / 100}
              </div>
              <div className="font-bold text-primary">{product.name}</div>
            </BorderButton>
          );
        })}
      </div>
    </div>
  );
}
