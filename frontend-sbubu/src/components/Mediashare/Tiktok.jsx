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
  console.log("Data Tiktok", data);

  // State
  const [tiktokUrl, setTiktokUrl] = useState("");
  const [tiktokId, setVideoId] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [mediaDuration, setMediaDuration] = useState(0);

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
        mediaDuration: durasiBerdasarkanAmount,
        // tiktokUrlVideoPlay: data?.play,
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

  // const finalDuration = Math.min(data?.duration || 0, durasiBerdasarkanAmount);

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

// {
//     "id": "7565919548239514898",
//     "region": "ID",
//     "title": "LUCUUUKKKK #07 ",
//     "cover": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oE8rgULRA6wpScTfGKGAgcfoGijAiFfRgxIMeC~tplv-tiktokx-cropcenter-q:300:400:q72.jpeg?dr=14782&refresh_token=ebc6b7ef&x-expires=1762862400&x-signature=524%2B7aRClC7yuQlBVoyWbwXDZiI%3D&t=bacd0480&ps=933b5bde&shp=d05b14bd&shcp=1d1a97fc&idc=maliva&biz_tag=tt_video&s=AWEME_DETAIL&sc=cover",
//     "ai_dynamic_cover": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/oweRrvLfcgGVpoDAcUZAe6IijfglGYMGwm4xFF~tplv-tiktokx-origin.image?dr=1364&refresh_token=9822d3d3&x-expires=1762862400&x-signature=53J%2FnzqNPDltZvDXSiDzW52Y%2BP0%3D&t=bacd0480&ps=4f5296ae&shp=d05b14bd&shcp=1d1a97fc&idc=maliva&biz_tag=tt_video&s=AWEME_DETAIL&sc=dynamic_cover",
//     "origin_cover": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-p-0037/ocufj4K7RQ4HI6D0iCfF4vuEQGDCRQAVUAfz8d~tplv-tiktokx-360p.webp?dr=1363&refresh_token=4d6e9f5b&x-expires=1762862400&x-signature=jsFx5czMvoWXGb8lXOMdRtQUQ3U%3D&t=bacd0480&ps=d97f9a4f&shp=d05b14bd&shcp=1d1a97fc&idc=maliva&biz_tag=tt_video&s=AWEME_DETAIL&sc=feed_cover",
//     "duration": 15,
//     "play": "https://v16-coin.tiktokcdn.com/98b55cdf0032221ab8221f6ab8ed49af/6912345e/video/tos/alisg/tos-alisg-pve-0037c001/oUffwgpRGMDcxFicAIe8AiA9rLi6JjGRjoUG6f/?a=0&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=2712&bt=1356&cs=0&ds=6&ft=-gnpiFvRoQyRgxROjJNC.UY5S93SgKPXtJh~.zoyqF_4&mime_type=video_mp4&qs=0&rc=ZDM0ZWloMzM8aWk7M2gzaUBpanFmZXQ5cjhyNjMzODczNEAuX2JfMjI1NS4xNDVhXi1fYSMvaWgxMmQ0a3NhLS1kMWBzcw%3D%3D&vvpl=1&l=20251110205159CD10E876BB39AC13BEBD&btag=e000b8000",
//     "wmplay": "https://v16-coin.tiktokcdn.com/2ecb9bb41366b2073c8efe0d76c68326/6912345e/video/tos/alisg/tos-alisg-pve-0037c001/ocMfpcAfeAgFKcf1AGGj6oFUkIGwLRCrixLR1o/?a=0&bti=OUBzOTg7QGo6OjZAL3AjLTAzYCMxNDNg&ch=0&cr=13&dr=0&er=0&lr=all&net=0&cd=0%7C0%7C0%7C&cv=1&br=3006&bt=1503&cs=0&ds=3&ft=-gnpiFvRoQyRgxROjJNC.UY5S93SgKPXtJh~.zoyqF_4&mime_type=video_mp4&qs=0&rc=ODxkOmU1N2VpZWVlNWg2NEBpanFmZXQ5cjhyNjMzODczNEBiNF5iNTUwXzQxMV4yXjQzYSMvaWgxMmQ0a3NhLS1kMWBzcw%3D%3D&vvpl=1&l=20251110205159CD10E876BB39AC13BEBD&btag=e000b8000",
//     "size": 2613242,
//     "wm_size": 2895093,
//     "music": "https://sf16-ies-music-sg.tiktokcdn.com/obj/tiktok-obj/7537866286139886352.mp3",
//     "music_info": {
//         "id": "7537866287918795537",
//         "title": "original sound - Risss_Budi",
//         "play": "https://sf16-ies-music-sg.tiktokcdn.com/obj/tiktok-obj/7537866286139886352.mp3",
//         "cover": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/31be656002108eb3d4fbc69358547c4c~tplv-tiktokx-cropcenter:1080:1080.jpeg?dr=14579&refresh_token=c1eebb79&x-expires=1762862400&x-signature=DkaSGD6nONDAzLhN4lC54b1FQQU%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva",
//         "author": "Risss_Budi",
//         "original": true,
//         "duration": 29,
//         "album": ""
//     },
//     "play_count": 705204,
//     "digg_count": 67801,
//     "comment_count": 159,
//     "share_count": 2803,
//     "download_count": 423,
//     "collect_count": 6470,
//     "create_time": 1761577922,
//     "anchors": null,
//     "anchors_extras": "",
//     "is_ad": false,
//     "commerce_info": {
//         "adv_promotable": false,
//         "auction_ad_invited": false,
//         "branded_content_type": 0,
//         "organic_log_extra": "{\"req_id\":\"20251110205159CD10E876BB39AC13BEBD\"}",
//         "with_comment_filter_words": false
//     },
//     "commercial_video_info": "",
//     "item_comment_settings": 0,
//     "mentioned_users": "",
//     "author": {
//         "id": "7496840346988626965",
//         "unique_id": "dindinduaarr",
//         "nickname": "dindinn",
//         "avatar": "https://p16-sign-sg.tiktokcdn.com/tos-alisg-avt-0068/aa85a0503dc3f18e3c092dc204b47cff~tplv-tiktokx-cropcenter:300:300.jpeg?dr=14577&refresh_token=794d053c&x-expires=1762862400&x-signature=DQl8k0Sql1JgYwgj5bGkaSLRlFM%3D&t=4d5b0474&ps=13740610&shp=d05b14bd&shcp=34ff8df6&idc=maliva"
//     }
// }
