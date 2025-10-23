import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import GenerateMetadata from "../../components/GenerateMetadata";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import instance from "../../axiosInstance";
import Footer from "../../components/Footer";

export default function DonationPage() {
  const [streamerData, setStreamerData] = useState({});
  const [showDropdownProfile, setShowDropdownProfile] = useState(false);

  const { username } = useParams();

  async function getStreamerData() {
    try {
      const response = await instance.get(`/donation/${username}`);

      setStreamerData(response.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStreamerData();
  }, [username]);

  const metadata = {
    title: `Dukung ${username.toUpperCase()} | SBUBU`,
    description: `Support your favorite streamers on SBUBU by making a donation. Help them continue creating great content!`,
    keywords: `donate, streamer support, SBUBU donations, support content creators`,
    ogType: `website`,
  };
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className="bg-[#111D22] w-full min-h-screen  text-white py-14 flex justify-center items-start">
        <div className=" w-3/4 h-fit flex flex-col gap-3 justify-start imtes-start ">
          {/* Awal Logo dan To Profile */}
          <div className="w-full h-20 flex justify-between items-center ">
            {/* Awal Logo */}
            <div className=" w-56 h-full relative">
              <img
                src={"/sbubu-png-coloron.png"}
                alt="Logo Sbubu"
                className="absolute w-full h-full object-contain"
              />
            </div>
            {/* Akhir Logo */}

            {/* Awal To Profile */}
            <div className="bg-gray-800 w-fit  h-fit flex justify-between items-center gap-1  p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition-all duration-300 overflow-hidden">
              <div className="w-10 h-7 relative overflow-hidden rounded-full shrink-0">
                <img
                  src={`${streamerData?.streamer?.avatarUrl}`}
                  alt={`Foto ${username}`}
                  className="absolute w-full h-full object-cover "
                />
              </div>
              <div className=" whitespace-nowrap">{username}</div>
              <div className=" w-full h-full flex justify-center  items-center">
                {showDropdownProfile ? (
                  <IoIosArrowUp className="text-sm" />
                ) : (
                  <IoIosArrowDown className="text-sm" />
                )}
              </div>
            </div>
            {/* Akhir To Profile */}
          </div>
          {/* Akhir Logo dan To Profile */}

          <div className="bg-pink-800 w-full h-fit">Banner</div>
          <div className="bg-pink-800 w-full h-fit">Profil Streamer</div>
          <div className="bg-pink-800 w-full h-fit">Menu dan Hadiah</div>
        </div>
      </div>
    </>
  );
}

// bg-[#111D22]
