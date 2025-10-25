import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import GenerateMetadata from "../../components/GenerateMetadata";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import instance from "../../axiosInstance";
import Footer from "../../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { fetchStreamerData } from "../../store/streamerSlice";
import toast, { Toaster } from "react-hot-toast";
import LoadingSkeleton from "../../components/LoadingSkeleton";
import { MdVerified } from "react-icons/md";
import { GrInstagram } from "react-icons/gr";
import { FiTwitter } from "react-icons/fi";
import { PiTiktokLogoBold } from "react-icons/pi";
import { FiYoutube } from "react-icons/fi";
import { LuFacebook } from "react-icons/lu";

import { BsThreads } from "react-icons/bs";
import MenuHadiah from "../../components/MenuHadiah";
import MenuSoundboard from "../../components/MenuSoundboard";
import { fetchUserData } from "../../store/userSlice";
import { doLogout } from "../../store/loginSlice";

export default function DonationPage() {
  const { username } = useParams();
  const dispatch = useDispatch();

  // Data Streamer
  const {
    loading: loadingStreamer,
    data: dataStreamer,
    error: errorStreamer,
  } = useSelector((state) => state.streamer);

  // Data User
  const {
    loading: loadingUser,
    data: dataUser,
    error: errorUser,
  } = useSelector((state) => state.user);

  const [showDropdownProfile, setShowDropdownProfile] = useState(false);

  // Menu and Hadiah active
  const [activeMenu, setActiveMenu] = useState("hadiah");

  // Awal useEffect khusus Streamer

  useEffect(() => {
    dispatch(fetchStreamerData(username));
  }, [username, dispatch]);

  useEffect(() => {
    if (errorStreamer) {
      toast.error(errorStreamer);
    }
  }, [errorStreamer]);

  // Akhir useEffect khusus Streamer

  // Awal useEffect khusus User
  useEffect(() => {
    if (errorUser) {
      toast.error(errorUser);
    }
  }, [errorUser]);

  // Cek jika ada access_token di localStorage untuk fetch data user
  useEffect(() => {
    if (localStorage.access_token) {
      dispatch(fetchUserData());
    } else {
      console.log("Tidak ada access_token, user tidak login");
    }
  }, [dispatch]);

  // Akhir useEffect khusus User

  let socialLinks = dataStreamer?.streamer?.socialMediaLinks || {};
  const isLoggedIn = Boolean(dataUser);
  const menuComponents = {
    hadiah: <MenuHadiah dataStreamer={dataStreamer} dataUser={dataUser} />,
    soundboard: <MenuSoundboard />,
  };

  function handleLogout() {
    dispatch(doLogout());
    window.location.reload();
  }

  const metadata = {
    title: `Dukung ${username.toUpperCase()} | SBUBU`,
    description: `Support your favorite streamers on SBUBU by making a donation. Help them continue creating great content!`,
    keywords: `donate, streamer support, SBUBU donations, support content creators`,
    ogType: `website`,
  };

  if (loadingStreamer || !dataStreamer?.streamer || loadingUser) {
    return <LoadingSkeleton />;
  }
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className="bg-[#111D22] w-full min-h-screen  text-white py-14 flex justify-center items-start">
        <Toaster position="top-center" reverseOrder={false} />
        <div className=" w-3/4 h-fit flex flex-col gap-5 justify-start items-start ">
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
            {isLoggedIn ? (
              <div className="flex justify-center items-center gap-4">
                {/* tES lOGOUT */}
                <div
                  onClick={handleLogout}
                  className="bg-red-600 p-4 rounded-md hover:bg-red-900 transition-all duration-300"
                >
                  Logout
                </div>
                {/* tES lOGOUT */}

                <div className="bg-gray-800 w-fit  h-fit flex justify-between items-center gap-1  p-3 rounded-xl cursor-pointer hover:bg-gray-700 transition-all duration-300 overflow-hidden">
                  <div className="w-10 h-7 relative overflow-hidden rounded-full shrink-0">
                    <img
                      src={dataUser?.avatarUrl}
                      alt={`Foto ${dataUser?.username}`}
                      className="absolute w-full h-full object-cover "
                    />
                  </div>
                  <div className=" whitespace-nowrap">{dataUser?.username}</div>
                  <div className=" w-full h-full flex justify-center  items-center">
                    {showDropdownProfile ? (
                      <IoIosArrowUp className="text-sm" />
                    ) : (
                      <IoIosArrowDown className="text-sm" />
                    )}
                  </div>
                </div>
              </div>
            ) : (
              <Link
                className="bg-pink-700 py-2 px-4 rounded-md hover:bg-pink-900 transition-all duration-300"
                to={"/auth/login"}
              >
                Masuk
              </Link>
            )}
            {/* Akhir To Profile */}
          </div>
          {/* Akhir Logo dan To Profile */}
          {/* Awal Banner */}
          <div className=" w-full h-52 relative rounded-xl overflow-hidden">
            <img
              src={`http://localhost:3000${dataStreamer?.streamer?.banner} `}
              alt={`Banner ${username}`}
              className="w-full h-full absolute object-cover"
            />
          </div>
          {/* Akhir Banner */}
          {/* Awal Profil */}
          <div className="bg-black/70 w-full h-fit rounded-xl overflow-hidden p-4 flex flex-col gap-4 justify-start items-start">
            {/* Awal Nama dan Ikuti */}
            <div className=" w-full h-fit flex justify-between items-center ">
              {/* Awal Gambar, Nama, Verif */}
              <div className=" w-fit h-12 flex justify-center items-center overflow-hidden gap-2">
                <div className=" w-12 h-full flex justify-center items-center relative">
                  <img
                    src={`${dataStreamer?.streamer?.avatarUrl}`}
                    alt={`Foto ${username}`}
                    className="absolute w-full h-full object-cover rounded-full"
                  />
                </div>
                <div className=" font-bold text-2xl">
                  {dataStreamer?.streamer?.name}
                </div>
                {dataStreamer?.streamer?.isEmailVerified && (
                  <MdVerified className="text-blue-500 text-2xl" />
                )}
              </div>
              {/* Akhir Gambar, Nama, Verif */}

              {/* Awal Ikuti */}
              <div className="bg-pink-700 py-2 px-8 cursor-pointer rounded-md hover:bg-pink-900 transition-all duration-300">
                Ikuti
              </div>
              {/* Akhir Ikuti */}
            </div>
            {/* Akhir Nama dan Ikuti */}
            {/* Awal Bio */}
            {dataStreamer?.streamer?.bio && (
              <div className="bg-pink-900/50  p-4 rounded-md w-full h-fit">
                {dataStreamer?.streamer?.bio}
              </div>
            )}
            {/* Akhir Bio */}
            {/* Awal Social Media */}
            <div className="flex jusitfy-start items-center gap-4">
              {/* Awal Youtube */}
              {socialLinks?.youtube && (
                <Link to={socialLinks.youtube} target="_blank">
                  <FiYoutube className="text-3xl hover:text-red-600 transition-all duration-300" />
                </Link>
              )}
              {/* Akhir Youtube */}
              {/* Awal Instagram */}
              {socialLinks?.instagram && (
                <Link to={socialLinks.instagram} target="_blank">
                  <GrInstagram className="text-3xl hover:text-pink-500 transition-all duration-300" />
                </Link>
              )}
              {/* Akhir Instagram */}
              {/* Awal Twitter */}
              {socialLinks?.twitter && (
                <Link to={socialLinks.twitter} target="_blank">
                  <FiTwitter className="text-3xl hover:text-blue-400 transition-all duration-300" />
                </Link>
              )}
              {/* Akhir Twitter */}

              {/* Awal Tiktok */}
              {socialLinks?.tiktok && (
                <Link to={socialLinks.tiktok} target="_blank">
                  <PiTiktokLogoBold className="text-3xl hover:text-purple-900 transition-all duration-300" />
                </Link>
              )}
              {/* Akhir Tiktok */}
              {/* Awal Facebook */}
              {socialLinks?.facebook && (
                <Link to={socialLinks.facebook} target="_blank">
                  <LuFacebook className="text-3xl hover:text-blue-600 transition-all duration-300" />
                </Link>
              )}
              {/* Akhir Facebook */}

              {/* Awal Threads */}
              {socialLinks?.threads && (
                <Link to={socialLinks.threads} target="_blank">
                  <BsThreads className="text-3xl hover:text-green-900 transition-all duration-300" />
                </Link>
              )}
              {/* Akhir Threads */}
            </div>
            {/* Akhir Social Media */}
          </div>
          {/* Akhir Profil */}
          {/* Awal Menu dan Hadiah */}
          <div className=" w-full h-fit flex justify-between items-start gap-5">
            {/* Awal Menu dan Soundboard */}
            <div className="bg-black/70  w-1/4 h-fit flex flex-col justify-start items-start overflow-hidden rounded-xl ">
              {/* Awal Menu */}
              <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
                Menu
              </div>
              {/* Akhir Menu */}
              {/* Awal List Menu */}
              <div className=" w-full h-fit p-4 flex flex-col gap-2 justify-start items-start">
                <div
                  onClick={() => setActiveMenu("hadiah")}
                  className={`${
                    activeMenu === "hadiah" ? "bg-pink-700" : "bg-[#1A2B32]"
                  } w-full h-fit p-3 flex justify-center items-center rounded-md hover:bg-gray-900 cursor-pointer transition-all duration-300`}
                >
                  Hadiah
                </div>
                <div
                  onClick={() => setActiveMenu("soundboard")}
                  className={`${
                    activeMenu === "soundboard" ? "bg-pink-700" : "bg-[#1A2B32]"
                  } w-full h-fit p-3 flex justify-center items-center rounded-md hover:bg-gray-900 cursor-pointer transition-all duration-300`}
                >
                  Soundboard
                </div>
              </div>
              {/* Akhir List Menu */}
            </div>
            {/* Akhir Menu dan Soundboard */}

            {/* Awal Hadiah */}
            <div className="bg-black/70 w-3/4 h-fit  overflow-hidden rounded-xl ">
              {menuComponents[activeMenu]}
            </div>
            {/* Akhir Hadiah */}
          </div>
          {/* Akhir Menu dan Hadiah */}
        </div>
      </div>
    </>
  );
}

// bg-[#111D22]
// bg-[#1A2B32]
