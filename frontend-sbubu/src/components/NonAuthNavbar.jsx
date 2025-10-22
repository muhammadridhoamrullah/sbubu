import { Link, useLocation } from "react-router-dom";

export default function NonAuthNavbar() {
  const path = useLocation().pathname;

  function isActive(pathname) {
    return path === pathname
      ? "border-b-2 "
      : "border-b-2 border-b-gray-600 text-gray-400 hover:text-white";
  }

  return (
    <div className="w-1/2 h-fit text-white flex flex-col gap-8 justify-start items-center ">
      {/* Awal Logo Sbubu */}
      <img
        src="/sbubu-png-coloron.png"
        className="w-52 h-16"
        alt="Logo Sbubu"
      />
      {/* Akhir Logo Sbubu */}

      {/* Awal Menu */}
      <div className=" w-full h-full flex justify-around items-center  ">
        <Link
          className={`${isActive(
            "/auth/login"
          )} flex-1 flex justify-center items-center p-2 transition-all duration-300
`}
          to={"/auth/login"}
        >
          Masuk
        </Link>
        <Link
          className={`${isActive(
            "/auth/register"
          )} flex-1 flex justify-center items-center p-2 transition-all duration-300
`}
          to={"/auth/register"}
        >
          Buat Akun
        </Link>
        <Link
          className={`${isActive(
            "/auth/forgot-password"
          )} flex-1 flex justify-center items-center p-2 transition-all duration-300`}
          to={"/auth/forgot-password"}
        >
          Lupa Password
        </Link>
        <Link
          className={`${isActive(
            "/auth/resend-email-verification"
          )} flex-1 flex justify-center items-center p-2 transition-all duration-300`}
          to={"/auth/resend-email-verification"}
        >
          Kirim Ulang Verifikasi
        </Link>
      </div>
      {/* Akhir Menu */}
    </div>
  );
}
