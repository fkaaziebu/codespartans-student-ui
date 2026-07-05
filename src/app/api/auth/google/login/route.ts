import { NextResponse } from "next/server";

export async function GET() {
  const restBaseUrl = process.env.REST_BASE_URL;

  if (!restBaseUrl) {
    return NextResponse.json({ message: "REST_BASE_URL is not configured" }, { status: 500 });
  }

  const response = await fetch(`${restBaseUrl}/v1/students/auth/google/login`, {
    redirect: "manual",
  });

  const location = response.headers.get("location");

  if (!location) {
    return NextResponse.json({ message: "No redirect from OAuth provider" }, { status: 502 });
  }

  return NextResponse.redirect(location);
}
