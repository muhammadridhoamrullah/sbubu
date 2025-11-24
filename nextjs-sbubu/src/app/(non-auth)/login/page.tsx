"use client";

import React, { useEffect, useState } from "react";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { doLogin } from "@/app/store/loginSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Footer from "@/app/components/Footer";

export default function Login() {
  const { dataLogin, errorLogin, loadingLogin, isLogin } = useAppSelector(
    (state) => state.login
  );
  const dispatch = useAppDispatch();
  const navigate = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formLogin, setFormLogin] = useState({
    identifier: "",
    password: "",
  });

  useEffect(() => {
    if (errorLogin) {
      toast.error(`Login failed: ${errorLogin}`);
    }
  }, [errorLogin]);

  useEffect(() => {
    if (isLogin && dataLogin) {
      //   navigate.push("/dashboard");
      toast.success("Login successful!");
    }
  }, [isLogin, dataLogin]);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormLogin({
      ...formLogin,
      [name]: value,
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    dispatch(doLogin(formLogin));
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }

  const classForDivInput =
    "w-full h-fit flex flex-col gap-2 justify-start items-start";
  const classForInput =
    "w-full h-12 p-2 outline-none border-2 border-gray-800 rounded-md  focus:border-blue-900 transition-all duration-1000 placeholder:text-gray-700";

  return (
    <div className="bg-black w-full min-h-screen py-8 flex flex-col gap-4 justify-start items-center text-white">
      {/* Awal Logo Sbubu */}
      <div className="w-64 h-16 relative overflow-hidden mb-2">
        <img
          src={"/sbubu-png-coloron.png"}
          alt="Logo SBUBU"
          className="absolute w-full h-full"
        />
      </div>
      {/* Akhir Logo Sbubu */}

      {/* Awal Text Login */}
      <div className="text-4xl font-bold">Login to your account</div>
      {/* Akhir Text Login */}

      {/* Awal Form Login */}
      <form
        onSubmit={submitHandler}
        className="w-[550px] h-fit p-4 border-2 border-gray-600 rounded-lg flex flex-col gap-2 overflow-hidden"
      >
        {/* Awal Email / Username */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>
            Email / Username <span className="text-red-500">*</span>
          </label>
          {/* Akhir Label */}

          {/* Awal Input Email / Username */}
          <input
            type="text"
            name="identifier"
            id="identifier"
            placeholder="Your email / username"
            className={classForInput}
            required
            onChange={changeHandler}
            value={formLogin.identifier}
          />
          {/* Akhir Input Email / Username */}
        </div>
        {/* Akhir Email / Username */}

        {/* Awal Password */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>Password</label>
          {/* Akhir Label */}
          {/* Awal Input Password */}
          <div className="w-full h-fit flex flex-col relative">
            {/* Awal Input Password */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              placeholder="*******"
              className={classForInput}
              required
              onChange={changeHandler}
              value={formLogin.password}
            />
            {/* Akhir Input Password */}

            {/* Awal Toggle Show Password */}
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer"
            >
              {showPassword ? (
                <RiEyeCloseLine className="text-lg" />
              ) : (
                <RiEyeLine className="text-lg" />
              )}
            </button>
            {/* Akhir Toggle Show Password */}
          </div>
          {/* Akhir Input Password */}
        </div>
        {/* Akhir Password */}

        {/* Awal Button Submit */}
        <button
          disabled={loadingLogin}
          type="submit"
          className="mt-2 w-full h-12 p-2 bg-green-900 hover:bg-green-950 rounded-md transition-all duraiton text-lg cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed"
        >
          {loadingLogin ? (
            <AiOutlineLoading3Quarters className="m-auto animate-spin text-2xl" />
          ) : (
            "Sign In"
          )}
        </button>
        {/* Akhir Button Submit */}
      </form>
      {/* Akhir Form Login */}

      {/* Awal Footer */}
      <Footer />
      {/* Akhir Footer */}
    </div>
  );
}
