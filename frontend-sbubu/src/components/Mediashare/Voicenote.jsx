import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";

export default function Voicenote({ onDataChange }) {
  // State untuk voicenote
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioBlob, setAudioBlob] = useState(null);
  const [audioUrl, setAudioUrl] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedMicrophone, setSelectedMicrophone] = useState("");
  const [availableMicrophones, setAvailableMicrophones] = useState([]);

  // Ref untuk voicenote
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

        // Set default microphone
        if (audioInputs.length > 0) {
          setSelectedMicrophone(audioInputs[0].deviceId);
        }
      } catch (error) {
        toast.error(
          "Gagal mendapatkan daftar mikrofon. Silakan periksa izin akses mikrofon."
        );
      }
    }

    getMicrophones();
  }, []);

  //   useEffect untuk memberitahu parent component ketika ada perubahan data voicenote
  useEffect(() => {
    if (audioBlob) {
      onDataChange({
        audioBlob: audioBlob,
        duration: recordingTime,
      });
    } else {
      onDataChange(null);
    }
  }, [audioBlob, recordingTime, onDataChange]);

  // Async function untuk start recording
  async function startRecording() {
    try {
      // Minta izin akses mikrofon
      const constraint = {
        audio: selectedMicrophone
          ? { deviceId: { exact: selectedMicrophone } }
          : true,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraint);

      // Buat MediaRecorder untuk merekam audio
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "audio/webm",
      });

      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });

        const audioUrl = URL.createObjectURL(audioBlob);

        setAudioBlob(audioBlob);
        setAudioUrl(audioUrl);

        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingTime(0);

      //   Automatis stop recording setelah 15 detik
      let shouldAutoStop = false;

      timerIntervalRef.current = setInterval(() => {
        setRecordingTime((prev) => {
          const newTime = prev + 1;

          if (newTime >= 15) {
            shouldAutoStop = true;
            return 15;
          }

          return newTime;
        });

        // ✅ Auto-stop OUTSIDE of setState callback
        if (shouldAutoStop && mediaRecorderRef.current) {
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
      }, 1000);

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

  // async function untuk stop recording
  async function stopRecording() {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);

      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      toast.success("✅ Perekaman dihentikan.");
    }
  }

  // ✅ Reset recording
  function resetRecording() {
    if (isRecording) {
      stopRecording();
    }

    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    if (audioUrl) {
      URL.revokeObjectURL(audioUrl);
    }

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
          className={`w-full h-fit px-3 py-2 bg-[#0F1419] border border-gray-700 rounded-lg text-white outline-none focus:border-pink-500 transition-all duration-300 ${
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
        <div className="w-full h-fit flex flex-col items-center gap-4 py-4">
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
