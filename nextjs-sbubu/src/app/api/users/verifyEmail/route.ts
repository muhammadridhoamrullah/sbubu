import { verifyEmail } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const { token } = data;

    if (!token) {
      throw new Error("Token is required");
    }

    const verifyingEmail = await verifyEmail(token);

    return NextResponse.json(
      {
        message: verifyingEmail.message,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    return NextResponse.json(
      { message: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
