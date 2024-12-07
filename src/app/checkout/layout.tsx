import Head from "next/head";
import "../globals.css";
import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";
import { redirect } from "next/navigation";
import { ClientSecretProvider } from "./ClientSecretProvider";

export const metadata = {
  title: "Rizz.AI - Go on AI Powered Dates",
  description:
    "Rizz.AI is a platform to help you practice your social skills with AI powered virtual dates.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await UserController.getUserFromCookies();
  if (!user) {
    redirect("/login");
  }
  const clientSecret = await CreditsController.getClientSecret({
    customer: user.stripe_customer,
  });

  return (
    <html lang="en" data-theme="rizz">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ClientSecretProvider clientSecret={clientSecret}>
        <body>{children}</body>
      </ClientSecretProvider>
    </html>
  );
}
