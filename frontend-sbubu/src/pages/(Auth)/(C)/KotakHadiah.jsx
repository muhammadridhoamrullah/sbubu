import { useEffect, useState } from "react";
import { LuEyeClosed } from "react-icons/lu";
import { GoEye } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserDonationData } from "../../../store/userSlice";
import toast from "react-hot-toast";
import { formatRupiah } from "../../../components/Helpers";

export default function KotakHadiah({ data, onNavigateToWithdrawal }) {
  const dispatch = useDispatch();
  const [sembunyikan, setSembunyikan] = useState(true);
  const { dataDonation, loadingDonation, errorDonation } = useSelector(
    (state) => state.user
  );
  console.log(dataDonation, "<< dataDonation KotakHadiah");

  useEffect(() => {
    dispatch(fetchUserDonationData());
  }, [dispatch]);

  useEffect(() => {
    if (errorDonation) {
      toast.error(errorDonation);
    }
  }, [errorDonation]);

  function toggleSembunyikan() {
    setSembunyikan(!sembunyikan);
  }

  if (loadingDonation) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-blue-950 w-full h-fit flex flex-col gap-3 justify-start items-start">
      {/* Awal Total Dukungan */}
      <div className="bg-black/70 w-full h-64 flex justify-start items-center  rounded-xl overflow-hidden ">
        {/* Awal Info */}
        <div className=" w-4/6 h-full p-4 flex flex-col gap-2 justify-between items-start">
          {/* Awal Total Dukungan */}
          <div className=" w-full h-fit flex justify-start items-center gap-2">
            {/* Awal Toggle Sembunyikan */}
            <div
              onClick={toggleSembunyikan}
              className={`${
                sembunyikan ? "bg-green-800" : "bg-red-600"
              } flex justify-center items-center gap-2 p-2 rounded-md cursor-pointer hover:opacity-80 transition-all duration-300 text-sm`}
            >
              {sembunyikan ? (
                <>
                  <LuEyeClosed />
                  <div>Tampilkan</div>
                </>
              ) : (
                <>
                  <GoEye />
                  <div>Sembunyikan</div>
                </>
              )}
            </div>
            {/* Akhir Toggle Sembunyikan */}

            {/* Awal Total Dukungan */}
            <div className=" text-xl font-semibold">Total Dukungan</div>
            {/* Akhir Total Dukungan */}
          </div>
          {/* Akhir Total Dukungan */}
          {/* Awal Jumlah */}
          <div
            className={`${
              sembunyikan ? "blur-md select-none" : ""
            } text-2xl font-bold transition-all duration-300`}
          >
            {formatRupiah(dataDonation?.stats?.totalEarnings)}
          </div>
          {/* Akhir Jumlah */}

          {/* Awal Total Donation */}
          <div
            className={`${
              sembunyikan ? "blur-md select-none" : ""
            }transition-all duration-300 text-sm font-medium text-gray-500`}
          >
            Total Donation: {dataDonation?.stats?.totalDonations}
          </div>

          {/* Akhir Total Donation */}
          {/* Awal Info */}
          <div className=" w-full h-fit text-sm text-gray-600 ">
            Hadiah yang kamu diterima belum dipotong oleh biaya admin. Biaya
            admin baru akan dibebankan saat kamu melakukan penarikan dana.
          </div>
          {/* Akhir Info */}

          {/* Awal Lakukan Penarikan Dana */}
          <div
            onClick={onNavigateToWithdrawal}
            className="bg-green-800 px-4 py-2 rounded-md hover:bg-green-950 cursor-pointer transition-all duration-300 text-xl"
          >
            Lakukan Penarikan Dana
          </div>
          {/* Akhir Lakukan Penarikan Dana */}
        </div>
        {/* Akhir Info */}

        {/* Awal Icon */}
        <div className=" w-2/6 h-full relative">
          <img
            src="/icon-1.png"
            alt="Icon SBUBU"
            className="absolute w-full h-full object-contain right-5 top-12"
          />
        </div>
        {/* Akhir Icon */}
      </div>
      {/* Akhir Total Dukungan */}

      {/* Awal Filter Pencarian */}
      <div>Filter Pencarian</div>
      {/* Akhir Filter Pencarian */}

      {/* Awal Export Data */}
      <div>Export Data</div>
      {/* Akhir Export Data */}

      {/* Awal Information */}
      <div>Inforamtion</div>
      {/* Akhir Information */}
    </div>
  );
}

// bg-[#1A2B32]

// {
//     "id": 8,
//     "name": "Muhammad Ridho Amrullah",
//     "username": "ridhoamrullah",
//     "email": "ridhoamrullah99@gmail.com",
//     "role": "admin",
//     "avatarUrl": "https://www.billboard.com/wp-content/uploads/2023/07/Olivia-Rodrigo-cr-Larissa-Hofmann-press-04-2023-billboard-1548.jpg?w=942&h=628&crop=1",
//     "overlayKey": "8763c58cd344a86f035c73e207a1a562",
//     "isEmailVerified": true,
//     "lastLoginAt": "2025-10-25T16:09:00.024Z",
//     "deletedAt": null,
//     "bio": "I think growing up, I always had this idea that more is better, like more friends, more people in your life, going out, more experiences.",
//     "totalEarnings": "0",
//     "alertSettings": {
//         "soundUrl": "/sounds/alamakDuitNi.mp3",
//         "minAmount": 5000,
//         "soundEnabled": true,
//         "animationType": "slide",
//         "displayDuration": 10
//     },
//     "overlaySettings": {
//         "theme": "default",
//         "fontSize": 24,
//         "textColor": "#FFFFFF",
//         "fontFamily": "Arial",
//         "backgroundColor": "rgba(0,0,0,0.8)"
//     },
//     "bankAccount": {
//         "bankName": null,
//         "accountNumber": null,
//         "accountHolderName": null
//     },
//     "banner": "/image/defaultBanner2.jpg",
//     "socialMediaLinks": {
//         "tiktok": "https://www.tiktok.com/@ridhorodhoo",
//         "threads": "https://www.threads.com/@ridhoamrullah_",
//         "twitter": "https://x.com/oliviarodrigo",
//         "youtube": "https://www.youtube.com/@muhammadridhoamrullah366",
//         "facebook": "https://www.facebook.com/OliviaRodrigoOfficial/",
//         "instagram": "https://www.instagram.com/ridhoamrullah_/"
//     },
//     "createdAt": "2025-10-13T13:43:08.049Z",
//     "updatedAt": "2025-10-25T16:09:00.024Z"
// }
