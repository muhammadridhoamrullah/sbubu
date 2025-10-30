import { use, useEffect, useState } from "react";
import GenerateMetadata from "../../../components/GenerateMetadata";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../store/userSlice";
import Halaman from "./Halaman";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Filter from "./Filter";
import KotakHadiah from "./KotakHadiah";
import toast from "react-hot-toast";
import OverlayControl from "./OverlayControl";

export default function Creator() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const { username } = useParams();

  // Ambil data user dari redux
  const {
    data: dataUser,
    error: errorUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);

  const [activeMenu, setActiveMenu] = useState("halaman");

  useEffect(() => {
    if (!dataUser) {
      dispatch(fetchUserData());
    }
  }, []);

  // Cek jika username di URL tidak sesuai dengan data user, redirect ke halaman yang benar
  useEffect(() => {
    if (dataUser && dataUser.username) {
      if (dataUser.username.toLowerCase() !== username.toLowerCase()) {
        toast.error("Anda tidak memiliki akses ke halaman kreator ini.");
        navigate(`/c/${dataUser.username}`);
      }
    }
  }, [dataUser, username, navigate]);

  // Cek jika errorUser ada, tampilkan toast
  useEffect(() => {
    if (errorUser) {
      toast.error(errorUser);
    }
  }, [errorUser]);

  const menuItems = [
    { name: "halaman", label: "Halaman" },
    { name: "filter", label: "Filter / Moderasi" },
    { name: "gifts", label: "Kotak Hadiah" },
    { name: "overlay-control", label: "Kontrol Overlay" },
    { name: "withdrawal", label: "Penarikan" },
    { name: "bans", label: "Blokir" },
    { name: "integration", label: "Integrasi" },
  ];

  const menuComponents = {
    halaman: <Halaman data={dataUser} />,
    filter: <Filter data={dataUser} />,
    gifts: (
      <KotakHadiah
        data={dataUser}
        onNavigateToWithdrawal={() => setActiveMenu("withdrawal")}
      />
    ),
    "overlay-control": <OverlayControl />,
    withdrawal: <div>Withdrawal Component</div>,
    bans: <div>Bans Component</div>,
    integration: <div>Integration Component</div>,
  };

  const metadata = {
    title: `Halaman Kreator - @${dataUser?.username} | SBUBU`,
    description: "Halaman pengaturan kreator untuk pengguna SBUBU",
    keywords: "SBUBU, kreator, creator, settings, account",
    ogType: "website",
  };

  if (loadingUser) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className="text-white w-3/4 h-fit  flex justify-between items-start gap-5">
        {/* Awal List Menu */}
        <div className="w-1/4 h-fit rounded-xl flex flex-col gap-2 justify-start items-start ">
          {/* Awal Menu Kreator */}
          <div className="bg-black/70 w-full h-full flex flex-col justify-start items-start rounded-xl overflow-hidden">
            {/* Awal Judul Kreator */}
            <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
              Kreator
            </div>
            {/* Akhir Judul Kreator */}

            {/* Awal List Menu Kreator */}
            <div className="w-full h-full flex flex-col gap-2 justify-start items-start p-4">
              {menuItems.map((menu, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveMenu(menu.name)}
                  className={`${
                    activeMenu === menu.name ? "bg-pink-700" : "bg-[#1A2B32]"
                  } w-full h-fit p-3 flex justify-center items-center rounded-md hover:bg-gray-800 cursor-pointer transition-all duration-300 `}
                >
                  {menu.label}
                </div>
              ))}
            </div>
            {/* Akhir List Menu Kreator */}
          </div>
          {/* Akhir Menu Kreator */}

          {/* Awak Menu Overlay */}
          <div
            onClick={() => setActiveMenu("overlay")}
            className="bg-blue-950 w-full h-full"
          >
            Overlay
          </div>
          {/* Akhir Menu Overlay */}
        </div>
        {/* Akhir List Menu */}

        {/* Awal Component Menu */}
        <div className=" w-3/4 h-fit  overflow-hidden rounded-xl">
          {menuComponents[activeMenu]}
        </div>
        {/* Akhir Component Menu */}
      </div>
    </>
  );
}

// bg-[#111D22] border border-gray-800
// bg-[#1A2B32]
