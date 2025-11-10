import YouTube from "react-youtube";

export default function YoutubeWidget({ data }) {
  return (
    <div className="w-full h-full flex flex-col gap-2 justify-center items-center">
      {/* Awal Video Youtube */}
      <div className="w-full h-fit aspect-video   overflow-hidden relative">
        <YouTube
          videoId={data?.videoId}
          opts={{
            width: "100%",
            height: "100%",
            playerVars: {
              autoplay: 1,
              start: data?.startTime || 0,
              rel: 0,
              modestbranding: 1,
              mute: 0,
              controls: 0,
            },
          }}
          className="absolute w-full h-full"
        />
      </div>
      {/* Akhir Video Youtube */}
      {/* Awal Message */}
      <div className="px-4 text-justify">{data?.message}</div>
      {/* Akhir Message */}
    </div>
  );
}
