"use client";

import Header from "@/app/components/Header";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { VscVerifiedFilled } from "react-icons/vsc";

export default function DonationPage() {
  const [data, setData] = useState(null);

  const { username } = useParams();
  console.log(data, "data");
  console.log(username, "username");
  console.log(process.env.NEXT_PUBLIC_CLIENT_URL, "URL");

  async function fetchData() {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_CLIENT_URL}/api/users/${username}`,
        {
          method: "GET",
        }
      );
      console.log(response, "Res");

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      setData(result.data);
    } catch (error) {
      if (error instanceof Error) {
        console.error("Error fetching data:", error.message);
      } else {
        console.error("Unknown error occurred while fetching data");
      }
    }
  }

  useEffect(() => {
    fetchData();
  }, [username]);
  return (
    <div className="bg-black w-full min-h-screen text-white p-4 flex flex-col gap-4 justify-start items-start">
      {/* Awal Header */}
      <Header />
      {/* Akhir Header */}

      {/* Awal Banner User */}
      <div className="bg-pink-500 w-full h-96 relative overflow-hidden rounded-lg ">
        <img
          src={"/defaultBanner.jpg"}
          alt="Banner User"
          className="w-full h-full absolute"
        />
      </div>
      {/* Akhir Banner User */}

      {/* Awal Profil, Form Donation, Menu */}
      <div className="w-full h-fit rounded-lg flex justify-between items-start gap-4">
        {/* Awal Profil */}
        <div className="bg-[#0E1948] w-2/7 h-52 rounded-lg p-4 flex flex-col gap-2 justify-start items-start ">
          {/* Awal Foto Profil dan Username */}
          <div className="bg-amber-900 w-full h-fit flex justify-start items-center gap-4 ">
            {/* Awal Foto Profil */}
            <div className=" w-24 h-24 rounded-full relative overflow-hidden flex-none">
              <img
                src={"/defaultAvatar.jpg"}
                alt="Foto Profil User"
                className="w-full h-full absolute"
              />
            </div>
            {/* Akhir Foto Profil */}
            {/* Awal Username */}
            <div className=" w-56 h-fit flex flex-col justify-start items-start">
              {/* Awal Nama Lengkap */}
              <div className=" w-full h-fit  flex justify-start items-start gap-1">
                <div className="flex-1 truncate">Muhammad Ridho Amrullah</div>
                <VscVerifiedFilled className="text-blue-600 w-5 h-5 flex-none" />
              </div>
              {/* Akhir Nama Lengkap */}
              {/* Awal Username */}
              <div className="text-sm text-gray-400">@ridhoamrullah</div>
              {/* Akhir Username */}
            </div>
            {/* Akhir Username */}
          </div>
          {/* Akhir Foto Profil dan Username */}
          {/* Awal Info User */}
          <div>Info User</div>
          {/* Akhir Info User */}
          {/* Awal Tombol Follow dan Share */}
          <div>Tombol</div>
          {/* Awal Tombol Follow dan Share */}
        </div>
        {/* Akhir Profil */}
        {/* Awal Form Donation */}
        <div className="bg-amber-900 w-4/7 h-96">Form Donation</div>
        {/* Akhir Form Donation */}

        {/* Awal Menu */}
        <div className="bg-red-900 w-1/7">Menu</div>
        {/* Akhir Menu */}
      </div>
      {/* Akhir Profil, Form Donation, Menu */}
    </div>
  );
}
