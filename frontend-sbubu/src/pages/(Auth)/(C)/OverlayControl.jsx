import { CiPause1 } from "react-icons/ci";
import { IoCopyOutline } from "react-icons/io5";
import { CiPlay1 } from "react-icons/ci";
import { IoPlaySkipForwardOutline } from "react-icons/io5";
import { RxTextNone } from "react-icons/rx";
import { IoEyeOffOutline } from "react-icons/io5";
import { LuRefreshCcw } from "react-icons/lu";
import { TbDeviceDesktopAnalytics } from "react-icons/tb";
import toast from "react-hot-toast";
import { useState } from "react";

export default function OverlayControl() {
  const [copied, setCopied] = useState("");

  const [perintahOverlay, setPerintahOverlay] = useState("");

  const alertThings = [
    { nama: "Pause", icon: <CiPause1 />, copy: "pause.com", perintah: "pause" },
    { nama: "Play", icon: <CiPlay1 />, copy: "play.com", perintah: "play" },
    {
      nama: "Skip / Next",
      icon: <IoPlaySkipForwardOutline />,
      copy: "skip.com",
      perintah: "skip",
    },
    {
      nama: "Sensor Teks",
      icon: <RxTextNone />,
      copy: "sensorteks.com",
      perintah: "sensorteks",
    },
    {
      nama: "Sensor Media",
      icon: <IoEyeOffOutline />,
      copy: "sensormedia.com",
      perintah: "sensormedia",
    },
    {
      nama: "Refresh",
      icon: <LuRefreshCcw />,
      copy: "refresh.com",
      perintah: "refresh",
    },
    {
      nama: "Tes",
      icon: <TbDeviceDesktopAnalytics />,
      copy: "tes.com",
      perintah: "tes",
    },
  ];

  const mediashareThings = [
    {
      nama: "Pause",
      icon: <CiPause1 />,
      copy: "mediamediapause.com",
      perintah: "medisharemediasharePause",
    },
    {
      nama: "Play",
      icon: <CiPlay1 />,
      copy: "mediaplay.com",
      perintah: "medishareplay",
    },
    {
      nama: "Skip / Next",
      icon: <IoPlaySkipForwardOutline />,
      copy: "mediaskip.com",
      perintah: "medishareskip",
    },
    {
      nama: "Sensor Teks",
      icon: <RxTextNone />,
      copy: "mediasensorteks.com",
      perintah: "medisharesensorteks",
    },
    {
      nama: "Sensor Media",
      icon: <IoEyeOffOutline />,
      copy: "mediasensormedia.com",
      perintah: "medisharesensormedia",
    },
    {
      nama: "Refresh",
      icon: <LuRefreshCcw />,
      copy: "mediarefresh.com",
      perintah: "medisharerefresh",
    },
    {
      nama: "Tes",
      icon: <TbDeviceDesktopAnalytics />,
      copy: "mediates.com",
      perintah: "medisharetes",
    },
  ];

  const soundboardThings = [
    {
      nama: "Pause",
      icon: <CiPause1 />,
      copy: "soundmediapause.com",
      perintah: "soundharemediasharePause",
    },
    {
      nama: "Play",
      icon: <CiPlay1 />,
      copy: "soundplay.com",
      perintah: "soundhareplay",
    },
    {
      nama: "Skip / Next",
      icon: <IoPlaySkipForwardOutline />,
      copy: "soundskip.com",
      perintah: "soundhareskip",
    },
    {
      nama: "Refresh",
      icon: <LuRefreshCcw />,
      copy: "soundrefresh.com",
      perintah: "soundharerefresh",
    },
    {
      nama: "Tes",
      icon: <TbDeviceDesktopAnalytics />,
      copy: "soundtes.com",
      perintah: "soundharetes",
    },
  ];

  const semuaOverlayThings = [
    {
      nama: "Refresh",
      icon: <LuRefreshCcw />,
      copy: "semuaOverrefresh.com",
      perintah: "semuaOverharerefresh",
    },
  ];

  function copyToClipboard(things) {
    try {
      navigator.clipboard.writeText(things);
      setCopied(things);
      toast.success("Berhasil menyalin ke clipboard.");
      setTimeout(() => {
        setCopied("");
      }, 5000);
    } catch (error) {
      toast.error("Gagal menyalin ke clipboard.");
    }
  }

  function funcPerintahOverlay(things) {
    try {
      setPerintahOverlay(things);
      toast.success(`Perintah ${things} berhasil dikirim ke overlay.`);

      setTimeout(() => {
        setPerintahOverlay("");
      }, 5000);
    } catch (error) {
      toast.error("Gagal mengirim perintah ke overlay.");
    }
  }

  return (
    <div className=" w-full h-fit flex flex-col gap-3 justify-start items-start">
      {/* Awal Kontrol Overlay */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Kontrol Overlay */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Kontrol Overlay
        </div>
        {/* Akhir Judul Kontrol Overlay */}

        {/* Awal Isi Kontrol Overlay */}
        <div className="p-4 w-full h-fit flex flex-col gap-2 justify-start items-start">
          {/* Awal Atur Live */}
          <div className="text-justify">
            Atur live overlay-mu di halaman ini, kamu juga bisa memasukkan
            halaman ini di aplikasi{" "}
            <span className="text-blue-500 font-bold">OBS Studio</span> secara
            langsung. Kamu juga bisa integrasikan kontrol ini dengan{" "}
            <span className="text-green-700 font-bold">Stream Deck</span>. Cek
            catatan di bawah untuk integrasi/pemasangan.
          </div>
          {/* Akhir Atur Live */}

          {/* Awal Garis Pembatas */}
          <div className="bg-gray-600 w-full h-0.5 rounded-full"></div>
          {/* Akhir Garis Pembatas */}

          {/* Awal Info Penggunaan */}
          <div className=" w-full h-fit flex flex-col gap-2 justify-start items-start">
            {/* Awal Judul Info Penggunaan */}
            <div>Informasi Penggunaan:</div>
            {/* Akhir Judul Info Penggunaan */}

            {/* Awal Isi Info Penggunaan */}
            <ul className="list-disc list-outside text-white text-sm space-y-1 px-4">
              <li>
                <span className="font-bold">Pause / Play</span> akan ter-reset
                ketika overlay di refresh.
              </li>
              <li>
                <span className="font-bold">Skip / Next</span> akan langsung
                memainkan antrian selanjutnya walaupun media sedang dimainkan.
              </li>
              <li>
                <span className="font-bold">Mute, Sensor, dan lainnya</span>{" "}
                hanya berefek pada overlay yang sedang dimainkan saja. Untuk
                antrian selanjutnya makan ada ter-reset kembali.
              </li>
              <li>
                Gunakan <span className="font-bold">Refresh</span> jika terdapat
                kesalahan pada sistem overlay.
              </li>
            </ul>
            {/* Akhir Isi Info Penggunaan */}
          </div>
          {/* Akhir Info Penggunaan */}
        </div>
        {/* Akhir Isi Kontrol Overlay */}
      </div>
      {/* Akhir Kontrol Overlay */}

      {/* Awal Pemasangan di OBS Studio */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Pemasangan di OBS Studio */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Pemasangan di OBS Studio
        </div>
        {/* Akhir Judul Pemasangan di OBS Studio */}

        {/* Awal Isi Pemasangan di OBS Studio */}
        <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start p-4">
          {/* Awal List Info */}
          <ol className="w-full h-fit  list-decimal list-outside text-white text-sm space-y-1 px-4">
            <li>
              Buka <span className="font-bold">OBS Studio</span>
            </li>
            <li>Klik pada menu Docks di bagian paling atas</li>
            <li>
              Klik Custom <span className="font-bold">Browser Docs</span>
            </li>
            <li>
              Masukkan “Kontrol Overlay Tako” pada bagian Dock Name, dan
              masukkan Link Halaman Kontrol Overlay pada bagian URL
            </li>
            <li>
              Klik <span className="font-bold">Apply</span> kemudian tarik
              tampilan web ke bagian kanan aplikasi OBS Studio atau ke area
              manapun yang kamu mau
            </li>
          </ol>
          {/* Akhir List Info */}

          <div className="bg-blue-500 w-full h-fit p-2 text-center rounded-md hover:bg-blue-800 cursor-pointer">
            Salin Link Halaman Kontrol
          </div>
        </div>
        {/* Akhir Isi Pemasangan di OBS Studio */}
      </div>
      {/* Akhir Pemasangan di OBS Studio */}

      {/* Awal Integrasi dengan Stream Deck */}

      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Integrasi dengan Stream Deck */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Integrasi dengan Stream Deck
        </div>
        {/* Akhir Judul Integrasi dengan Stream Deck */}

        {/* Awal Isi Pemasangan di OBS Studio */}

        <ol className="w-full h-fit  list-decimal list-outside text-white text-sm space-y-1 px-8 py-4">
          <li>Buat Action Website Baru (System - Website)</li>
          <li>
            Salin link kontrol dengan meng-klik icon copy (warna biru) pada aksi
            yang diinginkan dan masukkan link tersebut pada kotak URL.
          </li>
          <li>
            Centang{" "}
            <span className="font-bold">"GET request in background"</span>.
          </li>
        </ol>
        {/* Akhir Isi Pemasangan di OBS Studio */}
      </div>
      {/* Akhir Integrasi dengan Stream Deck */}

      {/* Awal Alert */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Alert */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">Alert</div>
        {/* Akhir Judul Alert */}

        {/* Awal Isi Alert */}
        <div className=" p-4 w-full h-fit flex flex-wrap justify-start items-center gap-4">
          {/* Awal Mapping Isi Tindakan Overlay */}
          {alertThings.map((el, idx) => (
            <div
              key={idx}
              className="bg-gray-700 hover:bg-gray-800 w-fit h-fit flex justify-center items-center rounded-full overflow-hidden cursor-pointer transition-all duration-300 "
            >
              {/* Awal Tindakan dan Icon */}
              <div
                onClick={() => funcPerintahOverlay(el.perintah)}
                className={`${
                  perintahOverlay === el.perintah ? "bg-green-700" : ""
                } w-fit h-full flex justify-start items-center gap-1 px-2 py-1`}
              >
                <div>{el.icon}</div>
                <div>{el.nama}</div>
              </div>
              {/* Akhir Tindakan dan Icon */}

              {/* Awal Icon Copy */}

              <div
                onClick={() => copyToClipboard(el.copy)}
                className={`${
                  copied === el.copy
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-gray-900 hover:bg-gray-950"
                } w-fit h-full px-2 py-1 transition-all duration-300`}
              >
                <IoCopyOutline className="m-1 text-blue-500 cursor-pointer hover:text-blue-500/50" />
              </div>
              {/* Akhir Icon Copy */}
            </div>
          ))}
          {/* Akhir Mapping Isi Tindakan Overlay */}
        </div>
        {/* Awal Isi Alert */}
      </div>
      {/* Akhir Alert */}

      {/* Awal Mediashare */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Mediashare */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Mediashare
        </div>
        {/* Akhir Judul Mediashare */}

        {/* Awal Isi Mediashare */}
        <div className=" p-4 w-full h-fit flex flex-wrap justify-start items-center gap-4">
          {/* Awal Mapping Isi Tindakan Overlay */}
          {mediashareThings.map((el, idx) => (
            <div
              key={idx}
              className="bg-gray-700 hover:bg-gray-800 w-fit h-fit flex justify-center items-center rounded-full overflow-hidden cursor-pointer transition-all duration-300 "
            >
              {/* Awal Tindakan dan Icon */}
              <div
                onClick={() => funcPerintahOverlay(el.perintah)}
                className={`${
                  perintahOverlay === el.perintah ? "bg-green-700" : ""
                } w-fit h-full flex justify-start items-center gap-1 px-2 py-1`}
              >
                <div>{el.icon}</div>
                <div>{el.nama}</div>
              </div>
              {/* Akhir Tindakan dan Icon */}

              {/* Awal Icon Copy */}

              <div
                onClick={() => copyToClipboard(el.copy)}
                className={`${
                  copied === el.copy
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-gray-900 hover:bg-gray-950"
                } w-fit h-full px-2 py-1 transition-all duration-300`}
              >
                <IoCopyOutline className="m-1 text-blue-500 cursor-pointer hover:text-blue-500/50" />
              </div>
              {/* Akhir Icon Copy */}
            </div>
          ))}
          {/* Akhir Mapping Isi Tindakan Overlay */}
        </div>
        {/* Awal Isi Mediashare */}
      </div>
      {/* Akhir Mediashare */}

      {/* Awal Soundboard */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Soundboard */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Soundboard
        </div>
        {/* Akhir Judul Soundboard */}

        {/* Awal Isi Soundboard */}
        <div className=" p-4 w-full h-fit flex flex-wrap justify-start items-center gap-4">
          {/* Awal Mapping Isi Tindakan Overlay */}
          {soundboardThings.map((el, idx) => (
            <div
              key={idx}
              className="bg-gray-700 hover:bg-gray-800 w-fit h-fit flex justify-center items-center rounded-full overflow-hidden cursor-pointer transition-all duration-300 "
            >
              {/* Awal Tindakan dan Icon */}
              <div
                onClick={() => funcPerintahOverlay(el.perintah)}
                className={`${
                  perintahOverlay === el.perintah ? "bg-green-700" : ""
                } w-fit h-full flex justify-start items-center gap-1 px-2 py-1`}
              >
                <div>{el.icon}</div>
                <div>{el.nama}</div>
              </div>
              {/* Akhir Tindakan dan Icon */}

              {/* Awal Icon Copy */}

              <div
                onClick={() => copyToClipboard(el.copy)}
                className={`${
                  copied === el.copy
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-gray-900 hover:bg-gray-950"
                } w-fit h-full px-2 py-1 transition-all duration-300`}
              >
                <IoCopyOutline className="m-1 text-blue-500 cursor-pointer hover:text-blue-500/50" />
              </div>
              {/* Akhir Icon Copy */}
            </div>
          ))}
          {/* Akhir Mapping Isi Tindakan Overlay */}
        </div>
        {/* Awal Isi Soundboard */}
      </div>
      {/* Akhir Soundboard */}

      {/* Awal Semua Overlay */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Soundboard */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Semua Overlay
        </div>
        {/* Akhir Judul Soundboard */}

        {/* Awal Isi Soundboard */}
        <div className=" p-4 w-full h-fit flex flex-wrap justify-start items-center gap-4">
          {/* Awal Mapping Isi Tindakan Overlay */}
          {semuaOverlayThings.map((el, idx) => (
            <div
              key={idx}
              className="bg-gray-700 hover:bg-gray-800 w-fit h-fit flex justify-center items-center rounded-full overflow-hidden cursor-pointer transition-all duration-300 "
            >
              {/* Awal Tindakan dan Icon */}
              <div
                onClick={() => funcPerintahOverlay(el.perintah)}
                className={`${
                  perintahOverlay === el.perintah ? "bg-green-700" : ""
                } w-fit h-full flex justify-start items-center gap-1 px-2 py-1`}
              >
                <div>{el.icon}</div>
                <div>{el.nama}</div>
              </div>
              {/* Akhir Tindakan dan Icon */}

              {/* Awal Icon Copy */}

              <div
                onClick={() => copyToClipboard(el.copy)}
                className={`${
                  copied === el.copy
                    ? "bg-green-700 hover:bg-green-800"
                    : "bg-gray-900 hover:bg-gray-950"
                } w-fit h-full px-2 py-1 transition-all duration-300`}
              >
                <IoCopyOutline className="m-1 text-blue-500 cursor-pointer hover:text-blue-500/50" />
              </div>
              {/* Akhir Icon Copy */}
            </div>
          ))}
          {/* Akhir Mapping Isi Tindakan Overlay */}
        </div>
        {/* Awal Isi Soundboard */}
      </div>
      {/* Akhir Semua Overlay */}
    </div>
  );
}

// {/* Awal Isi Alert */}
//       <div className="p-4 w-full h-fit flex flex-wrap justify-start items-center gap-2">
//         {/* Awal Pause */}
//         <div className="bg-gray-700 hover:bg-gray-800 w-fit h-fit  flex justify-self-start items-start rounded-full overflow-hidden cursor-pointer transition-all duration-300">
//           {/* Awal Icon Pause */}
//           <div className="w-full h-full flex justify-start items-center gap-1 px-2 py-1">
//             <CiPause1 />
//             <div>Pause</div>
//           </div>
//           {/* Akhir Icon Pause */}

//           {/* Awal Icon Copy */}

//           <div className="bg-gray-900 w-full h-full px-2 py-1 hover:bg-gray-950 cursor-pointer transition-all duration-300 flex justify-center items-center">
//             <IoCopyOutline className="m-1 text-blue-500 cursor-pointer hover:text-blue-500/50" />
//           </div>
//           {/* Akhir Icon Copy */}
//         </div>
//         {/* Akhir Pause */}

//       </div>
//       {/* Awal Isi Alert */}
