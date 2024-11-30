import Head from "next/head";
import "../globals.css";
import { PHProvider } from "../providers";
import dynamic from "next/dynamic";
import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";
import { redirect } from "next/navigation";
import { ClientSecretProvider } from "./ClientSecretProvider";

const PostHogPageView = dynamic(() => import('../PostHogPageView'), {
  ssr: false,
})

export const metadata = {
  title: "Rizz.AI - Go on AI Powered Dates",
  description:
    "Rizz.AI is a platform to help you practice your social skills with AI powered virtual dates.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await UserController.getUserFromCookies()
  if(!user) {
    redirect("/login");
  }
  const clientSecret = await CreditsController.getClientSecret({
    customer: user.stripe_customer,
  });

  const userUTMParams = await UserController.getUTMParamsFromCookies();

  return (
    <html lang="en" data-theme="rizz">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PHProvider>
        <PostHogPageView utm_params={userUTMParams} />
        <ClientSecretProvider clientSecret={clientSecret}>
          <body>{children}</body>
        </ClientSecretProvider>
      </PHProvider>
    </html>
  );
}
