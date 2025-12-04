import * as jose from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

const tokenCache = new Map<
  string,
  {
    payload: {
      _id: string;
      username: string;
      email: string;
    };
    timestamp: number;
  }
>();

const CACHE_TTL = 5 * 60 * 1000; // 5 menit dalam milidetik

export async function proxy(request: NextRequest) {
  try {
    // Ambil token dari cookie
    const cookiesAuth = await (await cookies()).get("accessToken");
    console.log(cookiesAuth, "cookies");

    if (!cookiesAuth) {
      console.log("Jalan");

      return NextResponse.redirect(new URL("/login", request.url), {
        status: 307,
      });
    }

    // Ambil tokennya
    const token = cookiesAuth.value;

    // Cek apakah  token ada di cache
    const cachedToken = tokenCache.get(token);
    const now = Date.now();

    if (cachedToken && now - cachedToken.timestamp < CACHE_TTL) {
      // Jika ada di cache, gunakan data dari cache
      console.log("Ini Token dari Cache");
      const reqHeader = new Headers(request.headers);

      reqHeader.set("x-user-id", cachedToken.payload._id);
      reqHeader.set("x-username", cachedToken.payload.username);
      reqHeader.set("x-email", cachedToken.payload.email);

      //   Return dengan header yang sudah di-set
      return NextResponse.next({
        request: {
          headers: reqHeader,
        },
      });
    }

    // Jika tidak ada di cache, maka verifikasi token
    console.log("Ini Pkae Verification Token");

    const secret = new TextEncoder().encode(process.env.SECRET_KEY);

    // Verifikasi token menggunakan jose
    const decoded = await jose.jwtVerify<{
      _id: string;
      username: string;
      email: string;
    }>(token, secret);

    // Simpan token ke cache
    tokenCache.set(token, {
      payload: decoded.payload,
      timestamp: now,
    });

    // Set header baru dengan informasi user
    const reqHeader = new Headers(request.headers);

    reqHeader.set("x-user-id", decoded.payload._id);
    reqHeader.set("x-username", decoded.payload.username);
    reqHeader.set("x-email", decoded.payload.email);

    // Return dengan header yang sudah di-set
    return NextResponse.next({
      request: {
        headers: reqHeader,
      },
    });
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
          message: "Unknown error occurred",
        },
        {
          status: 500,
        }
      );
    }
  }
}

export const config = {
  matcher: [
    // untuk page
    "/creator/:username*",
  ],
};
