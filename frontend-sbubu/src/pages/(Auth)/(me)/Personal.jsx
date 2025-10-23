import { useState } from "react";
import GenerateMetadata from "../../../components/GenerateMetadata";
import Profil from "./Profil";
import Session from "./Session";
import Transaksi from "./Transaksi";

export default function Personal() {
  const metadata = {
    title: "Pengaturan Akun Pribadi | SBUBU",
    description: "Halaman pengaturan akun pribadi untuk pengguna SBUBU",
    keywords: "SBUBU, pengaturan akun, pribadi, user, account, settings",
    ogType: "website",
  };

  const [activeMenu, setActiveMenu] = useState("profil");

  function handleMenuClick() {
    switch (activeMenu) {
      case "transaksi":
        return <Transaksi />;
      case "session":
        return <Session />;
      default:
        return <Profil />;
    }
  }
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className=" text-white w-3/4 h-fit flex justify-between items-start gap-5">
        {/* Awal List Menu */}
        <div className="bg-[#111D22] border border-gray-800 rounded-xl flex-1 flex flex-col  justify-start items-start overflow-hidden">
          <div className="w-full bg-[#1A2B32] py-1 px-3 text-xl ">Akun</div>

          <div className=" w-full h-fit flex flex-col gap-2 justify-between items-center p-5">
            <div
              onClick={() => setActiveMenu("profil")}
              className={`${
                activeMenu === "profil" ? "bg-[#86172c]" : "bg-[#1A2B32]"
              }  w-full h-fit p-3 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-700 transition-all duration-300 `}
            >
              Profil
            </div>
            <div
              onClick={() => setActiveMenu("transaksi")}
              className={`${
                activeMenu === "transaksi" ? "bg-[#86172c]" : "bg-[#1A2B32]"
              }  w-full h-fit p-3 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-700 transition-all duration-300`}
            >
              Transaksi
            </div>
            <div
              onClick={() => setActiveMenu("session")}
              className={`${
                activeMenu === "session" ? "bg-[#86172c]" : "bg-[#1A2B32]"
              }  w-full h-fit p-3 flex justify-center items-center cursor-pointer rounded-md hover:bg-gray-700 transition-all duration-300`}
            >
              Session
            </div>
          </div>
        </div>
        {/* Akhir List Menu */}

        {/* Awal Card */}
        <div className="flex-3">{handleMenuClick()}</div>
        {/* Akhir Card */}
      </div>
    </>
  );
}

