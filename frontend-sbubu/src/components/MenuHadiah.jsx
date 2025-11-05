import { useEffect, useRef, useState } from "react";
import { formatRupiah } from "./Helpers";
import { useDispatch, useSelector } from "react-redux";
import { lakukanPembayaran, resetPembayaran } from "../store/pembayaranSlice";
import { AiOutlineLoading } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import instance from "../axiosInstance";
import Voicenote from "./Mediashare/Voicenote";
import Youtube from "./Mediashare/Youtube";

export default function MenuHadiah({ dataStreamer, dataUser }) {
  const username = dataStreamer?.streamer?.username;

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, data, error, isCompleted } = useSelector(
    (state) => state.pembayaran
  );

  const [hideFromCreator, setHideFromCreator] = useState(false);
  const [awalDikirimSebagai, setAwalDikirimSebagai] = useState(true);

  const isLogin = dataUser && awalDikirimSebagai;

  // State untuk messageType, apakah itu text, voice, youtube, tiktok, reels
  const [messageType, setMessageType] = useState("text");

  // State untuk mediaData (voice, youtube, etc), contoh { audioBlob: Blob, duration: number } untuk voice note
  const [mediaData, setMediaData] = useState(null);
  console.log("Media Data", mediaData);

  // State untuk formDonation
  const [formDonation, setFormDonation] = useState({
    donorName: dataUser && awalDikirimSebagai ? dataUser?.username : "",
    donorEmail: dataUser && awalDikirimSebagai ? dataUser?.email : "",
    amount: 0,
    message: "",
  });

  //   function changeHandler
  function changeHandler(e) {
    const { name, value } = e.target;

    // Ini agar memastikan hanya angka yang dimasukkan untuk "amount"
    if (name === "amount") {
      const numericValue = value.replace(/[^0-9]/g, "");

      setFormDonation({
        ...formDonation,
        amount: numericValue,
      });
      return;
    } else {
      setFormDonation({
        ...formDonation,
        [name]: value,
      });
    }
  }

  // async function submitHandler, cek dulu jika hideFromCreator true maka donorName dan donorEmail di set ke "Anonymous" dan "anonymous@gmail.com""

  async function submitHandler(e) {
    e.preventDefault();

    // 1. Buat payload atau keseluruhan data dari formDonation
    let payload = { ...formDonation };

    // 2. Cek jika hideFromCreator true, maka reassign donorName dan donorEmail
    if (hideFromCreator) {
      payload.donorName = "Seseorang";
      payload.donorEmail = "seseorang@gmail.com";
    }

    // 3. Memastikan kembalikan tipe data amount ke number
    payload.amount = Number(payload.amount);

    // 4. Cek jika amount tidak ada atau kurang dari 5000, maka tampilkan toast error
    if (!payload.amount || payload.amount < 5000) {
      toast.error("Jumlah hadiah minimal adalah IDR 5.000");
      return;
    }

    // 5. Validasi media berdasarkan messageType, tidak boleh kosong
    if (messageType === "text") {
      // Text mode: tidak perlu validasi media
      console.log("📝 Text mode - no media required");
    } else if (messageType === "voice") {
      if (!mediaData || !mediaData.audioBlob) {
        toast.error("Silakan rekam pesan suara terlebih dahulu");
        return;
      }
    } else if (messageType === "youtube") {
      if (!mediaData || !mediaData.mediaUrl) {
        toast.error("Silakan masukkan URL YouTube");
        return;
      }
    } else if (messageType === "tiktok") {
      if (!mediaData || !mediaData.mediaUrl) {
        toast.error("Silakan masukkan URL TikTok");
        return;
      }
    } else if (messageType === "reels") {
      if (!mediaData || !mediaData.mediaUrl) {
        toast.error("Silakan masukkan URL Reels");
        return;
      }
    }

    // 6. Siapkan formData untuk dikirim ke backend, formData ini akan menampung semua data termasuk file jika ada
    const formData = new FormData();
    formData.append("donorName", payload.donorName);
    formData.append("donorEmail", payload.donorEmail);
    formData.append("amount", payload.amount);
    formData.append("messageType", messageType);

    // 7. Append/tambahkan data ke formData sesuai dengan messageTypenya
    if (messageType === "text") {
      formData.append("message", payload.message || "");
    } else if (messageType === "voice" && mediaData?.audioBlob) {
      formData.append("voiceFile", mediaData.audioBlob, "voice-message.webm");
      formData.append("voiceDuration", mediaData.duration);
    } else if (messageType === "youtube" && mediaData?.mediaUrl) {
      formData.append("mediaUrl", mediaData?.mediaUrl);
      formData.append("mediaTitle", mediaData?.mediaTitle);
      formData.append("videoId", mediaData?.videoId);
      formData.append("startTime", mediaData?.startTime);
      formData.append("mediaDuration", mediaData?.mediaDuration);
      formData.append("message", payload.message || "");
    } else if (messageType === "tiktok" && mediaData?.tiktokUrl) {
      formData.append("mediaUrl", mediaData?.mediaUrl);
      formData.append("mediaTitle", mediaData?.mediaTitle);
    } else if (messageType === "reels" && mediaData?.reelsUrl) {
      formData.append("mediaUrl", mediaData?.mediaUrl);
      formData.append("mediaTitle", mediaData?.mediaTitle);
    }

    // 8. Dispatch lakukanPembayaran dengan formData dan username streamer
    dispatch(lakukanPembayaran(formData, username));
  }

  // Reset pembayaran state ketika komponen di mount
  useEffect(() => {
    return () => {
      dispatch(resetPembayaran());
    };
  }, [dispatch]);

  // memunculkan window snap pay
  useEffect(() => {
    if (isCompleted && data?.midtransToken) {
      if (!window.snap) {
        toast.error("Midtrans snap belum siap. Silakan coba lagi nanti.");
        return;
      }

      window.snap.pay(data?.midtransToken, {
        onSuccess: async function (result) {
          // Hit API midtrans-webhook untuk update status pembayaran
          try {
            const response = await instance.post("/donation/midtrans-webhook", {
              order_id: result.order_id,
              transaction_status: result.transaction_status,
              fraud_status: result.fraud_status,
              data: result,
              isLogin: isLogin,
              dataUser: isLogin ? dataUser : null,
            });

            toast.success("Pembayaran berhasil dilakukan.");

            navigate(`/transaction/${result.order_id}`);
          } catch (error) {
            if (error.response) {
              const message =
                error.response.data?.message || "Gagal memproses pembayaran";
              toast.error(message);
            } else if (error.request) {
              toast.error("Tidak ada respon dari server. Silakan coba lagi.");
            } else {
              toast.error("Terjadi kesalahan saat memproses pembayaran.");
            }
          }
        },
        onPending: async function (result) {
          // HIT API midtrans-webhook untuk update status pembayaran
          console.log(result, "<< ONPENDING");

          try {
            const response = await instance.post("/donation/midtrans-webhook", {
              order_id: result.order_id,
              transaction_status: result.transaction_status,
              fraud_status: result.fraud_status,
              data: result,
            });

            toast(
              "Menunggu pembayaran Anda diselesaikan. Akan diarahkan ke halaman detail transaksi.",
              {
                icon: "⏳",
              }
            );
            await new Promise((resolve) => setTimeout(resolve, 5000));

            navigate(`/transaction/${result.order_id}`);
          } catch (error) {
            if (error.response) {
              const message =
                error.response.data?.message || "Gagal memproses pembayaran";
              toast.error(message);
            } else if (error.request) {
              toast.error("Tidak ada respon dari server. Silakan coba lagi.");
            } else {
              toast.error("Terjadi kesalahan saat memproses pembayaran.");
            }
          }
        },
        onError: async function (result) {
          toast.error(
            "Terjadi kesalahan pada pembayaran Anda. Silakan coba lagi."
          );

          try {
            const response = await instance.post("/donation/midtrans-webhook", {
              order_id: result.order_id,
              transaction_status: result.transaction_status,
              fraud_status: result.fraud_status,
              data: result,
            });
          } catch (error) {
            if (error.response) {
              const message =
                error.response.data?.message || "Gagal memproses pembayaran";
              toast.error(message);
            } else if (error.request) {
              toast.error("Tidak ada respon dari server. Silakan coba lagi.");
            } else {
              toast.error("Terjadi kesalahan saat memproses pembayaran.");
            }
          }

          navigate(`/transaction/${result.order_id}`);
        },
        onClose: async function () {
          toast.error("Anda menutup popup pembayaran tanpa menyelesaikannya.");
        },
      });
    }
  }, [isCompleted, data]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  function changeDikirimSebagai() {
    setAwalDikirimSebagai(false);
    setFormDonation({
      donorName: "",
      donorEmail: "",
      amount: formDonation.amount, // Keep amount
      message: formDonation.message, // Keep message
    });
  }
  // Function callback dari child, child atau menu mediashare mengirim datanya ke parent (MenuHadiah) state mediaData
  function handleMediaDataChange(data) {
    setMediaData(data);
  }

  // Daftar menu/fitur mediashare
  const menuMediashare = [
    { name: "Youtube", type: "youtube" },
    { name: "Tiktok", type: "tiktok" },
    { name: "Reels", type: "reels" },
    { name: "Voice Note", type: "voice" },
  ];

  // Passing function handleMediaDataChange ke masing-masing komponen mediashare agar komponen tersebut dapat mengirim data ke parent (MenuHadiah) ke state mediaData
  const menuMediashareComponents = {
    youtube:
      formDonation.amount >= 50000 ? (
        <Youtube
          onDataChange={handleMediaDataChange}
          amount={formDonation.amount}
        />
      ) : (
        <>
          <div className="w-full h-fit flex justify-center items-center text-red-500">
            Membutuhkan minimal Rp 50.000 untuk menggunakan fitur Media Share
            Youtube.
          </div>
        </>
      ),
    tiktok: <div>Tiktok Component</div>,
    reels: <div>Reels Component</div>,
    voice:
      formDonation.amount >= 50000 ? (
        <Voicenote onDataChange={handleMediaDataChange} />
      ) : (
        <>
          <div className="w-full h-fit flex justify-center items-center text-red-500">
            Membutuhkan minimal Rp 50.000 untuk menggunakan fitur Voice Note.
          </div>
        </>
      ),
  };

  // Pilihan nominal donation
  let chooseAmount = [
    5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000,
  ];

  // Function untuk memilih nominal donation
  function handleSelectAmount(amount) {
    setFormDonation({
      ...formDonation,
      amount: amount,
    });
  }

  return (
    <div className=" w-full h-fit flex flex-col  justify-start items-start">
      <Toaster position="top-center" reverseOrder={false} />
      {/* Awal Judul Hadiah */}
      <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">Hadiah</div>
      {/* Akhir Judul Hadiah */}

      {/* Awal Konten Hadiah */}
      <form
        onSubmit={submitHandler}
        className=" w-full h-fit p-4 flex flex-col gap-2 justify-start items-start "
      >
        {/* Awal Dari dan Email */}
        <div className=" w-full h-fit flex flex-col gap-4 justify-start items-start">
          {/* Cek apakah dataUser/Login ada */}
          {dataUser && awalDikirimSebagai ? (
            <>
              {/* Awal Dikirim Oleh */}
              <div className=" w-full h-fit flex flex-col  gap-2 justify-start items-start">
                <label>Dikirim Oleh</label>
                {/* Awal Data User Pengirim */}
                <div className="bg-pink-700/50 w-fit h-fit flex justify-start items-center gap-2 p-2 rounded-xl">
                  {/* Awal Avatar Url */}
                  <div className=" w-10 h-10 relative rounded-full overflow-hidden">
                    <img
                      src={dataUser?.avatarUrl}
                      alt={dataUser?.name}
                      className="w-full h-full absolute object-cover rounded-full"
                    />
                  </div>
                  {/* Akhir Avatar Url */}
                  <div className="w-fit h-fit text-xl">
                    {dataUser?.username}
                  </div>
                </div>
                {/* Akhir Data User Pengirim */}

                {/* Awal Bukan Sebagai User Login */}
                <div
                  onClick={() => changeDikirimSebagai()}
                  className="text-orange-500 text-sm hover:text-orange-900 cursor-pointer"
                >
                  Kirim Sebagai Anonymous
                </div>
                {/* Akhir Bukan Sebagai User Login */}
              </div>
              {/* Akhir Dikirim Oleh */}
            </>
          ) : (
            <>
              {/* Awal Dari */}
              <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
                <label>
                  Dari <span className="text-red-400">*</span>
                </label>
                {/* Awal Input Dari */}
                <input
                  type="text"
                  name="donorName"
                  id="donorName"
                  value={hideFromCreator ? "Anonymous" : formDonation.donorName}
                  onChange={changeHandler}
                  placeholder="Dewa Beras Gerlong"
                  disabled={hideFromCreator}
                  required
                  className={`outline-none w-full h-10  rounded-md p-2 ${
                    hideFromCreator
                      ? "bg-red-800 cursor-not-allowed"
                      : "bg-[#1A2B32] placeholder:text-gray-500"
                  } transition-all duration-1000`}
                />
                {/* Akhir Input Dari */}
              </div>
              {/* Akhir Dari */}
              {/* Awal Email */}
              <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
                <label>
                  Email <span className="text-red-500">*</span>
                </label>
                {/* Awal Input Email */}
                <input
                  type="email"
                  name="donorEmail"
                  id="donorEmail"
                  disabled={hideFromCreator}
                  value={
                    hideFromCreator
                      ? "anonymous@gmail.com"
                      : formDonation.donorEmail
                  }
                  placeholder="dewaberasgerlong@gmail.com"
                  onChange={changeHandler}
                  required
                  className={`outline-none w-full h-10  rounded-md p-2 ${
                    hideFromCreator
                      ? "bg-red-800 cursor-not-allowed"
                      : "bg-[#1A2B32] placeholder:text-gray-500"
                  } transition-all duration-1000`}
                />
                {/* Akhir Input Email */}

                {/* Awal Checkbox Sembunyikan dari kreator */}
                <div className=" flex justify-start items-center gap-2 mt-2">
                  <input
                    type="checkbox"
                    name="hideFromCreator"
                    id="hideFromCreator"
                    checked={hideFromCreator}
                    onChange={() => setHideFromCreator(!hideFromCreator)}
                    className="w-3 h-3 accent-pink-500 cursor-pointer"
                  />

                  <label className="text-sm" htmlFor="hideFromCreator">
                    Kirim sebagai anonymous
                  </label>
                </div>

                {/* Akhir Checkbox Sembunyikan dari kreator */}
              </div>
              {/* Akhir Email */}
            </>
          )}
        </div>
        {/* Akhir Dari dan Email */}

        {/* Awal Garis Pembatas */}
        <div className="w-full h-0.5 bg-[#1A2B32] my-2"></div>
        {/* Akhir Garis Pembatas */}

        {/* Awal Pesan */}
        <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
          <label>Pesan</label>
          {/* Awal Input Pesan */}
          <textarea
            name="message"
            id="message"
            placeholder="Halo kreator favoritku, aku nge fans banget dech sama kamyuh"
            className="outline-none w-full h-40 bg-[#1A2B32] rounded-md p-2 placeholder:text-gray-500"
            value={formDonation.message}
            maxLength={500}
            onChange={changeHandler}
          />
          {/* Akhir Input Pesan */}
        </div>
        {/* Akhir Pesan */}

        {/* Awal Garis Pembatas */}
        <div className="w-full h-0.5 bg-[#1A2B32] my-2"></div>
        {/* Akhir Garis Pembatas */}

        {/* Awal Mediashare */}
        <div className="bg-black/70 w-full h-fit flex flex-col justify-start items-start rounded-xl overflow-hidden">
          {/* Awal Judul Mediashare */}
          <div className="bg-[#1A2B32] w-full h-fit py-1 px-4 text-xl">
            Mediashare
          </div>
          {/* Akhir Judul Mediashare */}

          {/* Awal Isi Mediashare */}
          <div className="w-full h-fit flex flex-wrap justify-start items-center gap-2 p-4">
            {/* Awal Mapping Menu Mediashare */}
            {menuMediashare.map((el, idx) => {
              let isActive = messageType === el.type;

              return (
                <div
                  key={idx}
                  onClick={() => {
                    setMessageType(isActive ? "text" : el.type);
                    setMediaData(null);
                  }}
                  className={`${
                    isActive ? "bg-pink-600" : "bg-[#1A2B32]"
                  } py-2 px-4 rounded-md hover:bg-pink-600 transition-all duration-300`}
                >
                  {el.name}
                </div>
              );
            })}
            {/* Akhir Mapping Menu Mediashare */}
          </div>

          {/* Awal Menu Mediashare */}

          <div
            className={`${
              messageType === "text" ? "hidden" : ""
            } p-4 w-full h-fit overflow-hidden `}
          >
            {menuMediashareComponents[messageType]}
          </div>
          {/* Akhir Menu Mediashare */}

          {/* Akhir Isi Mediashare */}
        </div>
        {/* Akhir Mediashare */}

        {/* Awal Garis Pembatas */}
        <div className="w-full h-0.5 bg-[#1A2B32] my-2"></div>
        {/* Akhir Garis Pembatas */}

        {/* Awal Jumlah Hadiah */}
        <div className=" w-full h-fit flex flex-col gap-3 justify-start items-start">
          {/* Awal Jumlah Hadiah Input */}
          <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>
              Jumlah Hadiah <span className="text-red-500">*</span>
            </label>
            {/* Awal Input Hadiah */}
            <input
              type="text"
              name="amount"
              id="amount"
              value={`${formatRupiah(formDonation.amount)}`}
              required
              className="outline-none w-full h-10 rounded-md p-2 bg-[#1A2B32] placeholder:text-gray-500  "
              onChange={changeHandler}
            />
            {/* Akhir Input Hadiah */}
            <div className=" flex justify-start items-center gap-2 text-xs text-gray-400 mt-1">
              <div className="bg-[#1A2B32] py-1 px-2 rounded-md">
                Jumlah Minimum Muncul di Alert:{" "}
                <span className="text-blue-700">IDR: 10.000</span>
              </div>
              <div className="bg-[#1A2B32] py-1 px-2 rounded-md">
                Text-To-Speech:{" "}
                <span className="text-blue-700">IDR 999.999</span>
              </div>
            </div>
          </div>
          {/* Akhir Jumlah Hadiah Input */}

          {/* Awal Pilih Nominal */}
          <div className="w-full h-fit flex flex-wrap justify-start items-center gap-2">
            {chooseAmount.map((el) => {
              let isActive = formDonation.amount == el;

              return (
                <button
                  type="button"
                  key={el}
                  onClick={() => handleSelectAmount(el)}
                  className={`${
                    isActive ? "bg-blue-700" : "bg-[#1A2B32]"
                  }  py-2 px-4 rounded-md hover:bg-blue-700 transition-all duration-300`}
                >
                  {formatRupiah(el)}
                </button>
              );
            })}
          </div>
          {/* Akhir Pilih Nominal */}
        </div>

        {/* Akhir Jumlah Hadiah */}

        {/* Awal Garis Pembatas */}
        <div className="w-full h-0.5 bg-[#1A2B32] my-2"></div>
        {/* Akhir Garis Pembatas */}

        {/* Awal Powerups */}
        {/* Akhir Powerups */}

        {/* Awal Mediashare */}
        {/* Akhir Mediashare */}

        {/* Awal Pilih Metode Pembayaran */}
        <button
          type="submit"
          disabled={loading}
          className={`${
            loading
              ? "bg-red-800 cursor-not-allowed animate-pulse"
              : "bg-pink-700 hover:bg-pink-900/70 cursor-pointer"
          } w-full h-12 rounded-md font-semibold text-lg transition-all duration-300 flex justify-center items-center`}
        >
          {loading ? (
            <div className=" flex justify-center items-center ">
              <AiOutlineLoading className="animate-spin" size={20} />
            </div>
          ) : (
            <div>Kirim Hadiah</div>
          )}
        </button>

        {/* Akhir Pilih Metode Pembayaran */}
      </form>
      {/* Akhir Konten Hadiah */}
    </div>
  );
}

