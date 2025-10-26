import { useEffect } from "react";
import { IoIosArrowDown } from "react-icons/io";
import { IoIosArrowUp } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { fetchUserData } from "../store/userSlice";
import toast, { Toaster } from "react-hot-toast";

export default function AfterLoginNavbar() {
  const dispatch = useDispatch();
  const {
    data: dataUser,
    error: errorUser,
    loading: loadingUser,
  } = useSelector((state) => state.user);

  const path = useLocation().pathname;

  function isActive(pathname) {
    return path === pathname
      ? "border-b-2 "
      : "border-b-2 border-b-gray-600 text-gray-400 hover:text-white";
  }

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  useEffect(() => {
    if (errorUser) {
      toast.error(errorUser);
    }
  }, [errorUser]);

  if (loadingUser) {
    return <div>Loading...</div>;
  }

  return (
    <div className=" w-3/4 h-fit text-white flex flex-col gap-10 justify-start items-start">
      <Toaster position="top-center" reverseOrder={false} />
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
            src={dataUser?.avatarUrl || "/default-profile.png"}
            alt={`Profile Picture of ${dataUser?.username}`}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div>{dataUser?.username}</div>
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
            `/c/${dataUser?.username}`
          )} py-3 px-4 transition-all duration-300`}
          to={`/c/${dataUser?.username}`}
        >
          <div className="w-fit h-fit flex justify-start items-center gap-2">
            <div className="w-6 h-6 relative rounded-full overflow-hidden">
              <img
                src={dataUser?.avatarUrl || "/default-profile.png"}
                alt={`Foto ${dataUser?.username}`}
                className="absolute w-full h-full object-cover"
              />
            </div>
            <div>{dataUser?.username}</div>
          </div>
        </Link>
      </div>
      {/* Akhir Menu */}
    </div>
  );
}

// flex-1 flex justify-center items-center p-2 transition-all duration-300
