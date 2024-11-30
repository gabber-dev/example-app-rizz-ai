import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../globals.css";
import { Header } from "@/components/Header";
import { UserController } from "@/lib/server/controller/user";
import { redirect } from "next/navigation";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

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
  if (user) {
    redirect("/app");
  }

  return (
    <html lang="en" data-theme="cupcake">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body className="relative">
        <div className="fixed top-0 left-0 right-0 h-[40px]">
          <Header />
        </div>
        <div className="absolute top-[40px] m-0 p-0 left-0 right-0">
          {children}
        </div>
      </body>
    </html>
  );
}