// onSuccess pakai credit card

// {
//     "status_code": "200",
//     "status_message": "Success, Credit Card capture transaction is successful",
//     "transaction_id": "5e371ffa-e1c9-4db9-b1c5-3a33eb44e979",
//     "order_id": "DON-ridhoamrullah-1761312121903-9722",
//     "gross_amount": "10000.00",
//     "payment_type": "credit_card",
//     "transaction_time": "2025-10-24 20:22:16",
//     "transaction_status": "capture",
//     "fraud_status": "accept",
//     "bank": "cimb",
//     "masked_card": "48111111-1114",
//     "card_type": "credit",
//     "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761312121903-9722&status_code=200&transaction_status=capture"
// }

// {
//    "bank": "cimb",
// "order_id": "DON-ridhoamrullah-1761313108701-3340", "card_type": "credit", "masked_card": "48111111-1114", "status_code": "200", "fraud_status": "accept", "gross_amount": "100000.00", "payment_type": "credit_card", "status_message": "Success, Credit Card capture transaction is successful", "transaction_id": "a36deae3-5066-4961-b9fc-4fee1ca2245b", "transaction_time": "2025-10-24 20:38:40", "transaction_status": "capture", "finish_redirect_url": "http://example.com?order_id=DON-ridhoamrullah-1761313108701-3340&status_code=200&transaction_status=capture"}

