import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTiktokMetadata } from "../../store/tiktokSlice";
import ReactPlayer from "react-player";
import toast from "react-hot-toast";

export default function Tiktok({ onDataChange, amount }) {
  const dispatch = useDispatch();
  const { data, error, loading, isComplete } = useSelector(
    (state) => state.tiktok
  );

  // State
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [tiktokId, setVideoId] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);

  //   Jalankan dispatch
  useEffect(() => {
    if (isValidUrl) {
      dispatch(fetchTiktokMetadata(tiktokUrl));
    }
  }, [dispatch, isValidUrl, tiktokUrl]);

  //   Cek error
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  //   Memberitahu parent component ketika data berubah
  useEffect(() => {
    if (isComplete && data && isValidUrl) {
      onDataChange({
        tiktokUrl: tiktokUrl,
        mediaDuration: kalkulasiDurasi(amount),
      });
    } else {
      onDataChange(null);
    }
  }, [isComplete, data, isValidUrl, tiktokId, onDataChange]);

  //   Function untuk kalkulasi durasi video berdasarkan amount
  function kalkulasiDurasi(amount) {
    if (amount >= 2500000) return 300; // 5 menit
    if (amount >= 1000000) return 240; // 4 menit
    if (amount >= 500000) return 180; // 3 menit
    if (amount >= 250000) return 120; // 2 menit
    if (amount >= 100000) return 60; // 1 menit
    if (amount >= 50000) return 30; // 30 detik
    if (amount >= 20000) return 15; // 15 detik
    return 10; // 10 detik
  }

  const durasiBerdasarkanAmount = kalkulasiDurasi(amount);

  //   Extract video ID dari URL Tiktok
  function extractVideoId(url) {
    if (!url) return null;
    const patterns = [
      /tiktok\.com\/@[\w.-]+\/video\/(\d+)/, // Standard URL
      /vm\.tiktok\.com\/([\w-]+)/, // Short URL
      /vt\.tiktok\.com\/([\w-]+)/, // Mobile short URL
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  //   Change handler
  function changeHandler(e) {
    const url = e.target.value;

    setTiktokUrl(url);

    const id = extractVideoId(url);
    if (id) {
      setVideoId(id);
      setIsValidUrl(true);
    } else {
      setVideoId("");
      setIsValidUrl(false);

      if (url.trim() !== "") {
        toast.error("Invalid Tiktok URL");
      }
    }
  }

  // Dari total detik yang didapat, lalu di konversi ke jam, menit, dan detik
  function formatWaktu(totalDetik) {
    const jam = Math.floor(totalDetik / 3600);
    const menit = Math.floor((totalDetik % 3600) / 60);
    const detik = Math.floor(totalDetik % 60);

    if (jam > 0) {
      return `${String(jam).padStart(2, "0")}:${String(menit).padStart(
        2,
        "0"
      )}:${String(detik).padStart(2, "0")}`;
    } else {
      return `${String(menit).padStart(2, "0")}:${String(detik).padStart(
        2,
        "0"
      )}`;
    }
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start">
      {/* Awal Input Link Tiktok */}
      <div className=" w-full h-fit flex flex-col gap-2 justify-start items-start">
        {/* Awal Judul Link Video Tiktok */}
        <label>Link Video Tiktok</label>
        {/* Akhir Judul Link Video Tiktok */}

        {/* Awal Input Link Tiktok */}
        <input
          type="url"
          name="tiktok"
          id="tiktok"
          value={tiktokUrl}
          placeholder="https://www.tiktok.com/@dindinduaarr/video/7565919548239514898?lang=id-ID"
          onChange={changeHandler}
          className="w-full h-fit p-2 rounded-md placeholder:text-gray-500 outline-none bg-gray-800"
        />
        {/* Akhir Input Link Tiktok */}
      </div>
      {/* Akhir Input Link Tiktok */}

      {/* Awal Preview Video Tiktok */}
      {loading && <div>Loading preview...</div>}

      {isComplete && isValidUrl && tiktokId && (
        <div className="w-full h-fit flex flex-col gap-4 justify-start items-start overflow-hidden">
          {/* Awal Preview Video Tiktok */}
          <div className=" w-full h-[500px] flex justify-center items-center relative ">
            <ReactPlayer
              controls
              width="100%"
              height={"500px"}
              src={tiktokUrl}
              autoPlay={true}
              className="absolute w-full h-full"
            />
          </div>
          {/* Akhir Preview Video Tiktok */}

          {/* Awal Info Pemutaran Durasi */}
          <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start">
            {/* Awal Durasi Pemutaran */}
            <div className="font-bold text-2xl">
              Durasi Pemutaran: {formatWaktu(durasiBerdasarkanAmount)}
            </div>
            {/* Akhir Durasi Pemutaran */}

            {/* Awal Info Durasi Pemutaran */}
            <div>
              <ol>
                <li>IDR 20.000 = 15 Detik</li>
                <li>IDR 50.000 = 30 Detik</li>
                <li>IDR 100.000 = 1 Menit</li>
                <li>IDR 250.000 = 2 Menit</li>
                <li>IDR 500.000 = 3 Menit</li>
                <li>IDR 1.000.000 = 4 Menit</li>
                <li>IDR 2.500.000 = 5 Menit</li>
              </ol>
            </div>
            {/* Akhir Info Durasi Pemutaran */}
          </div>
          {/* Akhir Info Pemutaran Durasi */}
        </div>
      )}
      {/* Akhir Preview Video Tiktok */}
    </div>
  );
}

// {
//     "version": "1.0",
//     "type": "video",
//     "title": "LUCUUUKKKK #07 ",
//     "author_url": "https://www.tiktok.com/@dindinduaarr",
//     "author_name": "dindinn",
//     "width": "100%",
//     "height": "100%",
//     "html": "<blockquote class=\"tiktok-embed\" cite=\"https://www.tiktok.com/@dindinduaarr/video/7565919548239514898\" data-video-id=\"7565919548239514898\" data-embed-from=\"oembed\" style=\"max-width:605px; min-width:325px;\"> <section> <a target=\"_blank\" title=\"@dindinduaarr\" href=\"https://www.tiktok.com/@dindinduaarr?refer=embed\">@dindinduaarr</a> <p>LUCUUUKKKK <a title=\"07\" target=\"_blank\" href=\"https://www.tiktok.com/tag/07?refer=embed\">#07</a> </p> <a target=\"_blank\" title=\"♬ suara asli - Risss - Risss_Budi\" href=\"https://www.tiktok.com/music/suara-asli-Risss-7537866287918795537?refer=embed\">♬ suara asli - Risss - Risss_Budi</a> </section> </blockquote> <script async src=\"https://www.tiktok.com/embed.js\"></script>",
//     "thumbnail_width": 576,
//     "thumbnail_height": 1024,
//     "thumbnail_url": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oE8rgULRA6wpScTfGKGAgcfoGijAiFfRgxIMeC~tplv-tiktokx-origin.image?dr=14575&x-expires=1762606800&x-signature=uTidI4hrP2ajGQVjthdPu7SK7UA%3D&t=4d5b0474&ps=13740610&shp=81f88b70&shcp=43f4a2f9&idc=my2",
//     "provider_url": "https://www.tiktok.com",
//     "provider_name": "TikTok",
//     "author_unique_id": "dindinduaarr",
//     "embed_product_id": "7565919548239514898",
//     "embed_type": "video"
// }
