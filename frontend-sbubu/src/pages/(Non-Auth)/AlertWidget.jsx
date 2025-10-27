// Url backend
// import.meta.env.VITE_BACKEND_URL ||
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
const BACKEND_URL = "http://localhost:3000";
import confetti from "canvas-confetti";

export default function AlertWidget() {
  // Ambil dari  URL : /widget/:overlayKey
  const { overlayKey } = useParams();
  console.log("OverlayKey", overlayKey);

  const [currentAlert, setCurrentAlert] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  //   useEffect untuk setup socket.io-client dan listen alert donation baru
  useEffect(() => {
    // Connect to io socket server
    const socket = io(BACKEND_URL, {
      transports: ["websocket", "polling"],
    });

    console.log(`Connection to socket io`);

    socket.on("connect", () => {
      console.log("Connected to socket.io server", socket.id);

      // Join room by overlay key
      socket.emit("join-by-overlay-key", overlayKey);
      console.log(`Joined by overlay key: ${overlayKey}`);
    });

    // Listen for new donation alerts
    socket.on("new-donation", (donation) => {
      console.log("New donation alert received:", donation);

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

      audio.play().catch((err) => console.log(`Error play sound:`, err));

      //   Semakin besar donasi, semakin lama tampil alert-nya
      const duration =
        donation.amount >= 100000
          ? 15000 // 15 detik untuk >= 100k
          : donation.amount >= 50000
          ? 12000 // 12 detik untuk >= 50k
          : 10000;

      //   Auto hide after 10 seconds
      setTimeout(() => {
        setIsVisible(false);
        setTimeout(() => setCurrentAlert(null), 500); // Clear alert after fade out
      }, duration);
    });

    // Disconnect
    socket.on("disconnect", () => {
      console.log(`Disconnected from socket.io`);
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
    <div className="w-full h-screen overflow-hidden bg-transparent">
      {/* Alert Container */}
      <div
        className={`
          fixed top-10 right-10 
          bg-linear-to-r from-purple-600 to-pink-600 
          text-white rounded-lg shadow-2xl p-6 
          min-w-[400px] max-w-[500px]
          transform transition-all duration-500
          ${
            isVisible
              ? "translate-x-0 opacity-100"
              : "translate-x-[600px] opacity-0"
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
