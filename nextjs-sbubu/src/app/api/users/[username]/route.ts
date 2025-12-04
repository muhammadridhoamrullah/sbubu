import { getUserByUsername } from "@/db/model/user";
import { NextRequest, NextResponse } from "next/server";

interface Props {
  params: {
    username: string;
  };
}

export async function GET(request: NextRequest, { params }: Props) {
  try {
    const { username } = await params;

    const findUser = await getUserByUsername(username);

    return NextResponse.json(
      {
        data: findUser,
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
        { message: "Unknown error occurred" },
        { status: 500 }
      );
    }
  }
}
