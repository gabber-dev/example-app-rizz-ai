import { CreditsController } from "@/lib/server/controller/credits";
import { UserController } from "@/lib/server/controller/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const user = await UserController.getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 401 });
  }

  const { price_id, gabber_session } = await req.json();

  const checkoutSession = await CreditsController.createCheckoutSession({
    customer: user.stripe_customer,
    price: price_id,
    gabberSession: gabber_session,
  });

  return NextResponse.json(checkoutSession);
}
