import ReactPlayer from "react-player";

export default function TiktokWidget({ data }) {
  return (
    <div className=" w-full h-full   flex flex-col gap-2 justify-center items-center">
      {/* Awal Video Tiktok */}
      <div className="w-full h-[250px] flex justify-center items-center relative overflow-hidden">
        <ReactPlayer
          src={data?.tiktokUrl}
          width="100%"
          height="100%"
          autoPlay={true}
          loop={true}
          muted={false}
          className="absolute w-full h-full"
        />
      </div>
      {/* Akhir Video Tiktok */}

      {/* Awal Message */}
      <div className="px-4 text-justify">{data?.message}</div>

      {/* Akhir Message */}
    </div>
  );
}

// https://www.tikwm.com/api/?url=https://www.tiktok.com/@dindinduaarr/video/7565919548239514898?lang=id-ID
//  Iin utnuk full informasi data video tiktok tersebut, bisa dapat durasi
