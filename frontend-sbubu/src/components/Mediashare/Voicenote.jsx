import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

// Menerima props onDataChange dari parent (MenuHadiah.jsx) yaitu setter untuk menyimpan data voicenote
export default function Voicenote({ onDataChange }) {
  // State untuk voicenote

  // 1. State untuk merekam, isRecording: true = sedang merekam, false = tidak merekam
  // 2. State untuk menyimpan durasi rekaman, dalam satuan detik
  // 3. State untuk menyimpan hasil rekaman, contohnya Blob audio/webm
  // 4. State untuk menyimpan URL audio hasil rekaman untuk preview
  // "" = no preview, "blob:http://..." = can preview
  // 5. State untuk play/pause preview audio
  // 6. State untuk menyimpan mikrofon yang dipilih
  // 7. State untuk menyimpan daftar mikrofon yang tersedia
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMicrophone, setSelectedMicrophone] = useState("");
  const [availableMicrophones, setAvailableMicrophones] = useState([]);

  // Ref untuk voicenote, Refs untuk persistent values (tidak trigger re-render)

  // 1. Ref untuk menyimpan instance MediaRecorder
  // 2. Ref untuk menyimpan chunks audio yang direkam sementara, sebelum di-convert ke Blob pada saat onstop
  // 3. Ref untuk menyimpan interval timer perekaman
  // 4. Ref untuk elemen audio player (preview)
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const timerIntervalRef = useRef(null);
  const audioPlayerRef = useRef(null);

  //   useEffect untuk mendapatkan daftar mikrofon yang tersedia
  useEffect(() => {
    async function getMicrophones() {
      try {
        // Minta izin akses mikrofon sementara untuk mendapatkan daftar perangkat
        await navigator.mediaDevices.getUserMedia({ audio: true });

        // Mendapatkan daftar perangkat media
        const devices = await navigator.mediaDevices.enumerateDevices();
        const audioInputs = devices.filter(
          (device) => device.kind === "audioinput"
        );

        setAvailableMicrophones(audioInputs);

        // Set default microphone, ini untuk memilih mikrofon pertama jika ada yang tersedia
        if (audioInputs.length > 0) {
          setSelectedMicrophone(audioInputs[0].deviceId);
        }
      } catch (error) {
        toast.error(
          "Gagal mendapatkan daftar mikrofon. Silakan periksa izin akses mikrofon."
        );
      }
    }

    // Jalankan fungsi untuk mendapatkan mikrofon
    getMicrophones();
  }, []);

  //   useEffect untuk memberitahu parent component ketika ada perubahan data voicenote
  useEffect(() => {
    // Cek jika ada audioBlob (rekaman selesai, pada saat onstop MediaRecorder), maka panggil onDataChange dengan data rekaman tersebut
    if (audioBlob) {
      onDataChange({
        audioBlob: audioBlob,
        duration: recordingTime,
      });
    } else {
      onDataChange(null);
    }

    // Dependency hanya pada audioBlob dan recordingTime
  }, [audioBlob, recordingTime, onDataChange]);

  // Async function untuk start recording
  async function startRecording() {
    try {
      // 1. Pilih mikrofon berdasarkan selectedMicrophone dan minta izin akses mikrofon
      const constraint = {
        audio: selectedMicrophone
          ? { deviceId: { exact: selectedMicrophone } }
          : true,
      };

      // 2. Dapatkan stream audio dari mikrofon, untuk merekam, aliran audio dari mikrofon
      const stream = await navigator.mediaDevices.getUserMedia(constraint);

      // 3. Buat instance MediaRecorder untuk merekam audio dari stream
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      // 4. Hubungkan ref dan event handler untuk MediaRecorder
      mediaRecorderRef.current = mediaRecorder;

      // 5. Siapkan array untuk menyimpan chunks audio, yaitu potongan-potongan data audio yang direkam
      audioChunksRef.current = [];

      // 6. Event handler untuk menangani dataavailable, yaitu ketika ada data audio yang tersedia maka simpan ke audioChunksRef, ini potongan-potongan data audio
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      // 7. Event handler untuk menangani stop recording, yaitu ketika perekaman dihentikan maka gabungkan chunks menjadi Blob, dan simpan ke audioBlob dan audioUrl untuk preview
      mediaRecorder.onstop = () => {
        // Gabungkan chunks menjadi Blob audio/webm
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        // Buat URL untuk preview audio
        const audioUrl = URL.createObjectURL(audioBlob);

        // Set state audioBlob dan audioUrl
        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);

        // Hentikan semua track pada stream untuk melepaskan mikrofon
        stream.getTracks().forEach((track) => track.stop());
      };

      // 8. Mulai merekam, panggil mediaRecorder.start(), nilai default adalah 0ms (langsung mulai)
      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      // 9. Mulai timer untuk menghitung durasi perekaman
      let shouldAutoStop = false;

      timerIntervalRef.current = setInterval(() => {
        // Update recording time setiap detik
        setRecordingTime((prev) => {
          const newTime = prev + 1;

          // Cek jika durasi mencapai 15 detik untuk auto-stop
          if (newTime >= 15) {
            shouldAutoStop = true;

            // Auto-stop berarti recordingTime menjadi 15 detik
            return 15;
          }

          return newTime;
        });

        // Kalo shouldAutoStop true dan mediaRecorderRef ada, maka stop recording
        if (shouldAutoStop && mediaRecorderRef.current) {
          // Clear interval timer dan reset ref
          clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;

          // Stop recording
          if (mediaRecorderRef.current.state === "recording") {
            mediaRecorderRef.current.stop();
            setIsRecording(false);
            toast.success("⏱️ Perekaman otomatis dihentikan (15 detik)");
          }

          shouldAutoStop = false; // Reset flag
        }
      }, 1000); // setiap 1000ms = 1 detik

      toast.success("🎙️ Perekaman dimulai.");
    } catch (error) {
      console.log(error, "error mic");

      if (error.name === "NotAllowedError") {
        toast.error(
          "Izin akses mikrofon ditolak. Silakan izinkan akses mikrofon untuk merekam pesan suara."
        );
      } else {
        toast.error(
          "Terjadi kesalahan saat memulai perekaman. Silakan coba lagi."
        );
      }
    }
  }

  // Async function untuk stop recording
  async function stopRecording() {
    // 1. Cek jika mediaRecorderRef ada dan sedang merekam, maka panggil stop()
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      // 2. Hentikan timer perekaman, dan reset ref
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      toast.success("✅ Perekaman dihentikan.");
    }
  }

  // Function untuk mereset/restart rekaman
  function resetRecording() {
    // 1. Jika sedang merekam, hentikan perekaman
    if (isRecording) {
      stopRecording();
    }

    // 2. Hentikan timer perekaman jika ada, dan reset ref
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    // 3. Hapus audioBlob dan audioUrl, serta revoke URL lama jika ada
    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

    // 4. Reset semua state terkait rekaman
    setAudioBlob(null);
    setAudioUrl(null);
    setRecordingTime(0);
    setIsPlaying(false);
  }

  // Function play/pause preview audio
  function togglePlayPreview() {
    if (!audioPlayerRef.current) return;

    if (isPlaying) {
      audioPlayerRef.current.pause();
      setIsPlaying(false);
    } else {
      audioPlayerRef.current.play();
      setIsPlaying(true);
    }
  }

  // Function format time
  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
      }
      if (audioUrl) {
        URL.revokeObjectURL(audioUrl);
      }
    };
  }, [audioUrl]);

  return (
    <div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
      {/* Awal Pilih Mikrofon */}
      <div className="w-full h-fit flex flex-col gap-2 justify-start items-start">
        {/* Awal Judul Pilih Mikrofon */}
        <div>Pilih Mikrofon</div>
        {/* Akhir Judul Pilih Mikrofon */}

        {/* Awal Select Mikrofon */}
        <select
          value={selectedMicrophone}
          onChange={(e) => setSelectedMicrophone(e.target.value)}
          disabled={isRecording || audioBlob !== null}
          className={`w-full h-fit p-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white outline-none focus:border-pink-500 transition-all duration-300 ${
            isRecording || audioBlob
              ? "cursor-not-allowed opacity-50"
              : "cursor-pointer"
          }`}
        >
          {availableMicrophones.length === 0 ? (
            <option value="">Tidak ada mikrofon tersedia</option>
          ) : (
            availableMicrophones.map((device) => (
              <option key={device.deviceId} value={device.deviceId}>
                {device.label || `Microphone ${device.deviceId.slice(0, 5)}`}
              </option>
            ))
          )}
        </select>

        <p className="text-gray-500 text-xs">
          {isRecording || audioBlob
            ? "Tidak dapat mengganti mikrofon saat merekam atau ada rekaman"
            : "Pilih mikrofon yang akan digunakan untuk merekam"}{" "}
        </p>
        {/* Akhir Select Mikrofon */}
      </div>
      {/* Akhir Pilih Mikrofon */}

      {/* Awal Garis Pembatas */}
      <div className="w-full h-0.5 bg-[#1A2B32] my-2"></div>
      {/* Akhir Garis Pembatas */}

      {/* Awal Recording Controls */}
      {!audioBlob && (
        <div className=" w-full h-fit flex flex-col justify-center items-center gap-4 ">
          {/* Awal Recording Button */}
          {!isRecording ? (
            <button
              type="button"
              onClick={startRecording}
              disabled={availableMicrophones.length === 0}
              className="w-24 h-24 bg-red-500 hover:bg-red-600 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full flex items-center justify-center text-white text-5xl shadow-lg transition transform hover:scale-105 active:scale-95"
            >
              🎙️
            </button>
          ) : (
            <button
              type="button"
              onClick={stopRecording}
              className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white text-5xl shadow-lg animate-pulse"
            >
              ⏸️
            </button>
          )}
          {/* Akhir Recording Button */}

          {/* Awal Recording Time Display */}
          {isRecording && (
            <div className="text-center space-y-1">
              <p className="text-3xl font-bold text-red-500 tabular-nums">
                {formatTime(recordingTime)}
              </p>
              <p className="text-xs text-gray-400">
                Merekam... (Maksimal 15 detik)
              </p>
              <div className="flex items-center gap-2 justify-center mt-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-red-500 font-semibold">REC</span>
              </div>
            </div>
          )}
          {/* Akhir Recording Time Display */}

          {/* Awal Instructions */}
          {!isRecording && (
            <div className="text-center space-y-2">
              <p className="text-sm text-gray-300">
                Klik tombol untuk mulai merekam
              </p>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span>💡</span>
                <span>Durasi maksimal: 15 detik</span>
              </div>
            </div>
          )}
          {/* Akhir Instructions */}
        </div>
      )}
      {/* Akhir Recording Controls */}

      {/* Awal Audio Preview */}
      {audioBlob && (
        <div className="w-full bg-linear-to-br from-pink-700/30 to-purple-700/30 rounded-lg p-4 space-y-4 border border-pink-700/50">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Play/Pause Button */}
              <button
                type="button"
                onClick={togglePlayPreview}
                className="w-12 h-12 bg-pink-700 hover:bg-pink-800 rounded-full flex items-center justify-center text-white transition shadow-md"
              >
                {isPlaying ? (
                  <span className="text-2xl">⏸️</span>
                ) : (
                  <span className="text-2xl">▶️</span>
                )}
              </button>

              {/* Info */}
              <div>
                <p className="text-sm font-semibold text-white">
                  Pesan Suara Terrekam
                </p>
                <p className="text-xs text-gray-300 tabular-nums">
                  Durasi: {formatTime(recordingTime)}
                </p>
              </div>
            </div>

            {/* Delete Button */}
            <button
              type="button"
              onClick={resetRecording}
              className="w-10 h-10 bg-red-600 hover:bg-red-700 rounded-full flex items-center justify-center text-white transition shadow-md"
              title="Hapus rekaman"
            >
              <span className="text-xl">🗑️</span>
            </button>
          </div>

          {/* Waveform Visualization */}
          <div className="flex items-center gap-1 h-12 px-2">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-full transition-all duration-300 ${
                  isPlaying ? "bg-pink-400" : "bg-pink-400/50"
                }`}
                style={{
                  height: `${20 + Math.random() * 80}%`,
                  opacity: isPlaying ? 0.8 + Math.random() * 0.2 : 0.4,
                }}
              />
            ))}
          </div>

          {/* Hidden Audio Player */}
          <audio
            ref={audioPlayerRef}
            src={audioUrl}
            onEnded={() => setIsPlaying(false)}
            className="hidden"
          />

          {/* Info */}
          <div className="flex items-center gap-2 text-xs text-gray-300 bg-black/20 rounded-md p-2">
            <span>ℹ️</span>
            <span>
              Rekaman akan dikirim bersama donasi Anda. Klik tombol trash untuk
              merekam ulang.
            </span>
          </div>
        </div>
      )}
      {/* Akhir Audio Preview */}
    </div>
  );
}
