import { useAppState } from "@/components/AppStateProvider";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { ShinyButton } from "./ShinyButton";

export function SignupWallPopup() {
  const { products } = useAppState();
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

  return (
    <div className="flex flex-col items-center w-full h-full p-6 bg-base-100 rounded-lg shadow-lg">
      <ShinyButton
        onClick={() => {
          router.push("/auth/google/login");
        }}
      >
        Signup
      </ShinyButton>
    </div>
  );
}
