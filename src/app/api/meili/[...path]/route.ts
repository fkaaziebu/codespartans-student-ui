import { NextRequest, NextResponse } from "next/server";

async function handler(request: NextRequest) {
  const meiliUrl = process.env.MEILI_URL;
  const apiKey = process.env.MEILI_MASTER_KEY;

  if (!meiliUrl) {
    return NextResponse.json({ message: "MEILI_URL is not configured" }, { status: 500 });
  }

  const { pathname, search } = new URL(request.url);
  const meiliPath = pathname.replace(/^\/api\/meili/, "");
  const targetUrl = `${meiliUrl}${meiliPath}${search}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };
  if (apiKey) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  const body = request.method !== "GET" && request.method !== "HEAD"
    ? await request.text()
    : undefined;

  const response = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}

export const GET = handler;
export const POST = handler;
