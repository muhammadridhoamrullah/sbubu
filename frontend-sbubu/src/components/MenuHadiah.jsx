import { useEffect, useState } from "react";
import { formatRupiah } from "./Helpers";
import { useDispatch, useSelector } from "react-redux";
import { lakukanPembayaran } from "../store/pembayaranSlice";
import { AiOutlineLoading } from "react-icons/ai";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function MenuHadiah({ dataStreamer }) {
  const username = dataStreamer?.streamer?.username;
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { loading, data, error, isCompleted } = useSelector(
    (state) => state.pembayaran
  );
  const [hideFromCreator, setHideFromCreator] = useState(false);

  const [formDonation, setFormDonation] = useState({
    donorName: "",
    donorEmail: "",
    amount: 0,
    message: "",
  });

  //   function changeHandler
  function changeHandler(e) {
    const { name, value } = e.target;

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
  let chooseAmount = [
    5000, 10000, 25000, 50000, 100000, 250000, 500000, 1000000,
  ];

  function handleSelectAmount(amount) {
    setFormDonation({
      ...formDonation,
      amount: amount,
    });
  }

  // async function submitHandler, cek dulu jika hideFromCreator true maka donorName dan donorEmail di set ke "Anonymous" dan "anonymous@gmail.com""

  async function submitHandler(e) {
    e.preventDefault();

    // Validasi formDonation
    let payload = { ...formDonation };

    if (hideFromCreator) {
      payload.donorName = "Anonymous";
      payload.donorEmail = "anonymous@gmail.com";
    }

    payload.amount = Number(payload.amount);

    if (!payload.amount || payload.amount < 5000) {
      toast.error("Jumlah hadiah minimal adalah IDR 5.000");
      return;
    }

    dispatch(lakukanPembayaran(payload, username));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isCompleted && data) {
      navigate("/success-payment", { state: { paymentData: data } });
    }
  }, [isCompleted, data, navigate]);

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
