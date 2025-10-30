// Url backend
// import.meta.env.VITE_BACKEND_URL ||
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
const BACKEND_URL = "http://localhost:3000";
import confetti from "canvas-confetti";
import { useRef } from "react";
import { formatDate, formatRupiah } from "../../components/Helpers";
import { MdVerified } from "react-icons/md";

export default function AlertWidget() {
  const [searchParams] = useSearchParams();
  const { overlayKey } = useParams();

  // Ini hanya untuk preview mode
  const previewMode = searchParams.get("preview") === "true";

  // State
  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [queue, setQueue] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [alertDuration, setAlertDuration] = useState(0);

  // Refs
  const socketRef = useRef(null);
  const audioRef = useRef(null);

  // message:
  //   "Semangat terus buat kontennya! Sukses selalu! 🚀, saya akan selalu ada mendukungmu apapun yang terjadi HALA MADIRD!, saya akan selalu mendukungmu apapun yang terjadi HALA MADIRD!",
  // Dummy data untuk preview
  const dummyDonation = {
    id: 0,
    donorName: "Muhammad Ridho Amrullah",
    amount: 1000000,
    message: "mas",
    messageType: "text",
    createdAt: new Date(),
  };

  //   useEffect untuk setup socket.io-client dan simpan ke queue
  useEffect(() => {
    // 1. Buat koneksi (sambungin walkie-talkie), sambungin ke backend
    socketRef.current = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
    });

    // 2. Connect kan terhadap socket yang di server
    socketRef.current.on("connect", () => {
      // 3. Setelah connect, bilang ke server untuk join room overlay sesuai overlayKey dengan "EMIT"
      socketRef.current.emit("join-by-overlay-key", overlayKey);
    });

    // 4. "On" ini untuk mendengarkan event "new-donation" dari midtrans-webhook dengan menerima data donation
    socketRef.current.on("new-donation", (donation) => {
      // 5. Masukkan donation yang baru diterima ke dalam queue
      setQueue((prevQueue) => {
        const newQueue = [...prevQueue, donation];

        return newQueue;
      });
    });

    // 6. Ini untuk mendengarkan event disconnect
    socketRef.current.on("disconnect", () => {
      console.log("Disconnected from socket.io server");
    });

    // 7. Error handling
    socketRef.current.on("error", (error) => {
      console.error("Socket.io error:", error);
    });

    // 8. Cleanup function saat komponen unmount
    return () => {
      // socket.disconnect();
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [overlayKey]);

  // STEP 2: useEffect untuk mainkan alert dari queue
  useEffect(() => {
    // Ini untuk preview mode

    // if (previewMode && !isPlaying && !currentAlert) {
    //   setCurrentAlert(dummyDonation);
    //   setIsPlaying(true);
    //   setIsVisible(true);
    //   setAlertDuration(600000);
    //   return;
    // }

    // 1. Cek jika tidak sedang memutar alert dan ada item di queue
    if (!isPlaying && queue.length > 0) {
      // 2. Ambil alert pertama dari queue
      const nextAlert = queue[0];

      // 3. Set current alert dan mulai mainkan
      setCurrentAlert(nextAlert);
      setIsPlaying(true);

      // 4. Hapus alert pertama dari queue
      setQueue((prevQueue) => prevQueue.slice(1));

      // 5. Tampilkan alert
      setIsVisible(true);

      // 6. Jalankan Confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      // 7. Mainkan sound alert
      if (!audioRef.current) {
        audioRef.current = new Audio("/alamakDuitNi.mp3");
      }

      // 8. Reset currentTime sebelum play
      audioRef.current.currentTime = 0;
      audioRef.current
        .play()
        .catch((err) => console.log(`Error play sound:`, err));

      // 9. Hitung durasi alert berdasarkan amount
      const duration = calculateAlertDuration(nextAlert.amount);
      // 10. Simpan duration ke state untuk sebagai referensi progress bar
      setAlertDuration(duration);

      // 11. Setelah durasi selesai, sembunyikan alert dan reset state
      setTimeout(() => {
        setIsVisible(false);

        // 12. Setelah animasi hilang (500ms), reset currentAlert dan isPlaying
        setTimeout(() => {
          setCurrentAlert(null);
          setIsPlaying(false);
          setAlertDuration(0);
        }, 500);
      }, duration);
    }
  }, [isPlaying, queue]);

  // Function untuk menghitung durasi alert berdasarkan amount
  function calculateAlertDuration(amount) {
    if (amount >= 1000000) return 60000; // 60 seconds for ≥ 1M
    if (amount >= 500000) return 20000; // 20 seconds for ≥ 500k
    if (amount >= 100000) return 15000; // 15 seconds for ≥ 100k
    if (amount >= 50000) return 12000; // 12 seconds for ≥ 50k
    if (amount >= 10000) return 10000; // 10 seconds for ≥ 10k
    return 8000; // 8 seconds default
  }

  // Jika tidaak ada currentAlert dan queue kosong serta bukan previewMode, tampilkan pesan waiting
  if (!currentAlert && queue.length === 0 && !previewMode) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-transparent text-white">
        <p className="text-sm opacity-50">Waiting for donations...</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent w-full h-screen overflow-hidden flex justify-center items-center">
      {/* ✅ Queue Counter (optional - for debugging) */}
      {queue.length > 0 && (
        <div className="absolute top-4 left-4 bg-black/70 text-white px-4 py-2 rounded-lg backdrop-blur-sm z-50">
          <p className="text-sm font-semibold">
            📋 Queue: {queue.length} donation{queue.length > 1 ? "s" : ""}{" "}
            waiting
          </p>
        </div>
      )}

      {currentAlert && (
        <>
          {/* Awal Keseluruhan Alert */}
          <div
            className={`bg-transparent w-[500px] h-fit text-white  transition-all duration-500 ease-in-out  flex flex-col justify-start items-center relative overflow-hidden gap-2 ${
              isVisible
                ? "translate-y-0 opacity-100"
                : "translate-y-[600px] opacity-0"
            }`}
          >
            {/* Awal Nama, Amount */}
            <div className="p-4 bg-[#B30838] w-fit h-fit flex justify-center items-center gap-2  font-semibold rounded-2xl ">
              {/* Awal Nama */}
              {currentAlert.isLogin ? (
                <div className="flex jusitfy-center items-center gap-1">
                  {currentAlert.dataUser?.username}
                  {currentAlert.dataUser?.isEmailVerified && (
                    <MdVerified className="text-blue-500" title="Verified" />
                  )}
                </div>
              ) : (
                <div>{currentAlert.donorName}</div>
              )}
              {/* Akhir Nama */}

              {/* Awal - */}
              <div> - </div>
              {/* Akhir - */}

              {/* Awal Amount */}
              <div className="font-bold text-[#F1CB00] text-lg">
                {formatRupiah(currentAlert.amount)}
              </div>
              {/* Akhir Amount */}
            </div>
            {/* Akhir Amount */}
            {/* Awal Message */}
            <div className=" bg-[#B30838]  w-full h-fit text-white rounded-2xl text-justify text-lg font-medium flex flex-col overflow-hidden gap-3">
              {/* Awal Isi Message */}
              <div className="px-4 pt-4">{currentAlert.message}</div>
              {/* Akhir Isi Message */}

              {/* Awal Created At */}
              <div className="px-4 text-sm text-gray-400">
                {formatDate(currentAlert.createdAt)}
              </div>
              {/* Akhir Created At */}

              {/* Awal Progress Bar */}
              <div className="bg-[#B30838]] w-full h-3 overflow-hidden  relative l">
                <div
                  className={`absoulte h-full bg-[#F1CB00] transition-all `}
                  style={{
                    animation: `progress ${alertDuration}ms linear forwards`,
                    boxShadow: "0 0 10px rgba(250, 204, 21, 0.5)",
                  }}
                ></div>
              </div>
              {/* Akhir Progress Bar */}
            </div>
            {/* Akhir Message */}
          </div>
          {/* Akhir Keseluruhan Alert */}
        </>
      )}
    </div>
  );
}
