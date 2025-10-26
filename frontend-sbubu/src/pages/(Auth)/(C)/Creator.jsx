import { useEffect, useState } from "react";
import GenerateMetadata from "../../../components/GenerateMetadata";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../../../store/userSlice";

export default function Creator() {
  const dispatch = useDispatch();
  // Ambil data user dari redux
  const {
    data: dataUser,
    error: errorUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);
  console.log(dataUser, errorUser, loadingUser, "<< ini di creatior");

  const [activeMenu, setActiveMenu] = useState("kreator");

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  function handleMenuClick() {
    switch (activeMenu) {
      case "overlay":
        return <div>Overlay Component</div>;
      default:
        return <div>Kreator Component</div>;
    }
  }

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
        <div className="flex-1 rounded-xl flex flex-col gap-2 justify-start items-start ">
          <div
            onClick={() => setActiveMenu("kreator")}
            className="bg-red-500 w-full h-full"
          >
            Kreator
          </div>
          <div
            onClick={() => setActiveMenu("overlay")}
            className="bg-blue-950 w-full h-full"
          >
            Overlay
          </div>
        </div>
        {/* Akhir List Menu */}

        {/* Awal Component Menu */}
        <div className="flex-3 min-h-screen bg-purple-950">
          {handleMenuClick()}
        </div>
        {/* Akhir Component Menu */}
      </div>
    </>
  );
}

// bg-[#111D22] border border-gray-800
// bg-[#1A2B32]
