export function VoiceWaveform({ duration }) {
  return (
    <div className="px-4 pt-4 pb-2 flex flex-col gap-4">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-[#F1CB00] rounded-full flex items-center justify-center">
          <span className="text-3xl">🎙️</span>
        </div>
        <div>
          <p className="text-xl font-bold text-[#F1CB00]">Voice Message</p>
          <p className="text-sm text-gray-300">{duration || 0} seconds</p>
        </div>
      </div>

      {/* Waveform Visualization */}
      <div className="flex items-center justify-center gap-1 h-32 px-4">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="flex-1 bg-linear-to-t from-[#F1CB00] to-[#FFE066] rounded-full"
            style={{
              height: `${20 + Math.random() * 80}%`,
              animation: `wave ${
                0.5 + Math.random() * 0.5
              }s ease-in-out infinite alternate`,
              animationDelay: `${i * 0.02}s`,
            }}
          />
        ))}
      </div>

      {/* Playing Indicator */}
      <div className="flex items-center justify-center gap-2">
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <div
            className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-2 h-2 bg-red-500 rounded-full animate-pulse"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
        <span className="text-sm text-red-400 font-semibold">PLAYING</span>
      </div>

      {/* Keyframes for wave animation */}
      <style jsx>{`
        @keyframes wave {
          0% {
            transform: scaleY(0.3);
            opacity: 0.5;
          }
          100% {
            transform: scaleY(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
