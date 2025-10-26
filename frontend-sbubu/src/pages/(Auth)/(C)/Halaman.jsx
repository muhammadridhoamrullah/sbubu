import { useState } from "react";
import toast from "react-hot-toast";

export default function Halaman({ data }) {
  const [copied, setCopied] = useState(false);

  //   fungsi untuk menyalin link halaman
  async function copyLink() {
    const link = `http://localhost:5173/${data?.username}`;
    try {
      await navigator.clipboard.writeText(link);
      setCopied(true);
      toast.success("Link berhasil disalin ke clipboard");

      setTimeout(() => {
        setCopied(false);
      }, 5000);
    } catch (error) {
      toast.error("Gagal menyalin link");
    }
  }

  async function openInNewTab() {
    const link = `http://localhost:5173/${data?.username}`;
    window.open(link, "_blank");
  }
  return (
    <div className="w-full h-fit flex flex-col gap-3 justify-start items-start">
      {/* Awal Halaman */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Halaman */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Halaman
        </div>
        {/* Akhir Judul Halaman */}

        {/* Awal Isi Halaman */}

        <div className=" p-4 w-full h-fit flex justify-between items-center">
          {/* Awal Link Halaman Kamu */}
          <div className="flex flex-col gap-1 justify-start items-start">
            <div>Link Halaman Kamu</div>
            <div className="font-semibold">
              http://localhost:5173/{data?.username}
            </div>
          </div>
          {/* Akhir Link Halaman Kamu */}
          {/* Awal Tombol Salin Link dan Buka di Tab Baru */}
          <div className=" flex justify-start items-center gap-2">
            <div
              onClick={copyLink}
              className={`${
                copied ? "bg-green-700" : "bg-pink-700"
              } p-2 rounded-md hover:bg-pink-800 cursor-pointer transition-all duration-300`}
            >
              {copied ? "✓ Tersalin" : "Salin Link"}
            </div>
            <div
              onClick={openInNewTab}
              className="bg-pink-700 p-2 rounded-md hover:bg-pink-800 cursor-pointer transition-all duration-300"
            >
              Buka di Tab Baru
            </div>
          </div>
          {/* Awal Tombol Salin Link dan Buka di Tab Baru */}
        </div>
        {/* Akhir Isi Halaman */}
      </div>
      {/* Akhir Halaman */}
      {/* Awal Profil */}
      <div className="bg-black/70">Profil</div>
      {/* Akhir Profil */}
      {/* Awal Sosial Media */}
      <div className=" bg-black/70">Sosial Media</div>
      {/* Akhir Sosial Media */}
      {/* Awal Danger */}
      <div className="bg-black/70">Danger</div>
      {/* Akhir Danger */}
    </div>
  );
}

// bg-black/70
{
  /* <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">Halaman</div */
}
