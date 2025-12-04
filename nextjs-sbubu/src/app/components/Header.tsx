"use client";
import Link from "next/link";
import { TbUserCircle } from "react-icons/tb";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { fetchHeaderData } from "../store/headerSlice";

export default function Header() {
  const token = Cookie.get("accessToken");
  const dispatch = useAppDispatch();
  const { dataHeader, errorHeader, loadingHeader } = useAppSelector(
    (state) => state.header
  );

  useEffect(() => {
    if (token) {
      dispatch(fetchHeaderData());
    }
  }, [token, dispatch]);

  return (
    <div className="border border-[#0E1948] w-full h-fit p-4 rounded-xl flex justify-between items-center">
      {/* Awal Logo */}
      <div className=" w-32 h-10 relative">
        <img
          src={"/sbubu-png-coloron.png"}
          alt="Logo Sbubu"
          className="w-full h-full absolute"
        />
      </div>
      {/* Akhir Logo */}
      {/* Awal Button Login */}

      {token ? (
        <Link
          href={`/creator/${dataHeader?.username}`}
          className=" w-fit h-fit  flex justify-center items-center gap-2 hover:bg-[#0E1948]/40 px-2 rounded-md transition-all duration-500"
        >
          {/* Awal Logo Sbubu */}
          <div className=" w-10 h-10 overflow-hidden rounded-full relative">
            <TbUserCircle className="w-full h-full absolute" />
          </div>
          {/* Akhir Logo Sbubu */}
          {/* Awal Tanda Bawah/Atas */}
          <div>{dataHeader?.username}</div>
          {/* Akhir Tanda Bawah/Atas */}
        </Link>
      ) : (
        <Link href={"/login"} className="bg-orange-700 py-2 px-4 rounded-md">
          Login
        </Link>
      )}
      {/* Akhir Button Login */}
    </div>
  );
}
