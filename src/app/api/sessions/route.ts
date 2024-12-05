import { SessionController } from "@/lib/server/controller/session";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const humanId = formData.get('human_id');

  if (!humanId) {
    return NextResponse.json({ error: 'Missing human_id' }, { status: 400 });
  }

  try {
    const sessions = await SessionController.getSessions(humanId.toString());
    return NextResponse.json(sessions);
  } catch (error) {
    console.error('Failed to fetch sessions:', error);
    return NextResponse.json({ error: 'Failed to fetch sessions' }, { status: 500 });
  }
} 