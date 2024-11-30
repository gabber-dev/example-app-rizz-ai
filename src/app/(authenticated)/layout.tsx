import type { Metadata } from "next";
import localFont from "next/font/local";
import { UserController } from "@/lib/server/controller/user";
import { redirect } from "next/navigation";
import "../globals.css";
import { ClientLayout } from "./client_layout";
import { CreditsController } from "@/lib/server/controller/credits";
import Head from "next/head";
import Script from "next/script";
import { cookies } from "next/headers";
import { AppStateProvider } from "@/components/AppStateProvider";
import Stripe from "stripe";

const sfProRounded = localFont({
  src: [
    {
      path: "../fonts/SF-Pro-Rounded-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../fonts/SF-Pro-Text-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--sf-pro-rounded",
});

export const metadata: Metadata = {
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
  console.log("user", user);
  if (!user) {
    redirect("/login");
  }
  const credits = await CreditsController.getCreditBalance(user.stripe_customer);
  const hasPaid = await CreditsController.checkHasPaid(user.stripe_customer);
  const products = await CreditsController.getProducts();
  return (
    <html
      lang="en"
      data-theme="rizz"
      className={`${sfProRounded.className} ${sfProRounded.className}`}
    >
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=AW-305638678"
        strategy="afterInteractive"
      ></Script>
      <body className="relative h-screen bg-base-100">
        <AppStateProvider
          initialCredits={credits}
          initialHasPaid={hasPaid}
          initialProducts={products}
        >
          <ClientLayout>{children}</ClientLayout>
        </AppStateProvider>
      </body>
    </html>
  );
}
