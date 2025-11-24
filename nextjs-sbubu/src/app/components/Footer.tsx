"use client";

import Link from "next/link";
import { RxDiscordLogo } from "react-icons/rx";
import { FaXTwitter } from "react-icons/fa6";
import { IoLogoInstagram } from "react-icons/io5";
import { PiTiktokLogo } from "react-icons/pi";
import { FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  const medsosLinkStyle =
    "bg-pink-800 p-2 rounded-full hover:bg-pink-950 transition-all duration-500";
  const medsosLogoStyle = "w-7 h-7";
  return (
    <div className="mt-10 w-full h-fit  flex flex-col gap-6 justify-center items-center">
      {/* Awal Logo */}
      <div className="w-24 h-20 relative">
        <img
          src={"/sbubu-logo.png"}
          alt="Logo Sbubu"
          className="w-full h-full absolute"
        />
      </div>
      {/* Akhir Logo */}
      {/* Awal Menu */}
      <div className="w-full h-fit flex justify-center items-center gap-2 font-extralight text-sm">
        <Link className="hover:text-blue-500" href={"/contact"}>
          Hubungi Kami
        </Link>
        <Link className="hover:text-blue-500" href={"/help"}>
          Bantuan & FAQ
        </Link>
        <Link className="hover:text-blue-500" href={"/status"}>
          Status Layanan
        </Link>
        <Link className="hover:text-blue-500" href={"/tnc"}>
          Syarat & Ketentuan
        </Link>
        <Link className="hover:text-blue-500" href={"/privacy-policy"}>
          Kebijakan Privasi
        </Link>
        <Link className="hover:text-blue-500" href={"/refund-policy"}>
          Kebijakan Refund
        </Link>
        <Link className="hover:text-blue-500" href={"/changelog"}>
          Changelog
        </Link>
      </div>
      {/* Akhir Menu */}
      {/* Awal Social Media */}
      <div className=" w-full h-fit flex justify-center items-center gap-3">
        {/* Awal Discord */}
        <Link
          className={medsosLinkStyle}
          href={"/discord.gg/sbubu"}
          target="_blank"
        >
          <RxDiscordLogo className={medsosLogoStyle} />
        </Link>
        {/* Akhir Discord */}
        {/* Awal X */}
        <Link className={medsosLinkStyle} href={"/x.com/sbubu"} target="_blank">
          <FaXTwitter className={medsosLogoStyle} />
        </Link>
        {/* Akhir X */}
        {/* Awal Instagram */}
        <Link
          className={medsosLinkStyle}
          href={"/instagram.com/sbubu"}
          target="_blank"
        >
          <IoLogoInstagram className={medsosLogoStyle} />
        </Link>
        {/* Akhir Instagram */}
        {/* Awal Tiktok */}
        <Link
          className={medsosLinkStyle}
          href={"/tiktok.com/sbubu"}
          target="_blank"
        >
          <PiTiktokLogo className={medsosLogoStyle} />
        </Link>
        {/* Akhir Tiktok */}
      </div>
      {/* Akhir Social Media */}
      {/* Awal Copyrights */}
      <div className="w-full h-fit flex flex-col justify-center items-center gap-1 text-xs">
        <div>&copy; 2025 Sbubu. Hak Cipta Dilindungi Undang-Undang.</div>
        <div>
          Merek dagang dari PT Sbubunesia, perusahaan terdaftar di Indonesia.
        </div>
      </div>
      {/* Akhir Copyrights */}
    </div>
  );
}
