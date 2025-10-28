import { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Halaman({ data }) {
  const [copied, setCopied] = useState(false);
  const [selectedFileProfil, setSelectedFileProfil] = useState(null);
  const [selectedFileBanner, setSelectedFileBanner] = useState(null);
  const fileInputProfilRef = useRef(null);
  const fileInputBannerRef = useRef(null);

  // Form
  const [formData, setFormData] = useState({
    name: data?.name || "",
    username: data?.username || "",
    bio: data?.bio || "",
    youtube: data?.socialMediaLinks?.youtube || "",
    instagram: data?.socialMediaLinks?.instagram || "",
    tiktok: data?.socialMediaLinks?.tiktok || "",
    twitter: data?.socialMediaLinks?.twitter || "",
    threads: data?.socialMediaLinks?.threads || "",
  });

  // Change Handler
  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleUploadProfilClick() {
    fileInputProfilRef.current.click();
  }

  function handleUploadBannerClick() {
    fileInputBannerRef.current.click();
  }

  function handleFileChangeProfil(e) {
    const file = e.target.files[0];
    console.log(file, "< ini file");

    if (file) {
      // Validasi tipe file (hanya gambar)
      if (!file.type.startsWith(`image/`)) {
        toast.error("File harus berupa gambar");
        return;
      }

      // Validasi ukuran file (maksimal 2MB)
      const maxSizeInBytes = 2 * 1024 * 1024; // 2MB
      if (file.size > maxSizeInBytes) {
        toast.error("Ukuran file maksimal 2MB");
        return;
      }

      setSelectedFileProfil(file);
      toast.success("File foto profil siap diunggah");
    }
  }

  function handleFileChangeBanner(e) {
    const file = e.target.files[0];
    if (file) {
      // Validasi tipe file (hanya gambar)
      if (!file.type.startsWith(`image/`)) {
        toast.error("File harus berupa gambar");
        return;
      }

      // Validasi ukuran file (maksimal 5MB)
      const maxSizeInBytes = 5 * 1024 * 1024;
      if (file.size > maxSizeInBytes) {
        toast.error("Ukuran file maksimal 5MB");
        return;
      }

      setSelectedFileBanner(file);
      toast.success("File banner siap diunggah");
    }
  }

  async function submitHandler(e) {
    e.preventDefault();

    // Nanti
    // const submitData = new FormData();
    // // Tambahkan text data
    // Object.keys(formData).forEach((key) => {
    //   submitData.append(key, formData[key]);
    // });

    // // Tambahkan file jika ada
    // if (selectedFileProfil) {
    //   submitData.append("fotoProfil", selectedFileProfil);
    // }

    // if (selectedFileBanner) {
    //   submitData.append("fotoBanner", selectedFileBanner);
    // }

    // try {
    //   const response = await fetch("/api/update-profile", {
    //     method: "POST",
    //     body: submitData,
    //     // Jangan set Content-Type, biar browser yang set otomatis untuk multipart/form-data
    //   });

    //   if (response.ok) {
    //     toast.success("Profil berhasil diperbarui");
    //   } else {
    //     toast.error("Gagal memperbarui profil");
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Terjadi kesalahan");
    // }
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

  async function handleClickDelete() {
    console.log(`Delete`);
  }
  return (
    <form
      onSubmit={submitHandler}
      className="w-full h-fit flex flex-col gap-3 justify-start items-start"
    >
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
                src={
                  selectedFileProfil
                    ? URL.createObjectURL(selectedFileProfil)
                    : data?.avatarUrl || "/defaultProfile.jpg"
                }
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

              {/* Awal Info Ukuran */}
              <div className="text-xs text-gray-500 italic">Maksimal 2MB.</div>
              {/* Akhir Info Ukuran */}
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
                  selectedFileBanner
                    ? URL.createObjectURL(selectedFileBanner)
                    : `http://localhost:3000/${data?.bannerUrl}` ||
                      "/defaultBanner.jpg"
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

              {/* Awal Info Ukuran */}
              <div className="text-xs text-gray-500 italic">Maksimal 5MB.</div>
              {/* Akhir Info Ukuran */}
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
                value={formData.name}
                onChange={changeHandler}
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
                value={formData.username}
                onChange={changeHandler}
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
              value={formData.bio}
              onChange={changeHandler}
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
              value={formData.youtube}
              onChange={changeHandler}
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
              value={formData.instagram}
              onChange={changeHandler}
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
              value={formData.tiktok}
              onChange={changeHandler}
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
              value={formData.twitter}
              onChange={changeHandler}
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
              value={formData.threads}
              onChange={changeHandler}
            />
            {/* Akhir Input Threads */}
          </div>
          {/* Akhir Threads */}
        </div>
        {/* Akhir Isi Sosial Media */}
      </div>
      {/* Akhir Sosial Media */}

      {/* Awal Button */}
      <button
        type="submit"
        className="bg-blue-600 w-full h-fit p-4 rounded-md text-xl font-semibold hover:bg-blue-800 transition-all duration-300 cursor-pointer text-center"
      >
        SUBMIT
      </button>
      {/* Akhir Button */}

      {/* Awal Danger */}
      <div
        onClick={handleClickDelete}
        className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden"
      >
        {/* Awal Judul Danger */}
        <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
          ⛔ Danger ⛔
        </div>
        {/* Akhir Judul Danger */}

        {/* Awal Isi Danger */}
        <div className="p-4 w-full h-fit flex flex-col gap-2 justify-start items-start">
          {/* Awal Hapus Akun */}
          <div className="bg-red-500 w-full h-fit p-4 text-center hover:bg-red-800 cursor-pointer rounded-xl">
            HAPUS AKUN
          </div>
          {/* Akhir Hapus Akun */}
        </div>
        {/* Akhir Isi Danger */}
      </div>
      {/* Akhir Danger */}
    </form>
  );
}

// bg-black/70
{
  /* <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">Halaman</div */
}
