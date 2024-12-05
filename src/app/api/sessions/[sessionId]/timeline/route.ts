import { SessionController } from "@/lib/server/controller/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;

  try {
    const timeline = await SessionController.getSessionTimeline(sessionId);
    return NextResponse.json(timeline);
  } catch (error) {
    console.error('Failed to fetch session timeline:', error);
    return NextResponse.json({ error: 'Failed to fetch session timeline' }, { status: 500 });
  }
} 