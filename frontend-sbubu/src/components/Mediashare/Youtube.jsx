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
  const [videoTitle, setVideoTitle] = useState("");
  const [isValidUrl, setIsValidUrl] = useState(true);

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
      toast.error("URL YouTube tidak valid!");

      if (url.trim() !== "") {
        toast.error("URL YouTube tidak valid!");
      }
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
  function getTotalStartTimeInSeconds() {
    return startHour * 3600 + startMinute * 60 + startSecond;
  }

  // Format waktu dari detik ke HH:MM:SS
  function formatTime(totalDetik) {
    const jam = Math.floor(totalDetik / 3600);
    const menit = Math.floor((totalDetik % 3600) / 60);
    const detik = totalDetik % 60;

    if (jam > 0) {
      return `${hours}:${String(minutes).padStart(2, "0")}:${String(
        seconds
      ).padStart(2, "0")}`;
    } else {
      return `${minutes}:${String(seconds).padStart(2, "0")}`;
    }
  }

  // Function ketika player sudah ready
  // Event ini dipanggil saat YouTube player selesai load dan siap digunakan.
  function onPlayerReady(event) {
    playerRef.current = event.target;
    const title = playerRef.current.getVideoData().title;
    setVideoTitle(title);
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

  // Function untuk mulai tracking waktu video
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
  // Tombol play dari waktu yang dipilih
  // Function ini play video dari waktu yang dipilih user.
  function playFromStartTime() {
    const player = playerRef.current;
    if (!player) return;

    const startSeconds = getTotalStartTimeInSeconds();
    player.seekTo(startSeconds, true);
    player.playVideo();
    setIsPlaying(true);
    toast.success(`▶️ Memulai dari ${formatTime(startSeconds)}`);
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

    const startSeconds = getTotalStartTimeInSeconds();
    player.seekTo(startSeconds, true);
    player.pauseVideo();
    setIsPlaying(false);
    setCurrentTime(startSeconds);
    toast.success("🔄 Reset ke posisi awal");
  }

  //   Kasih tahu parent tentang data terbaru
  useEffect(() => {
    if (isValidUrl && videoId) {
      const startTimeInSeconds = getTotalStartTimeInSeconds();

      onDataChange({
        mediaUrl: youtubeUrl,
        mediaTitle: videoTitle || "YouTube Video",
        videoId: videoId,
        startTime: startTimeInSeconds,
        mediaDuration: allowedDuration,
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
          <div className="w-full h-fit aspect-video rounded-md overflow-hidden relative bg-amber-600">
            {/* Awal Youtube */}
            <YouTube
              videoId={videoId}
              onReady={onPlayerReady}
              onStateChange={onPlayerStateChange}
              opts={{
                height: "100%",
                width: "100%",
                playerVars: {
                  rel: 0,
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
            <div className="bg-green-900 w-full h-fit p-2 rounded-md truncate">
              Judul Video : {videoTitle}
            </div>
          )}
          {/* Akhir Video Info */}

          {/* Awal Pilih Waktu Mulai */}

          <div className="bg-black/70 border border-gray-700 w-full h-fit rounded-md flex flex-col gap-2 justify-start items-start p-2">
            {/* Awal Judul Pilih Waktu */}
            <div>Video Mulai Dari:</div>
            {/* Akhir Judul Pilih Waktu */}

            {/* Awal Pilih Jam, Menit, dan Detik */}
            <div className="bg-amber-950 w-full h-fit flex justify-between items-center">
              {/* Awal Input Jam */}
              <div className="bg-green-950 w-full h-fit flex flex-col gap-2 justify-center items-center p-2">
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
              <div className="bg-purple-950 w-full h-fit flex flex-col gap-2 justify-center items-center p-2">
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
              <div className="bg-pink-900 w-full h-fit flex flex-col gap-2 justify-center items-center p-2">
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
        </div>
      )}
      {/* Akhir Preview Video Youtube */}
    </div>
  );
}