// onSuccess final midtransResponse
// {"order_id": "DON-ridhoamrullah-1761312776088-6785", "fraud_status": "accept", "transaction_status": "capture"}

// {
//     "streamer": {
//         "id": 8,
//         "username": "ridhoamrullah",
//         "name": "Muhammad Ridho Amrullah",
//         "banner": "/image/defaultBanner2.jpg",
//         "isEmailVerified": true,
//         "socialMediaLinks": {
//             "tiktok": "https://www.tiktok.com/@ridhorodhoo",
//             "threads": "https://www.threads.com/@ridhoamrullah_",
//             "twitter": "https://x.com/oliviarodrigo",
//             "youtube": "https://www.youtube.com/@muhammadridhoamrullah366",
//             "facebook": "https://www.facebook.com/OliviaRodrigoOfficial/",
//             "instagram": "https://www.instagram.com/ridhoamrullah_/"
//         },
//         "avatarUrl": "https://www.billboard.com/wp-content/uploads/2023/07/Olivia-Rodrigo-cr-Larissa-Hofmann-press-04-2023-billboard-1548.jpg?w=942&h=628&crop=1"
//     }
// }

// {
//     "id": 8,
//     "name": "Muhammad Ridho Amrullah",
//     "username": "ridhoamrullah",
//     "email": "ridhoamrullah99@gmail.com",
//     "role": "admin",
//     "avatarUrl": "https://www.billboard.com/wp-content/uploads/2023/07/Olivia-Rodrigo-cr-Larissa-Hofmann-press-04-2023-billboard-1548.jpg?w=942&h=628&crop=1",
//     "overlayKey": "8763c58cd344a86f035c73e207a1a562",
//     "isEmailVerified": true,
//     "lastLoginAt": "2025-10-25T14:27:11.915Z",
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
//     "updatedAt": "2025-10-25T14:27:11.915Z"
// }

