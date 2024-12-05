import { SessionController } from "@/lib/server/controller/session";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { sessionId: string } }
) {
  const { sessionId } = params;

  try {
    const messages = await SessionController.getSessionMessages(sessionId);
    return NextResponse.json(messages);
  } catch (error) {
    console.error('Failed to fetch session messages:', error);
    return NextResponse.json({ error: 'Failed to fetch session messages' }, { status: 500 });
  }
} 