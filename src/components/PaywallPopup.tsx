import { useAppState } from "@/components/AppStateProvider";
import { useCallback, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Stripe from "stripe";
import toast from "react-hot-toast";

const ProductCard = ({
  product,
  onClick,
}: {
  product: Stripe.Product;
  onClick: () => void;
}) => {
  return (
    <div
      key={product.id}
      className={`
        flex flex-col items-center justify-center 
        bg-primary text-white p-2 rounded-lg shadow-md 
        cursor-pointer relative
        before:absolute before:inset-0 before:rounded-[inherit]
        before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)]
        before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0]
        before:bg-no-repeat before:[transition:background-position_0s_ease]
        hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]
      `}
      style={{ height: "60px", width: "100%" }}
      onClick={onClick}
    >
      <div className="text-lg font-bold">
        {product.metadata.credit_amount} Credits
      </div>
      <div className="text-sm">
        ${((product.default_price as any).unit_amount / 100).toFixed(2)}
      </div>
    </div>
  );
};

export function PaywallPopup() {
  const { products, showPaywall, hasPaid } = useAppState();
  const [activeTab, setActiveTab] = useState(hasPaid ? "oneTime" : "recurring");
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
    <div className="flex flex-col items-center w-full h-full p-6 bg-base-100 rounded-lg shadow-lg">
      <div className="flex justify-center w-full mb-4">
        <div className="flex bg-base-200 rounded-full overflow-hidden">
          <button
            className={`px-4 py-2 transition-colors duration-300 ${
              activeTab === "recurring"
                ? "bg-primary text-white"
                : "text-primary"
            }`}
            onClick={() => setActiveTab("recurring")}
          >
            Discounted Plans
          </button>
          <button
            className={`px-4 py-2 transition-colors duration-300 ${
              activeTab === "oneTime" ? "bg-primary text-white" : "text-primary"
            }`}
            onClick={() => setActiveTab("oneTime")}
          >
            Buy More Credits
          </button>
        </div>
      </div>
      <div
        className="flex flex-col w-full max-w-3xl gap-6"
        style={{ height: "calc(100% - 100px)" }}
      >
        {activeTab === "recurring" && (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">
              Recurring Plans
            </h2>
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {recurringProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={async () => {
                      await getCheckoutSession((product.default_price as any).id);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
        {activeTab === "oneTime" && (
          <section className="flex flex-col h-full">
            <h2 className="text-2xl font-bold text-white mb-4 flex-shrink-0">
              One-time Token Grant
            </h2>
            <div className="overflow-y-auto flex-1">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pb-4">
                {oneTimeProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onClick={() => {
                      getCheckoutSession((product.default_price as any).id);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