// {awalDikirimSebagai ? (
//             <>
// {/* Awal Dikirim Oleh */}
// <div className=" w-full h-fit flex flex-col  gap-2 justify-start items-start">
//   <label>Dikirim Oleh</label>
//   {/* Awal Data User Pengirim */}
//   <div className="bg-pink-700/50 w-fit h-fit flex justify-start items-center gap-2 p-2 rounded-xl">
//     {/* Awal Avatar Url */}
//     <div className=" w-10 h-10 relative rounded-full overflow-hidden">
//       <img
//         src={dataUser?.avatarUrl}
//         alt={dataUser?.name}
//         className="w-full h-full absolute object-cover rounded-full"
//       />
//     </div>
//     {/* Akhir Avatar Url */}
//     <div className="w-fit h-fit text-xl">
//       {dataUser?.username}
//     </div>
//   </div>
//   {/* Akhir Data User Pengirim */}

//   {/* Awal Bukan Sebagai User Login */}
//   <div className="text-orange-500 text-sm hover:text-orange-900 cursor-pointer">
//     Kirim Sebagai Anonymous
//   </div>
//   {/* Akhir Bukan Sebagai User Login */}
// </div>
// {/* Akhir Dikirim Oleh */}
//             </>
//           ) : (
// <>
//   {/* Awal Dari */}
//   <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
//     <label>
//       Dari <span className="text-red-400">*</span>
//     </label>
//     {/* Awal Input Dari */}
//     <input
//       type="text"
//       name="donorName"
//       id="donorName"
//       value={hideFromCreator ? "Anonymous" : formDonation.donorName}
//       onChange={changeHandler}
//       placeholder="Dewa Beras Gerlong"
//       disabled={hideFromCreator}
//       required
//       className={`outline-none w-full h-10  rounded-md p-2 ${
//         hideFromCreator
//           ? "bg-red-800 cursor-not-allowed"
//           : "bg-[#1A2B32] placeholder:text-gray-500"
//       } transition-all duration-1000`}
//     />
//     {/* Akhir Input Dari */}
//   </div>
//   {/* Akhir Dari */}
//   {/* Awal Email */}
//   <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
//     <label>
//       Email <span className="text-red-500">*</span>
//     </label>
//     {/* Awal Input Email */}
//     <input
//       type="email"
//       name="donorEmail"
//       id="donorEmail"
//       disabled={hideFromCreator}
//       value={
//         hideFromCreator
//           ? "anonymous@gmail.com"
//           : formDonation.donorEmail
//       }
//       placeholder="dewaberasgerlong@gmail.com"
//       onChange={changeHandler}
//       required
//       className={`outline-none w-full h-10  rounded-md p-2 ${
//         hideFromCreator
//           ? "bg-red-800 cursor-not-allowed"
//           : "bg-[#1A2B32] placeholder:text-gray-500"
//       } transition-all duration-1000`}
//     />
//     {/* Akhir Input Email */}

//     {/* Awal Checkbox Sembunyikan dari kreator */}
//     <div className=" flex justify-start items-center gap-2 mt-2">
//       <input
//         type="checkbox"
//         name="hideFromCreator"
//         id="hideFromCreator"
//         checked={hideFromCreator}
//         onChange={() => setHideFromCreator(!hideFromCreator)}
//         className="w-3 h-3 accent-pink-500 cursor-pointer"
//       />

//       <label className="text-sm" htmlFor="hideFromCreator">
//         Kirim sebagai anonymous
//       </label>
//     </div>
//     {/* Akhir Checkbox Sembunyikan dari kreator */}
//   </div>
//   {/* Akhir Email */}
// </>
//           )}
