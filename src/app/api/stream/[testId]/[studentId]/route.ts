import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ testId: string; studentId: string }> },
) {
  const { testId, studentId } = await params;
  const backendUrl = `${process.env.SSE_URL}/tests/${testId}/${studentId}/stream`;

  const upstream = await fetch(backendUrl, {
    headers: { Accept: "text/event-stream", "Cache-Control": "no-cache" },
  });

  if (!upstream.ok || !upstream.body) {
    return new Response("Failed to connect to upstream SSE", { status: 502 });
  }

  return new Response(upstream.body, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
      "X-Accel-Buffering": "no",
    },
  });
}
