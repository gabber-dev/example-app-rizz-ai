import { GoogleUser } from "../../model/google_user";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { CreditsController } from "./credits";
import { Configuration, UsageApiFactory } from "@/generated";

type UserInfo = {
  email: string;
  stripe_customer: string;
};

export class UserController {
  static async getUserFromCookies(): Promise<UserInfo | null> {
    const auth_token = cookies().get("auth_token");
    if (!auth_token) return null;
    try {
      const user = await UserController.getUserFromToken(auth_token.value);
      return user;
    } catch (e) {
      console.error(e);
      return null;
    }
  }

  static async getUserFromToken(token: string) {
    const decoded = jwt.verify(token, process.env.GABBER_API_KEY || "");
    const user: UserInfo = (decoded as any).data;
    return user;
  }

  static async createUsageToken() {
    const user = await UserController.getUserFromCookies();
    if (!user) {
      throw new Error("User not found");
    }
    const config = new Configuration({
      apiKey: process.env.GABBER_API_KEY,
    });
    const usageApi = UsageApiFactory(config);
    const usageToken = (
      await usageApi.createUsageToken({
        human_id: user.stripe_customer,
        limits: [{ type: "conversational_seconds", value: 1000 }],
      })
    ).data.token;
    return usageToken;
  }

  static async loginGoogleUser({
    access_token,
  }: {
    access_token: string;
  }): Promise<{ authToken: string }> {
    const userInfoReponse = await fetch(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      },
    );

    const userInfo: GoogleUser = await userInfoReponse.json();
    userInfo.id = userInfo.id.toString();
    let stripeCustomer = await CreditsController.getCustomerByEmail(
      userInfo.email,
    );
    if (!stripeCustomer) {
      stripeCustomer = await CreditsController.createCustomer({
        email: userInfo.email,
      });
    }
    const authToken = UserController.generateJWT({
      email: userInfo.email,
      stripe_customer: stripeCustomer?.id,
    });
    return { authToken };
  }

  static generateJWT(data: { email: string; stripe_customer: string }) {
    return jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365,
        data,
      },
      process.env.GABBER_API_KEY || "",
    );
  }
}
