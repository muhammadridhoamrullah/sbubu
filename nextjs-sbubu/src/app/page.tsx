"use client";
import Link from "next/link";
import Footer from "./components/Footer";
import Cookie from "js-cookie";
import { TbUserCircle } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";

export default function Home() {
  // Cek cookie apakah sudah login
  const token = Cookie.get("accessToken");

  return (
    <div className="bg-black w-full min-h-screen text-white flex flex-col gap-2 justify-start items-start p-4">
      {/* Awal Login dan Logo */}
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
            {/* Akhir Tanda Bawah/Atas */}
          </div>
        ) : (
          <Link href={"/login"} className="bg-orange-700 py-2 px-4 rounded-md">
            Login
          </Link>
        )}
        {/* Akhir Button Login */}
      </div>
      {/* Akhir Login dan Logo */}
      {/* Awal Wallpaper Landing Page */}
      <div className="bg-orange-800 w-full h-[500px] rounded-md overflow-hidden relative ">
        <img
          src={"/wallpaper2.png"}
          alt="Wallpaper"
          className="absolute w-full h-full"
        />
      </div>
      {/* Akhir Wallpaper Landing Page */}

      {/* Awal Intro Sbubu */}
      <div className="bg-[#020b30] w-full h-fit py-4 flex flex-col justify-center items-center gap-10 rounded-md">
        {/* Awal Apa Sich? */}
        <div className="text-5xl font-semibold">Apa sich SBUBU itu?</div>
        {/* Akhir Apa Sich? */}
        {/* Awal Penjelasan SBUBU */}
        <div className="w-2/3 text-center">
          Sbubu adalah platform inovatif yang membantu siapa saja untuk menerima
          dukungan finansial sebagai bentuk apresiasi dengan cara saling berbagi
          dan memberikan penghargaan, menjadikannya pilihan terbaik untuk
          streamer Indonesia yang ingin mendapatkan dukungan dari penggemar
          mereka!
        </div>
        {/* Akhir Penjelasan SBUBU */}
      </div>
      {/* Akhir Intro Sbubu */}
      {/* Awal Footer */}
      <Footer />
      {/* Akhir Footer */}
    </div>
  );
}
