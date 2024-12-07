"use client";

import React from "react";

type ClientSecretContextData = {
  clientSecret: string;
};

const ClientSecretContext = React.createContext<
  ClientSecretContextData | undefined
>(undefined);

export function ClientSecretProvider({
  children,
  clientSecret,
}: {
  children: React.ReactNode;
  clientSecret: string;
}) {
  return (
    <ClientSecretContext.Provider value={{ clientSecret }}>
      {children}
    </ClientSecretContext.Provider>
  );
}

export function useClientSecret() {
  const context = React.useContext(ClientSecretContext);
  if (context === undefined) {
    throw new Error(
      "useClientSecret must be used within a ClientSecretProvider",
    );
  }
  return context;
}
