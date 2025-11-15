"use client";

import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { verifyingEmail } from "@/app/store/verifyEmailSlice";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const query = useSearchParams();
  const token = query.get("token");

  const { data, loading, error, isVerified } = useAppSelector(
    (state) => state.verifyEmail
  );

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (token) {
      dispatch(verifyingEmail(token));
    }
  }, [token, dispatch]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  return (
    <>
      {loading ? (
        <div className="bg-black w-full min-h-screen flex flex-col  justify-center items-center text-white">
          Verifying Your Email ...
        </div>
      ) : (
        <div className="bg-black w-full min-h-screen flex flex-col gap-4 justify-center items-center text-white">
          <div>Successfully verify your email, go sign in</div>
          <Link
            className="py-2 px-6 bg-blue-900 hover:bg-blue-950 rounded-md "
            href={"/login"}
          >
            Sign In
          </Link>
        </div>
      )}
    </>
  );
}
