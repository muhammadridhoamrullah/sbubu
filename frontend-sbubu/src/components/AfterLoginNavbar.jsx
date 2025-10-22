import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { Link, useLocation } from "react-router-dom";

export default function AfterLoginNavbar() {
  const path = useLocation().pathname;
  const username = "ridhoamrullah99";

  function isActive(pathname) {
    return path === pathname
      ? "border-b-2 "
      : "border-b-2 border-b-gray-600 text-gray-400 hover:text-white";
  }
  return (
    <div className=" w-3/4 h-fit text-white flex flex-col gap-10 justify-start items-start">
      {/* Awal Logo Sbubu dan To Profile */}
      <div className=" w-full h-1/2 flex justify-between items-center ">
        {/* Awal Logo */}
        <img
          src={"/sbubu-png-coloron.png"}
          alt="Logo Sbubu"
          className="w-40 h-12"
        />
        {/* Akhir Logo */}

        {/* Awal To Profile */}
        <div className="h-14 flex justify-start items-center gap-3 bg-gray-800 p-2 rounded-md cursor-pointer hover:bg-gray-700 transition-all duration-300">
          <img
            src={"/default-profile-picture.png"}
            alt="Profile Picture"
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>Username</div>
          <IoIosArrowDown />
        </div>
        {/* Akhir To Profile */}
      </div>
      {/* Akhir Logo Sbubu dan To Profile */}
      {/* Awal Menu */}
      <div className=" w-full h-1/2 flex justify-start items-center">
        <Link
          className={`${isActive("/me")} py-3 px-4 transition-all duration-300`}
          to={"/me"}
        >
          Personal
        </Link>
        <Link
          className={`${isActive(
            `/c/${username}`
          )} py-3 px-4 transition-all duration-300`}
          to={`/c/${username}`}
        >
          Creator
        </Link>
      </div>
      {/* Akhir Menu */}
    </div>
  );
}

// flex-1 flex justify-center items-center p-2 transition-all duration-300
