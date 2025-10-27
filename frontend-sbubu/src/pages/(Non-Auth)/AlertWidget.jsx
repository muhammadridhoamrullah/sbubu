// Url backend
// import.meta.env.VITE_BACKEND_URL ||
import { useEffect } from "react";
import { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import io from "socket.io-client";
const BACKEND_URL = "http://localhost:3000";
import confetti from "canvas-confetti";

export default function AlertWidget() {
  const [searchParams] = useSearchParams();
  const previewMode = searchParams.get("preview") === "true";
  // Ambil dari  URL : /widget/:overlayKey
  const { overlayKey } = useParams();
  console.log("OverlayKey", overlayKey);

  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  // Dummy data untuk preview
  const dummyDonation = {
    id: 0,
    donorName: "Preview User",
    amount: 50000,
    message: "Ini adalah preview donation alert",
    messageType: "text",
    createdAt: new Date(),
  };

  //   useEffect untuk setup socket.io-client dan listen alert donation baru
  useEffect(() => {
    // if (previewMode) {
    //   // Jika di preview mode, tampilkan dummy alert
    //   setCurrentAlert(dummyDonation);
    //   setIsVisible(true);
    //   return;
    // }

    // 1. Buat koneksi (sambungin walkie-talkie)
    const socket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
    });

    // 2. Tunggu sampai connect
    socket.on("connect", () => {
      /// 3. EMIT: Kirim pesan "join-overlay" ke server
      socket.emit("join-by-overlay-key", overlayKey);
      console.log(`Terconnect`);

      // Artinya: "Server, masukin saya ke room overlay-8763c58c..."
    });

    // 4. LISTEN: Dengerin event "new-donation" dari Controller setelah success bayar
    socket.on("new-donation", (donation) => {
      console.log("Siap menunggu donasi");

      // set alert data
      setCurrentAlert(donation);
      setIsVisible(true);

      //   Trigger confetti
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });

      //   Play sound alert
      const audio = new Audio("/alamakDuitNi.mp3");

      // Sekali aja play

      audio.play().catch((err) => console.log(`Error play sound:`, err));

      //   Semakin besar donasi, semakin lama tampil alert-nya

      //   Auto hide after 10 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setCurrentAlert(null), 500);
      }, 10000);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`Disconnected from socket.io`);
    });

    // Error handling
    socket.on("error", (error) => {
      console.error("Socket.io error:", error);
    });

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [overlayKey]);

  if (!currentAlert) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-transparent text-white">
        <p className="text-sm opacity-50">Waiting for donations...</p>
      </div>
    );
  }

  return (
    <div className="bg-transparent w-full h-screen overflow-hidden flex justify-center items-center">
      {/* Alert Container */}
      <div
        className={`w-96 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg shadow-2xl p-6 
          
            transform transition-all duration-500 ease-in-out relative
          ${
            isVisible
              ? "translate-y-0 opacity-100"
              : "translate-y-[600px] opacity-0"
          }
        `}
      >
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-2xl">
            💰
          </div>
          <div>
            <h3 className="font-bold text-xl">New Donation!</h3>
            <p className="text-sm opacity-90">From {currentAlert.donorName}</p>
          </div>
        </div>

        {/* Amount */}
        <div className="bg-white/20 rounded-lg p-4 mb-4">
          <p className="text-3xl font-bold text-center">
            Rp {currentAlert.amount.toLocaleString("id-ID")}
          </p>
        </div>

        {/* Message */}
        {currentAlert.message && (
          <div className="bg-white/10 rounded-lg p-4">
            <p className="text-sm italic">"{currentAlert.message}"</p>
          </div>
        )}

        {/* Animation sparkles */}
        <div className="absolute -top-2 -right-2 text-4xl animate-bounce">
          ✨
        </div>
      </div>
    </div>
  );
}
