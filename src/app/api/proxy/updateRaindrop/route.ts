import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { raindropId, updateData } = await request.json();
  const token = request.cookies.get("access_token");

  if (!token) {
    return new NextResponse(JSON.stringify({ message: "Authentication required" }), {
      status: 401,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  try {
    const response = await fetch(`https://api.raindrop.io/rest/v1/raindrop/${raindropId}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token.value}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      throw new Error(`Failed to update raindrop: ${response.statusText}`);
    }

    return new NextResponse(JSON.stringify({ message: "Raindrop updated successfully" }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ message: "Failed to update raindrop", error: error.message }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}