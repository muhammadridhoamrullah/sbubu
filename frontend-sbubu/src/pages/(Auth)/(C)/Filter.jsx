import { useEffect, useState } from "react";
import GenerateMetadata from "../../../components/GenerateMetadata";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { doFiltering, filterReset } from "../../../store/filterSlice";

export default function Filter({ data }) {
  const dispatch = useDispatch();
  const {
    data: filterData,
    loading: filterLoading,
    error: filterError,
  } = useSelector((state) => state.filter);
  const [formData, setFormData] = useState({
    word: "",
    title: "",
    url: "",
  });

  useEffect(() => {
    if (filterError) {
      toast.error(filterError);
    }
  }, [filterError]);

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  async function submitHandlerWord(e) {
    e.preventDefault();
    dispatch(doFiltering("word", formData.word));

    setFormData({
      ...formData,
      word: "",
    });
    toast.success(`${formData.word} berhasil ditambahkan ke filter kata.`);
  }

  async function submitHandlerTitleMedia(e) {
    e.preventDefault();
    dispatch(doFiltering("title", formData.title));
    setFormData({
      ...formData,
      title: "",
    });
    toast.success(
      `${formData.title} berhasil ditambahkan ke filter link media`
    );
  }

  async function submitHandlerUrlMedia(e) {
    e.preventDefault();
    dispatch(doFiltering("url", formData.url));
    setFormData({
      ...formData,
      url: "",
    });
    toast.success(`${formData.url} berhasil ditambahkan ke filter link media.`);
  }

  const metadata = {
    title: `Filter - @${data?.username} | SBUBU`,
    description: "Halaman filter dan moderasi untuk kreator di SBUBU",
    keywords: "SBUBU, kreator, filter, moderasi, settings",
    ogType: "website",
  };

  if (filterLoading) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className="bg-purple-950/50 w-full h-fit flex flex-col gap-3 justify-start items-start">
        {/* Awal Filter */}
        <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
          {/* Awal Judul Filter */}
          <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
            Filter
          </div>
          {/* Akhir Judul Filter */}

          {/* Awal Isi Filter */}
          <div className=" p-4 w-full h-fit flex flex-col gap-2 justify-start items-start">
            {/* Awal Info Filter */}
            <div className="text-sm text-gray-600 ">
              Beberapa kata akan disensor secara default oleh sistem, untuk
              membolehkan kata-kata tersebut tambahkan tanda plus (+) di depan
              kata tersebut, contoh: +Anjing. Penggunaan Regex (khusus untuk
              kata disensor) didukung dengan tidak menyertai flag-nya, contoh:
              /g.*?a.*?c.*?o.*?r/. Kamu juga bisa menggunakan filter
              heavy-strict (memungkinkan kamu untuk memfilter teks lebih ketat)
              dengan mamsukkan teks dengan kurung kurawal, contoh: judol123.
            </div>
            {/* Akhir Info Filter */}
            {/* Awal Filter Teks */}
            <form
              onSubmit={submitHandlerWord}
              className=" w-full h-fit flex flex-col gap-1 justify-start items-start"
            >
              {/* Awal Judul Filter Teks */}
              <div>Filter Teks</div>
              {/* Akhir Judul Filter Teks */}

              {/* Awal Isi Filter Teks */}
              <div className=" w-full h-fit flex jusitfy-between items-center gap-4">
                <input
                  type="text"
                  name="word"
                  id="word"
                  placeholder="anjing, babi, setan"
                  onChange={changeHandler}
                  value={formData.word}
                  className={`bg-[#1A2B32]  h-fit p-2 placeholder:text-gray-500 outline-none rounded-md ${
                    formData.word.trim() === "" ? "w-full" : "w-3/4"
                  } transition-all duration-1000 `}
                />

                <button
                  type="submit"
                  className={`bg-blue-600 w-1/4 h-fit p-2 rounded-md hover:bg-blue-700 transition-all duration-1000 cursor-pointer ${
                    formData.word.trim() === "" ? "hidden" : "block"
                  }`}
                >
                  SUBMIT
                </button>
              </div>
              {/* Akhir Isi Filter Teks */}

              {/* Awal Info Filter Teks */}
              <div className="text-xs text-gray-600 italic">
                Pesan dukungan dan nama pendukung akan disensor atau dibolehkan
                jika mengandung kata-kata di atas ini. Pisahkan kata dengan
                tanda koma.
              </div>
              {/* Akhir Info Filter Teks */}
            </form>
            {/* Akhir Filter Teks */}

            {/* Awal Filter Judul Video Media */}
            <form
              onSubmit={submitHandlerTitleMedia}
              className=" w-full h-fit flex flex-col gap-1 justify-start items-start"
            >
              {/* Awal Judul Filter Video Media */}
              <div>Filter Kata Judul Media </div>
              {/* Akhir Judul Filter Video Media */}

              {/* Awal Isi Filter Video Media */}
              <div className="w-full h-fit flex justify-between items-center gap-4">
                {/* Awal Input */}
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Breastfeeding, Onisen"
                  className={`bg-[#1A2B32]  h-fit p-2 placeholder:text-gray-500 outline-none rounded-md ${
                    formData.title.trim() === "" ? "w-full" : "w-3/4"
                  } transition-all duration-1000 `}
                  onChange={changeHandler}
                  value={formData.title}
                />
                {/* Akhir Input */}

                {/* Awal Submit */}
                <button
                  type="submit"
                  className={`bg-blue-600 w-1/4 h-fit p-2 rounded-md hover:bg-blue-700 transition-all duration-1000 cursor-pointer ${
                    formData.title.trim() === "" ? "hidden" : "block"
                  }`}
                >
                  SUBMIT
                </button>
                {/* Akhir Submit */}
              </div>
              {/* Akhir Isi Filter Video Media */}

              {/* Awal Info Filter Video Media */}
              <div className="text-xs text-gray-600 italic">
                Video mediashare yang judulnya mengandung kata-kata di atas ini
                akan disensor atau dibolehkan. Pisahkan kata dengan tanda koma.
              </div>
              {/* Akhir Info Filter Video Media */}
            </form>
            {/* Akhir Filter Judul Video Media */}

            {/* Awal Filter Link Video Media */}
            <form
              onSubmit={submitHandlerUrlMedia}
              className=" w-full h-fit flex flex-col gap-1 justify-start items-start"
            >
              {/* Awal Judul Filter Link Video Media */}
              <div>Filter Link Video Media</div>
              {/* Akhir Judul Filter Link Video Media */}

              {/* Awal Isi Filter Link Video Media */}
              <div className="w-full h-fit flex justify-between items-center gap-4">
                {/* Awal Input */}
                <input
                  type="url"
                  name="url"
                  id="url"
                  placeholder="https://www.youtube.com/watch?v=RQBQOE43VYg"
                  className={`bg-[#1A2B32]  h-fit p-2 placeholder:text-gray-500 outline-none rounded-md ${
                    formData.url.trim() === "" ? "w-full" : "w-3/4"
                  } transition-all duration-1000 `}
                  onChange={changeHandler}
                  value={formData.url}
                />
                {/* Akhir Input */}

                {/* Awal Tombol Submit */}
                <button
                  type="submit"
                  className={`bg-blue-600 w-1/4 h-fit p-2 rounded-md hover:bg-blue-700 transition-all duration-1000 cursor-pointer ${
                    formData.url.trim() === "" ? "hidden" : "block"
                  }`}
                >
                  SUBMIT
                </button>
                {/* Akhir Tombol Submit */}
              </div>
              {/* Akhir Isi Filter Link Video Media */}

              {/* Awal Info Filter Link Video Media */}
              <div className="text-xs text-gray-600 italic">
                Mediashare yang berasal dari link berikut ini akan disensor.
              </div>
              {/* Akhir Info Filter Link Video Media */}
            </form>
            {/* Akhir Filter Link Video Media */}
          </div>
          {/* Akhir Isi Filter */}
        </div>
        {/* Akhir Filter */}
      </div>
    </>
  );
}
