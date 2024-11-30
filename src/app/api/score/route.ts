import { ScoreController } from "@/lib/server/controller/score";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get("session");
  if (!session) {
    return {
      status: 400,
      json: { error: "Session is required" },
    };
  }

  const score = await ScoreController.calculateScore(session);
  return NextResponse.json(score);
}
