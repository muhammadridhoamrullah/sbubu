import Link from "next/link";
import { TbUserCircle } from "react-icons/tb";
import Cookie from "js-cookie";
import { useEffect, useState } from "react";

export default async function Header() {
  const token = Cookie.get("accessToken");

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
        <div className=" w-fit h-fit  flex justify-center items-center gap-2">
          {/* Awal Logo Sbubu */}
          <Link
            href={"/profile"}
            className=" w-10 h-10 overflow-hidden rounded-full relative"
          >
            <TbUserCircle className="w-full h-full absolute" />
          </Link>
          {/* Akhir Logo Sbubu */}
          {/* Awal Tanda Bawah/Atas */}
          <div></div>
          {/* Akhir Tanda Bawah/Atas */}
        </div>
      ) : (
        <Link href={"/login"} className="bg-orange-700 py-2 px-4 rounded-md">
          Login
        </Link>
      )}
      {/* Akhir Button Login */}
    </div>
  );
}
