import { loginUser } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

const schemaLogin = z.object({
  identifier: z.string().min(3),
  password: z.string().min(6),
});

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();

    const validateData = schemaLogin.safeParse(data);

    if (!validateData.success) {
      throw validateData.error;
    }

    const accessToken = await loginUser(data);
    return NextResponse.json(
      {
        accessToken,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const path = error.issues[0].path[0];
      const message = error.issues[0].message;
      return NextResponse.json(
        {
          message: `Invalid on path: ${path.toString()} with message: ${message}`,
        },
        {
          status: 400,
        }
      );
    } else if (error instanceof Error) {
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
