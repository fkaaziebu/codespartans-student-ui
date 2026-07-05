import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const restBaseUrl = process.env.REST_BASE_URL;

  if (!restBaseUrl) {
    return NextResponse.json({ message: "REST_BASE_URL is not configured" }, { status: 500 });
  }

  const { search } = new URL(request.url);
  const response = await fetch(`${restBaseUrl}/v1/students/auth/consent/info${search}`);
  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
