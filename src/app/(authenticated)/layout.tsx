import type { Metadata } from "next";
import localFont from "next/font/local";
import { UserController } from "@/lib/server/controller/user";
import { redirect } from "next/navigation";
import "../globals.css";
import { ClientLayout } from "./client_layout";
import { CreditsController } from "@/lib/server/controller/credits";
import Head from "next/head";
import Script from "next/script";
import { AppStateProvider } from "@/components/AppStateProvider";
import {
  Configuration,
  PersonaApi,
  RealtimeApi,
  ScenarioApi,
} from "@/generated";

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
  if (!user) {
    redirect("/login");
  }
  const config = new Configuration({ apiKey: process.env.GABBER_API_KEY });
  const realtimeApi = new RealtimeApi(config);
  const personaApi = new PersonaApi(config);
  const scenarioApi = new ScenarioApi(config);

  const [sessions, personas, scenarios] = await Promise.all([
    realtimeApi.listRealtimeSessions(),
    personaApi.listPersonas(),
    scenarioApi.listScenarios(),
  ]);

  const [credits, hasPaid, products, usageToken] = await Promise.all([
    CreditsController.getCreditBalance(user.stripe_customer),
    CreditsController.checkHasPaid(user.stripe_customer),
    CreditsController.getProducts(),
    UserController.createUsageToken(),
  ]);

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
          usageToken={usageToken}
          initialCredits={credits}
          initialHasPaid={hasPaid}
          initialProducts={products}
          initialPersonas={personas.data.values}
          initialScenarios={scenarios.data.values}
          initialSessions={sessions.data.values}
        >
          <ClientLayout>{children}</ClientLayout>
        </AppStateProvider>
      </body>
    </html>
  );
}
