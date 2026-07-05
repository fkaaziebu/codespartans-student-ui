import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const graphqlUrl = process.env.GRAPHQL_BASE_URL;

  if (!graphqlUrl) {
    return NextResponse.json(
      { errors: [{ message: "GRAPHQL_BASE_URL is not configured" }] },
      { status: 500 },
    );
  }

  const body = await request.text();
  const authorization = request.headers.get("authorization") ?? "";

  console.log("graphqlUrl:", graphqlUrl);

  const response = await fetch(graphqlUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(authorization && { authorization }),
    },
    body,
  });

  const data = await response.text();

  return new Response(data, {
    status: response.status,
    headers: { "Content-Type": "application/json" },
  });
}
