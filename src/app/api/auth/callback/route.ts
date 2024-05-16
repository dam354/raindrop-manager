// app/api/auth/callback.ts
import { NextRequest, NextResponse } from "next/server";

export const config = {
  runtime: "experimental-edge",
};

export async function GET(request: NextRequest) {
  const tokenResponse = await fetch("https://raindrop.io/oauth/access_token", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      grant_type: "authorization_code",
      code: request.nextUrl.searchParams.get("code"),
      client_id: process.env.NEXT_PUBLIC_CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: "http://localhost:3000/api/auth/callback",
    }),
  });

  if (!tokenResponse.ok) {
    return new NextResponse("Authorization Failed", { status: 401 });
  }

  const data = await tokenResponse.json();
  const response = NextResponse.redirect(new URL("/dashboard", request.url));
  response.headers.set(
    "Set-Cookie",
    `access_token=${data.access_token}; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=${data.expires_in}`
  );

  return response;
}
