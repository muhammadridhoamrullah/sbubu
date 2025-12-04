import { cookies, headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import * as jose from "jose";

export async function GET(request: NextRequest) {
  try {
    const cookiesAuth = await (await cookies()).get("accessToken");

    if (!cookiesAuth) {
      return NextResponse.json(
        {
          message: "Unauthorized",
        },
        {
          status: 401,
        }
      );
    }

    const token = cookiesAuth.value;

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);
    const decoded = await jose.jwtVerify<{ _id: string; username: string }>(
      token,
      secret
    );

    const userId = decoded.payload._id;
    const username = decoded.payload.username;

    return NextResponse.json(
      {
        userId,
        username,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    } else {
      return NextResponse.json(
        {
          message: "Internal Server Error",
        },
        {
          status: 500,
        }
      );
    }
  }
}
