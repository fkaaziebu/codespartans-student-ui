import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const restBaseUrl = process.env.REST_BASE_URL;

  if (!restBaseUrl) {
    return NextResponse.json(
      { message: "REST_BASE_URL is not configured" },
      { status: 500 },
    );
  }

  const { search } = new URL(request.url);
  const targetUrl = `${restBaseUrl}/v1/students/auth/google/callback${search}`;

  const response = await fetch(targetUrl, { redirect: "manual" });

  const location = response.headers.get("location");
  if (location) {
    const absolute = new URL(location, restBaseUrl).toString();
    return NextResponse.redirect(absolute);
  }

  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: {
      "Content-Type":
        response.headers.get("Content-Type") ?? "application/json",
    },
  });
}
