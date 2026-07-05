import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

export async function POST(request: NextRequest) {
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;

  if (!paystackSecret) {
    return NextResponse.json(
      { message: "PAYSTACK_SECRET_KEY is not configured" },
      { status: 500 },
    );
  }

  const body = await request.text();
  const signature = request.headers.get("x-paystack-signature") ?? "";

  const hash = crypto
    .createHmac("sha512", paystackSecret)
    .update(body)
    .digest("hex");

  if (hash !== signature) {
    return NextResponse.json({ message: "Invalid signature" }, { status: 401 });
  }

  const backendUrl = process.env.GRAPHQL_BASE_URL?.replace("/graphql", "");
  console.log("backendUrl:", backendUrl);

  if (!backendUrl) {
    return NextResponse.json(
      { message: "Backend URL is not configured" },
      { status: 500 },
    );
  }

  const response = await fetch(`${backendUrl}/payments/paystack/webhook`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-paystack-signature": signature,
    },
    body,
  });

  console.log("response:", response);

  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
