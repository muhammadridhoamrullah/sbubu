export default function TiktokWidget({ data }) {
  return (
    <div className="w-full h-full p-4 flex flex-col gap-4 justify-center items-center">
      {/* Awal Video Tiktok */}
      <div className="w-full max-w-sm mx-auto aspect-9/16 rounded-lg overflow-hidden bg-black relative">
        <iframe
          src={`https://www.tiktok.com/embed/v2/${data?.tiktokId}`}
          width="100%"
          height="100%"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          frameborder="0"
          className="absolute w-full h-full"
        ></iframe>
      </div>
      {/* Akhir Video Tiktok */}

      {/* Awal Message */}
      <div className="text-justify">{data?.message}</div>

      {/* Akhir Message */}
    </div>
  );
}
