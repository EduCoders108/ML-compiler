// app/api/execute/route.ts
// app/api/execute/route.ts
import { NextRequest, NextResponse } from "next/server";

// Flask backend URL with fallback
const FLASK_API_URL =
  process.env.NEXT_PUBLIC_FLASK_API_URL || "http://localhost:5000";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { code } = body;

    if (!code) {
      return NextResponse.json(
        {
          status: "error",
          error: "No code provided",
        },
        { status: 400 }
      );
    }

    console.log(`Forwarding request to: ${FLASK_API_URL}/execute`); // Debug log

    // Forward the request to Flask backend
    const response = await fetch(`${FLASK_API_URL}execute`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code }),
    });

    // Rest of your code remains the same...

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error: any) {
    console.error("API route error:", error);
    return NextResponse.json(
      {
        status: "error",
        error: error.message || "Internal server error",
      },
      { status: 500 }
    );
  }
}
