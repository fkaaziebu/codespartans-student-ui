import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const restBaseUrl = process.env.REST_BASE_URL;

  if (!restBaseUrl) {
    return NextResponse.json({ message: "REST_BASE_URL is not configured" }, { status: 500 });
  }

  const { pathname } = new URL(request.url);
  const imagePath = pathname.replace(/^\/api\/images/, "");

  const response = await fetch(`${restBaseUrl}/v1/images${imagePath}`);

  if (!response.ok) {
    return new Response(null, { status: response.status });
  }

  const contentType = response.headers.get("Content-Type") ?? "image/png";
  const buffer = await response.arrayBuffer();

  return new Response(buffer, {
    status: 200,
    headers: { "Content-Type": contentType },
  });
}
