import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Halaman({ data }) {
  const [copied, setCopied] = useState(false);
  const [selectedFileProfil, setSelectedFileProfil] = useState(null);
  const [selectedFileBanner, setSelectedFileBanner] = useState(null);
  const fileInputProfilRef = useRef(null);
  const fileInputBannerRef = useRef(null);

  function handleUploadProfilClick() {
    fileInputProfilRef.current.click();
  }

  function handleUploadBannerClick() {
    fileInputBannerRef.current.click();
  }

  function handleFileChangeProfil(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileProfil(file);
    }
  }

  function handleFileChangeBanner(e) {
    const file = e.target.files[0];
    if (file) {
      setSelectedFileBanner(file);
    }
  }

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
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden ">
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
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Profil */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Profil
        </div>
        {/* Akhir Judul Profil */}

        {/* Awal Isi Profil */}
        <div className="p-4 w-full h-fit flex flex-col gap-4 justify-start items-start">
          {/* Awal Foto Profil */}
          <div className=" w-full h-32 flex justify-between items-center gap-4">
            {/* Awal Foto */}
            <div className=" w-1/3 h-full relative overflow-hidden rounded-md">
              <img
                src={data?.avatarUrl || "/default-avatar.png"}
                alt={`Foto ${data?.username}`}
                className="absolute w-full h-full object-cover"
              />
            </div>
            {/* Akhir Foto */}

            {/* Awal Unggah */}
            <div className="w-2/3 h-full flex flex-col gap-1 justify-center items-start">
              {/* Awal Judul Foto Profil */}
              <label>Foto Profil</label>
              {/* Akhir Judul Foto Profil */}

              {/* Awal Unggah */}
              <div className="bg-[#1A2B32] w-full h-fit p-2 rounded-md flex justify-between items-center gap-2">
                <input
                  className=" w-full h-fit hidden"
                  type="file"
                  ref={fileInputProfilRef}
                  accept="image/*"
                  onChange={handleFileChangeProfil}
                />
                <div
                  className={`w-full h-full  truncate ${
                    selectedFileProfil ? "text-white" : "text-gray-500"
                  }`}
                >
                  {selectedFileProfil
                    ? selectedFileProfil.name
                    : "Tidak ada file dipilih"}
                </div>
                <button
                  type="button"
                  onClick={handleUploadProfilClick}
                  className="cursor-pointer text-blue-700 hover:text-blue-900 "
                >
                  Unggah
                </button>
              </div>
              {/* Akhir Unggah */}
            </div>
            {/* Akhir Unggah */}
          </div>
          {/* Akhir Foto Profil */}
          {/* Awal Foto Banner */}
          <div className=" w-full h-32 flex justify-between items-center gap-4">
            {/* Awal Foto Banner */}
            <div className="w-1/3 h-full relative overflow-hidden rounded-md">
              <img
                src={
                  `http://localhost:3000${data?.banner}` ||
                  "/defaultBanner2.jpg"
                }
                alt={`Banner ${data?.username}`}
                className="absolute w-full h-full object-cover"
              />
            </div>
            {/* Akhir Foto Banner */}

            {/* Awal Unggah Banner */}
            <div className="w-2/3 h-full flex flex-col gap-1 justify-center items-start">
              {/* Awal Judul Foto Banner */}
              <label>Foto Banner</label>
              {/* Akhir Judul Foto Banner */}

              {/* Awal Unggah Foto Banner */}
              <div className="bg-[#1A2B32] w-full h-fit p-2 rounded-md flex justify-between items-center gap-2">
                {/* Awal Input Foto Banner */}
                <input
                  type="file"
                  ref={fileInputBannerRef}
                  className="hidden"
                  accept="image/*"
                  onChange={handleFileChangeBanner}
                />
                {/* Akhir Input Foto Banner */}

                {/* Awal Nama File Foto Banner */}
                <div
                  className={`w-full h-full  truncate ${
                    selectedFileBanner ? "text-white" : "text-gray-500"
                  }`}
                >
                  {selectedFileBanner
                    ? selectedFileBanner.name
                    : "Tidak ada file dipilih"}
                </div>
                {/* Akhir Nama File Foto Banner */}

                {/* Awal Button Unggah */}
                <button
                  type="button"
                  onClick={handleUploadBannerClick}
                  className="cursor-pointer text-blue-700 hover:text-blue-900 "
                >
                  Unggah
                </button>
                {/* Akhir Button Unggah */}
              </div>
              {/* Akhir Unggah Foto Banner */}
            </div>
            {/* Akhir Unggah Banner */}
          </div>
          {/* Akhir Foto Banner */}

          {/* Awal Nama dan Username */}
          <div className=" w-full h-fit flex justify-between items-start gap-2">
            {/* Awal Nama */}
            <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
              {/* Awal Judul Nama */}
              <label>Nama</label>
              {/* Akhir Judul Nama */}

              {/* Awal Input Nama */}
              <input
                type="text"
                name="name"
                id="name"
                className="bg-[#1A2B32] w-full h-fit p-2 outline-none rounded-md placeholder:text-gray-500"
                placeholder="Dewa Beras Gerlong"
              />
              {/* Akhir Input Nama */}
            </div>
            {/* Akhir Nama */}
            {/* Awal Username */}
            <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
              {/* Awal Judul Username */}
              <label>Username</label>
              {/* Akhir Judul Username */}

              {/* Awal Input Username */}
              <input
                type="text"
                name="username"
                id="username"
                className="bg-[#1A2B32] w-full h-fit p-2 outline-none rounded-md placeholder:text-gray-500"
                placeholder="dewaberasgerlong"
              />
              {/* Akhir Input Username */}

              {/* Awal Info */}
              <div className="text-xs text-gray-500 italic">
                Hanya boleh angka, huruf, garis bawah dan titik
              </div>
              {/* Akhir Info */}
            </div>
            {/* Akhir Username */}
          </div>
          {/* Akhir Nama dan Username */}

          {/* Awal Bio */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <div>Bio</div>
            <textarea
              name="bio"
              id="bio"
              placeholder="Ceritakan singkat tentang diri kamu"
              className="bg-[#1A2B32] w-full h-28 p-2 placeholder:text-gray-500 outline-none rounded-md resize-none"
              maxLength={500}
            />
          </div>
          {/* Akhir Bio */}
        </div>
        {/* Akhir Isi Profil */}
      </div>
      {/* Akhir Profil */}
      {/* Awal Sosial Media */}
      <div className=" bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Sosial Media */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          Sosial Media
        </div>
        {/* Akhir Judul Sosial Media */}

        {/* Awal Isi Sosial Media */}
        <div className="p-4 w-full h-fit flex flex-col gap-2 justify-start items-start">
          {/* Awal Input Youtube */}
          <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Judul Youtube */}
            <label>Youtube</label>
            {/* Akhir Judul Youtube */}

            {/* Awal Input Youtube */}
            <input
              type="url"
              name="youtube"
              id="youtube"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder:text-gray-500"
              placeholder="https://www.youtube.com/channel/UCy3zgWom-5AGypGX_FVTKpg"
            />
            {/* Akhir Input Youtube */}
          </div>
          {/* Akhir Input Youtube */}

          {/* Awal Instagram */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Judul Instagram */}
            <label>Instagram</label>
            {/* Akhir Judul Instagram */}

            {/* Awal Input Instagram */}
            <input
              type="url"
              name="instagram"
              id="instagram"
              placeholder="https://www.instagram.com/oliviarodrigo/?hl=en"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder:text-gray-500"
            />
            {/* Akhir Input Instagram */}
          </div>
          {/* Akhir Instagram */}

          {/* Awal TikTok */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Judul TikTok */}
            <label>TikTok</label>
            {/* Akhir Judul TikTok */}

            {/* Awal Input TikTok */}
            <input
              type="url"
              name="tiktok"
              id="tiktok"
              placeholder="https://www.tiktok.com/@livbedumb?lang=en"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder:text-gray-500"
            />
            {/* Akhir Input TikTok */}
          </div>
          {/* Akhir TikTok */}

          {/* Awal Twitter */}
          <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Judul Twitter */}
            <label>Twitter</label>
            {/* Akhir Judul Twitter */}

            {/* Awal Input Twitter */}
            <input
              type="url"
              name="twitter"
              id="twitter"
              placeholder="https://x.com/oliviarodrigo"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder:text-gray-500"
            />
            {/* Akhir Input Twitter */}
          </div>
          {/* Akhir Twitter */}

          {/* Awal Threads */}
          <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
            {/* Awal Judul Threads */}
            <label>Threads</label>

            {/* Akhir Judul Threads */}

            {/* Awal Input Threads */}
            <input
              type="url"
              name="threads"
              id="threads"
              placeholder="https://www.threads.com/@oliviarodrigo"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder:text-gray-500"
            />
            {/* Akhir Input Threads */}
          </div>
          {/* Akhir Threads */}
        </div>
        {/* Akhir Isi Sosial Media */}
      </div>
      {/* Akhir Sosial Media */}
      {/* Awal Danger */}
      <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
        {/* Awal Judul Danger */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          ⛔ Danger ⛔
        </div>
        {/* Akhir Judul Danger */}

        {/* Awal Isi Danger */}
        <div className="p-4 w-full h-fit flex flex-col gap-2 justify-start items-start">
          {/* Awal Hapus Akun */}
          <div className="bg-red-500 w-full h-fit p-4 text-center hover:bg-red-800 cursor-pointer rounded-xl">
            Hapus Akun
          </div>
          {/* Akhir Hapus Akun */}
        </div>
        {/* Akhir Isi Danger */}
      </div>
      {/* Akhir Danger */}
    </div>
  );
}

// bg-black/70
{
  /* <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">Halaman</div */
}
