"use client";

import axios from "axios";
import { createContext, useContext, useState } from "react";
import Stripe from "stripe";

type AppStateContextType = {
  credits: number;
  hasPaid: boolean;
  products: Stripe.Product[];
  showPaywall: { session: string | null } | null;
  setShowPaywall: (paywall: { session: string | null } | null) => void;
  refreshCredits: () => void;
};

export const CreditContext = createContext<AppStateContextType | undefined>(
  undefined,
);

export function AppStateProvider({
  children,
  initialCredits,
  initialHasPaid,
  initialProducts,
}: {
  children: React.ReactNode;
  initialCredits: number;
  initialHasPaid: boolean;
  initialProducts: Stripe.Product[];
}) {
  const [credits, setCredits] = useState<number>(initialCredits);
  const [hasPaid, setHasPaid] = useState<boolean>(initialHasPaid);
  const [products, setProducts] = useState<Stripe.Product[]>(initialProducts);
  const [showPaywall, setShowPaywall] = useState<{ session: string | null } | null>(
    null,
  );

  const refreshCredits = async () => {
    const { balance } = (await axios.get("/api/credits")).data;
    setCredits(balance);
  };

  return (
    <CreditContext.Provider
      value={{
        credits,
        hasPaid,
        products,
        showPaywall,
        setShowPaywall,
        refreshCredits,
      }}
    >
      {children}
    </CreditContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(CreditContext);
  if (context === undefined) {
    throw new Error("useCredit must be used within a CreditProvider");
  }
  return context;
}
