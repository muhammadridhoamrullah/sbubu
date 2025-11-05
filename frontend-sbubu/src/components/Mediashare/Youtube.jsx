import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import YouTube from "react-youtube";

export default function Youtube({ onDataChange, amount }) {
  // State

  // 1. Menyimpan URL youtube yang di input user
  // 2. Menyimpan video ID yang di ekstrak dari URL, https://www.youtube.com/watch?v=w-IgZycZwnY, nah v= nya itu adalah video ID
  // 3. Menyimpan judul dari video youtube
  // 4. Mengecek apakah URL youtube valid atau tidak dengan menggunakan regex
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [videoId, setVideoId] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(false);
  const [videoTitle, setVideoTitle] = useState("");
  const [videoYoutubeDuration, setVideoYoutubeDuration] = useState(0);

  // 5. Menyimpan waktu mulai (start time) dalam jam, menit, detik
  // Input jam: 0-23, Contoh: 0 (video dimulai dari jam ke-0)
  // Input menit: 0-59, Contoh: 1 (video dimulai dari menit ke-1)
  // Input detik: 0-59, Contoh: 30 (video dimulai dari detik ke-30)

  const [startHour, setStartHour] = useState(0);
  const [startMinute, setStartMinute] = useState(0);
  const [startSecond, setStartSecond] = useState(0);

  // 6. State untuk mengecek apakah video sedang diputar atau tidak

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  // 7. Ref untuk menyimpan instance player YouTube
  // Digunakan untuk control player (play, pause, seekTo, dll)

  const playerRef = useRef(null);

  // 8. Ref untuk menyimpan interval pengecekan status play video
  // Digunakan untuk tracking current time video

  const intervalRef = useRef(null);

  //   Change Handler YouTube URL
  function changeHandlerYoutubeUrl(e) {
    const url = e.target.value;
    setYoutubeUrl(url);

    const id = extractVideoId(url);

    if (id) {
      setIsValidUrl(true);
      setVideoId(id);
    } else {
      setIsValidUrl(false);
      setVideoId("");
      setVideoTitle("");

      if (url.trim() !== "") {
        toast.error("URL YouTube tidak valid!");
      }
    }
  }

  //   Function extract video ID from YouTube URL
  function extractVideoId(url) {
    if (!url) return null;

    // Regex patterns untuk berbagai format URL YouTube
    const patterns = [
      /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
      /youtube\.com\/watch\?.*v=([^&\n?#]+)/,
    ];

    for (const pattern of patterns) {
      const match = url.match(pattern);
      if (match && match[1]) {
        return match[1];
      }
    }
    return null;
  }

  // Function ketika player sudah ready
  // Event ini dipanggil saat YouTube player selesai load dan siap digunakan.
  function onPlayerReady(event) {
    playerRef.current = event.target;
    const title = playerRef.current.getVideoData().title;
    setVideoTitle(title);
    const duration = playerRef.current.getDuration();
    setVideoYoutubeDuration(duration);
  }

  // Function playerStateChange
  // Event ini dipanggil setiap kali state player berubah (play, pause, buffering, dll).
  function onPlayerStateChange(event) {
    if (event.data === 1) {
      setIsPlaying(true);
      startTimeTracking();
    } else if (event.data === 2) {
      setIsPlaying(false);
      stopTimeTracking();
    }
  }

  //  Function untuk mulai tracking waktu video
  // Function ini mulai tracking waktu video setiap 1 detik

  function startTimeTracking() {
    if (intervalRef.current) return;

    intervalRef.current = setInterval(() => {
      if (playerRef.current) {
        const currentTime = playerRef.current.getCurrentTime();
        setCurrentTime(currentTime);
      }
    }, 1000);
  }

  // Function stopTracking
  function stopTimeTracking() {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }

  //   Function ini handle input jam, menit, detik dengan validation
  function handleStartTimeChange(type, value) {
    const numValue = parseInt(value) || 0;

    if (type === "jam") {
      setStartHour(Math.max(0, Math.min(23, numValue)));
    } else if (type === "menit") {
      setStartMinute(Math.max(0, Math.min(59, numValue)));
    } else if (type === "detik") {
      setStartSecond(Math.max(0, Math.min(59, numValue)));
    }
  }

  //   Convert jam:menit:detik menjadi total detik.
  // Dengan cara kalo jam dikali 3600, menit dikali 60, dan detik tetap, lalu dijumlahkan semua.
  function ubahTotalWaktuKeDetik() {
    return startHour * 3600 + startMinute * 60 + startSecond;
  }

  // Format waktu dari detik ke HH:MM:SS
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

  // Tombol play dari waktu yang dipilih
  // Function ini play video dari waktu yang dipilih user.
  function playFromStartTime() {
    const player = playerRef.current;
    if (!player) return;

    const startSeconds = ubahTotalWaktuKeDetik();
    player.seekTo(startSeconds, true);
    player.playVideo();
    setIsPlaying(true);
    toast.success(`▶️ Memulai dari ${formatWaktu(startSeconds)}`);
  }

  // Function untuk play dan pasue video
  function togglePlayPause() {
    const player = playerRef.current;
    if (!player) return;

    if (isPlaying) {
      player.pauseVideo();
      setIsPlaying(false);
    } else {
      player.playVideo();
      setIsPlaying(true);
    }
  }

  // function resetToStart
  // Function ini reset video ke start position yang dipilih use
  function resetToStart() {
    const player = playerRef.current;
    if (!player) return;

    const startSeconds = ubahTotalWaktuKeDetik();
    player.seekTo(startSeconds, true);
    player.pauseVideo();
    setIsPlaying(false);
    setCurrentTime(startSeconds);
    toast.success("🔄 Reset ke posisi awal");
  }

  // Function untuk menghitung berapa lama video bisa diputar berdasarkan amount
  function kalkulasiDurasi(amount) {
    if (amount >= 2500000) return 300; // 5 menit
    if (amount >= 1000000) return 240; // 4 menit
    if (amount >= 500000) return 180; // 3 menit
    if (amount >= 250000) return 120; // 2 menit
    if (amount >= 100000) return 60; // 1 menit
    if (amount >= 50000) return 30; // 30 detik
    return 15; // 15 detik
  }

  const allowedDuration = kalkulasiDurasi(amount);

  const finalVideoDuration = Math.min(videoYoutubeDuration, allowedDuration);

  //   Kasih tahu parent tentang data terbaru
  useEffect(() => {
    if (isValidUrl && videoId) {
      const startTimeInSeconds = ubahTotalWaktuKeDetik();

      onDataChange({
        mediaUrl: youtubeUrl,
        mediaTitle: videoTitle || "YouTube Video",
        videoId: videoId,
        startTime: startTimeInSeconds,
        mediaDuration: finalVideoDuration,
      });
    } else {
      onDataChange(null);
    }
  }, [
    youtubeUrl,
    videoId,
    videoTitle,
    startHour,
    startMinute,
    startSecond,
    isValidUrl,
    onDataChange,
    allowedDuration,
  ]);

  // ✅ Cleanup on unmount
  useEffect(() => {
    return () => {
      stopTimeTracking();
    };
  }, []);

  return (
    <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start">
      {/* Awal Input Link Youtube */}
      <div className=" w-full h-fit flex flex-col gap-2 justify-start items-start">
        {/* Awal Judul Youtube */}
        <label>Link Youtube</label>
        {/* Akhir Judul Youtube */}

        {/* Awal Input Link Youtube */}
        <input
          type="url"
          name="youtube"
          id="youtube"
          placeholder="https://www.youtube.com/watch?v=k3I41oMhsac"
          value={youtubeUrl}
          onChange={changeHandlerYoutubeUrl}
          className="w-full h-fit p-2 placeholder:text-gray-500 outline-none rounded-md bg-gray-800"
        />
        {/* Akhir Input Link Youtube */}
      </div>
      {/* Akhir Input Link Youtube */}

      {/* Awal Preview Video Youtube */}
      {isValidUrl && videoId && (
        <div className="w-full h-fit flex flex-col gap-4 justify-start items-start">
          {/* Awal Vide Preview */}
          <div className="w-full h-fit aspect-video rounded-md overflow-hidden relative ">
            {/* Awal Youtube */}
            <YouTube
              videoId={videoId}
              onReady={onPlayerReady}
              onStateChange={onPlayerStateChange}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  rel: 1,
                  modestbranding: 1,
                  controls: 1,
                },
              }}
              className="absolute w-full h-full"
            />
            {/* Akhir Youtube */}
          </div>
          {/* Akhir Vide Preview */}

          {/* Awal Video Info */}
          {videoTitle && (
            <div className="border border-gray-800 w-full h-fit p-2 rounded-md truncate">
              Judul Video:{" "}
              <span className="font-semibold text-xl">{videoTitle}</span>
            </div>
          )}
          {/* Akhir Video Info */}

          {/* Awal Pilih Waktu Mulai */}
          <div className="bg-black/70 border border-gray-800 w-full h-fit rounded-md flex flex-col  justify-start items-start p-2">
            {/* Awal Judul Pilih Waktu */}
            <div>Video Mulai Dari:</div>
            {/* Akhir Judul Pilih Waktu */}

            {/* Awal Pilih Jam, Menit, dan Detik */}
            <div className=" w-full h-fit flex justify-between items-center">
              {/* Awal Input Jam */}
              <div className=" w-full h-fit flex flex-col gap-2 justify-center items-center p-2">
                {/* Awal Judul Jam */}
                <label>Jam</label>
                {/* Akhir Judul Jam */}

                {/* Awal Input Jam */}
                <input
                  type="number"
                  name="jam"
                  id="jam"
                  min={0}
                  max={23}
                  value={startHour}
                  onChange={(e) => handleStartTimeChange("jam", e.target.value)}
                  className="w-20 h-fit p-2 bg-[#1A2B32] outline-none rounded-md focus:bg-pink-700 transition-all duration-300 text-center"
                />
                {/* Akhir Input Jam */}
              </div>
              {/* Akhir Input Jam */}
              {/* Awal Input Menit */}
              <div className=" w-full h-fit flex flex-col gap-2 justify-center items-center p-2">
                {/* Awal Judul Menit */}
                <label>Menit</label>
                {/* Akhir Judul Menit */}

                {/* Awal Input Menit */}
                <input
                  type="number"
                  name="menit"
                  id="menit"
                  min={0}
                  max={59}
                  value={startMinute}
                  onChange={(e) =>
                    handleStartTimeChange("menit", e.target.value)
                  }
                  className="w-20 h-fit p-2 bg-[#1A2B32] outline-none rounded-md focus:bg-pink-700 transition-all duration-300 text-center"
                />
                {/* Akhir Input Menit */}
              </div>
              {/* Akhir Input Menit */}
              {/* Awal Input Detik */}
              <div className=" w-full h-fit flex flex-col gap-2 justify-center items-center p-2">
                {/* Awal Judul Detik */}
                <label>Detik</label>
                {/* Akhir Judul Detik */}

                {/* Awal Input Detik */}
                <input
                  type="number"
                  name="detik"
                  id="detik"
                  min={0}
                  max={59}
                  value={startSecond}
                  onChange={(e) =>
                    handleStartTimeChange("detik", e.target.value)
                  }
                  className="w-20 h-fit p-2 bg-[#1A2B32] outline-none rounded-md focus:bg-pink-700 transition-all duration-300 text-center"
                />

                {/* Akhir Input Detik */}
              </div>
              {/* Akhir Input Detik */}
            </div>
            {/* Akhir Pilih Jam, Menit, dan Detik */}
          </div>
          {/* Akhir Pilih Waktu Mulai */}

          {/* Awal Info Start Time */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-center">
            {/* Awal Judul Video Diputar Dari */}
            <div>Video akan diputar dari:</div>
            {/* Akhir Judul Video Diputar Dari */}

            {/* Awal Info Detik Start */}
            <div>{formatWaktu(ubahTotalWaktuKeDetik())}</div>
            {/* Akhir Info Detik Start */}
          </div>
          {/* Akhir Info Start Time */}

          {/* Awal Kontrol */}
          <div className=" w-full h-fit flex justify-center items-center gap-4">
            {/* Awal Tombol Mainkan di Waktu Pilih */}
            <button
              type="button"
              onClick={playFromStartTime}
              className="border border-gray-800 hover:bg-green-950 rounded-md p-2 cursor-pointer"
            >
              ▶️ Preview dari waktu ini
            </button>
            {/* Akhir Tombol Mainkan di Waktu Pilih */}

            {/* Awal Button Play/Pause */}
            <button
              type="button"
              onClick={togglePlayPause}
              className="border border-gray-800 hover:bg-blue-950 p-2 cursor-pointer rounded-md"
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </button>
            {/* Akhir Button Play/Pause */}

            {/* Awal Tombol Reset To Start */}
            <button
              type="button"
              onClick={resetToStart}
              className="border border-gray-800 hover:bg-red-950 p-2 cursor-pointer rounded-md"
            >
              🔄
            </button>
            {/* Akhir Tombol Reset To Start */}
          </div>
          {/* Akhir Kontrol */}

          {/* Awal Current Time Display */}
          {/* {isPlaying && <div>Waktu sekarang: {formatWaktu(currentTime)}</div>} */}
          {/* Akhir Current Time Display */}

          {/* Awal Info Durasi Pemutaran */}
          <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start">
            {/* Awal Durasi Pemutaran */}
            <div className="font-bold text-2xl">
              Durasi Pemutaran: {formatWaktu(allowedDuration)}
            </div>
            {/* Akhir Durasi Pemutaran */}

            {/* Awal Info Durasi Pemutaran */}
            <div>
              <ol>
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
          {/* Akhir Info Durasi Pemutaran */}
        </div>
      )}
      {/* Akhir Preview Video Youtube */}
    </div>
  );
}
