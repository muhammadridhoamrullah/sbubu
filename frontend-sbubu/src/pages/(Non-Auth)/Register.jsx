import { useState } from "react";
import GenerateMetadata from "../../components/GenerateMetadata";
import { AiOutlineEye } from "react-icons/ai";
import { AiOutlineEyeInvisible } from "react-icons/ai";

export default function Register() {
  const metadata = {
    title: "Register | SBUBU",
    description: "Register page for SBUBU users",
    keywords: "SBUBU, register, sign up, create account, new user",
    ogType: "website",
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState("");
  const [formRegister, setFormRegister] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmPassword] = useState("");

  function togglePasswordVisibility() {
    setShowPassword(!showPassword);
  }

  function toggleConfirmPasswordVisibility() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function checkConfirmPassword() {
    if (formRegister.password !== confirmPassword) {
      setPasswordMismatch("Password not match");
    } else {
      setPasswordMismatch("");
    }
  }

  function changeHandler(e) {
    const { name, value } = e.target;
    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  }

  async function submitHandler(e) {
    e.preventDefault();

    console.log("Form submitted:", formRegister);
  }
  return (
    <>
      <GenerateMetadata data={metadata} />
      <div className="bg-[#1A2B32] w-1/2 h-fit rounded-2xl   flex flex-col justify-start items-start text-white border border-gray-800 overflow-hidden">
        {/* Awal buat akun sbubu */}
        <div className="w-full font-bold text-xl p-3">Buat Akun Sbubu-mu</div>
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
          {/* Awal Name */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder-gray-400"
              placeholder="Sbubu Team"
              onChange={changeHandler}
              value={formRegister.name}
            />
          </div>
          {/* Akhir Name */}
          {/* Awal Username */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start ">
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder-gray-400"
              placeholder="sbubu"
              onChange={changeHandler}
              value={formRegister.username}
            />
          </div>
          {/* Akhir Username */}
          {/* Awal Email */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-[#1A2B32] w-full h-fit p-2 rounded-md outline-none placeholder-gray-400"
              placeholder="sbubu@gmail.com"
              onChange={changeHandler}
              value={formRegister.email}
            />
          </div>
          {/* Akhir Email */}
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
                value={formRegister.password}
              />

              <button
                onClick={togglePasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showPassword ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
              </button>
            </div>
          </div>
          {/* Akhir Password */}
          {/* Awal Confirm Password */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Confirm Password</label>
            <div className="relative w-full h-fit">
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                id="confirmPassword"
                onBlur={checkConfirmPassword}
                className={` w-full h-fit p-2 rounded-md outline-none placeholder-gray-400 ${
                  passwordMismatch ? "  bg-red-500/70" : "bg-[#1A2B32]"
                }`}
                placeholder="********"
                onChange={(e) => setConfirmPassword(e.target.value)}
                value={confirmPassword}
              />
              <button
                onClick={toggleConfirmPasswordVisibility}
                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-400 hover:text-white cursor-pointer"
              >
                {showConfirmPassword ? (
                  <AiOutlineEye />
                ) : (
                  <AiOutlineEyeInvisible />
                )}
              </button>
            </div>
          </div>
          {/* Akhir Confirm Password */}

          {/* Awal Button */}
          <button
            type="submit"
            className="w-full bg-green-800 cursor-pointer p-3 mt-2 hover:bg-green-900 rounded-md  transition-all duration-300 text-xl"
          >
            Create Account
          </button>
          {/* Akhir Button */}
        </form>
        {/* Akhir Form */}
      </div>
    </>
  );
}

// bg-[#111D22]

// name, username, email, password, confirm password
