import { serialize } from "cookie";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return NextResponse.json({ message: "Method Not Allowed" }, { status: 405 });
  }

  // Create a cookie with an expired date to effectively delete it
  const expiredCookie = serialize("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: -1, // Set maxAge to -1 to expire the cookie immediately
    path: "/",
  });

  const response = NextResponse.json({ message: "API key deleted successfully" });
  response.headers.set("Set-Cookie", expiredCookie);

  return response;
}
