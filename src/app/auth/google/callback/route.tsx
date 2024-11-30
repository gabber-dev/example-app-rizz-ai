import { UserController } from "@/lib/server/controller/user";
import { OAuth2Client } from "google-auth-library";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const client = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI,
  );

  const searchParams = req.nextUrl.searchParams;
  const code = searchParams.get("code");
  if (!code) {
    return Response.json({ message: "Missing code" }, { status: 400 });
  }

  const { tokens } = await client.getToken(code);
  const { access_token } = tokens;
  if (!access_token) {
    return Response.json({ message: "Missing access token" }, { status: 500 });
  }

  const { authToken } = await UserController.loginGoogleUser({
    access_token,
  });
  const cooks = await cookies();
  cooks.set("auth_token", authToken, {
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 180),
  });
  redirect("/");
}
