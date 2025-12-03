"use client";
import Link from "next/link";
import Footer from "./components/Footer";
import { TbUserCircle } from "react-icons/tb";
import { MdKeyboardArrowDown } from "react-icons/md";
import { MdKeyboardArrowUp } from "react-icons/md";
import Header from "./components/Header";

export default function Home() {
  

  return (
    <div className="bg-black w-full min-h-screen text-white flex flex-col gap-2 justify-start items-start p-4">
      {/* Awal Login dan Logo */}
      <Header />
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
