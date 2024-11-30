import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await UserController.getUserFromCookies();
  if (!user) {
    return new NextResponse(null, { status: 401 });
  }

  const { stripe_customer } = user;
  const balance = await CreditsController.getCreditBalance(stripe_customer);

  return NextResponse.json({ balance });
}
