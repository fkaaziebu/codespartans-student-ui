import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const restBaseUrl = process.env.REST_BASE_URL;

  if (!restBaseUrl) {
    return NextResponse.json({ message: "REST_BASE_URL is not configured" }, { status: 500 });
  }

  const body = await request.text();

  const response = await fetch(`${restBaseUrl}/v1/students/auth/consent`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body,
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
