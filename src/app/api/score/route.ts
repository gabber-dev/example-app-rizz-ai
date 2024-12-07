import { ScoreController } from "@/lib/server/controller/score";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.nextUrl.searchParams.get("session");
  if (!session) {
    return Response.json({ error: "Session is required" }, { status: 400 });
  }

  const score = await ScoreController.calculateScore(session);
  return Response.json(score);
}
