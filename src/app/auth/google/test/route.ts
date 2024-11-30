import { NextRequest } from "next/server";

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(request: NextRequest) {
  return new Response("Hello, world!");
}
