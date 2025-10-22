import toast, { Toaster } from "react-hot-toast";
import GenerateMetadata from "../../components/GenerateMetadata";
import { VscLoading } from "react-icons/vsc";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doLogin } from "../../store/loginSlice";
import { useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function Login() {
  const dispatch = useDispatch();
  const { loading, data, error, isLoggedIn } = useSelector(
    (state) => state.login
  );
  const navigate = useNavigate();
  const metadata = {
    title: "Login - SBUBU",
    description: "Login page for SBUBU users",
    keywords: "SBUBU, login, sign in, access account, user login",
    ogType: "website",
  };

  const [showPassword, setShowPassword] = useState(false);

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  const [formLogin, setFormLogin] = useState({
    identifier: "",
    password: "",
  });

  function changeHandler(e) {
    const { name, value } = e.target;

    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();
    dispatch(doLogin(formLogin));
  }

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (isLoggedIn) {
      toast.success("Login successful!");
      navigate("/me");
    }
  }, [isLoggedIn, navigate]);

  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className="bg-[#1A2B32] w-1/2 h-fit rounded-2xl   flex flex-col justify-start items-start text-white border border-gray-800 overflow-hidden">
        <Toaster position="bottom-center" reverseOrder={false} />
        {/* Awal buat akun sbubu */}
        <div className="w-full font-bold text-xl p-3">Masuk ke Sbubu-mu</div>
        {/* Akhir buat akun sbubu */}

        {/* Awal Logo */}
        <div className="bg-[#111D22] w-full h-52 relative">
          <img
            src={"/sbubu-logo.png"}
            alt="Logo Sbubu"
            className="absolute w-full h-full object-contain"
          />
        </div>
        {/* Akhir Logo */}
        {/* Awal Form */}
        <form
          onSubmit={submitHandler}
          className="p-3 bg-[#111D22] w-full h-full flex flex-col gap-2 justify-start items-start"
        >
          {/* Awal Identifier */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start ">
            <label>Username / Email</label>
            <input
              type="text"
              name="identifier"
              id="identifier"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder-gray-400"
              placeholder="Email atau Username"
              onChange={changeHandler}
              value={formLogin.identifier}
              required
            />
          </div>
          {/* Akhir Identifier */}

          {/* Awal Password */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Password</label>
            <div className="relative w-full h-fit">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder-gray-400"
                placeholder="********"
                onChange={changeHandler}
                value={formLogin.password}
                required
              />

              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          {/* Akhir Password */}

          {/* Awal Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full h-14 mt-2 rounded-md  transition-all duration-300 text-xl ${
              loading
                ? "bg-gray-500 animate-pulse  cursor-not-allowed"
                : "bg-green-800 hover:bg-green-900 cursor-pointer"
            } flex justify-center items-center`}
          >
            {loading ? (
              <VscLoading className="text-2xl animate-spin" />
            ) : (
              "Masuk"
            )}
          </button>
          {/* Akhir Button */}
        </form>
        {/* Akhir Form */}
      </div>
    </>
  );
}
