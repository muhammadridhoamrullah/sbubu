"use client";

import React, { useEffect, useState } from "react";
import Loading from "./loading";
import { RiEyeCloseLine } from "react-icons/ri";
import { RiEyeLine } from "react-icons/ri";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/app/store/hooks";
import { doRegister, registerReset } from "@/app/store/registerSlice";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import Footer from "@/app/components/Footer";

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useRouter();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorMatchingPassword, setErrorMatchingPassword] = useState(false);
  const dispatch = useAppDispatch();
  const { dataRegis, errorRegis, loadingRegis, isRegistered } = useAppSelector(
    (state) => state.register
  );
  // State Checkbox T&C
  const [checked, setChecked] = useState(false);
  const [formRegister, setFormRegister] = useState({
    name: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (errorRegis) {
      toast.error(`Register Failed: ${errorRegis}`);
    }
  }, [errorRegis]);

  useEffect(() => {
    if (isRegistered) {
      setFormRegister({
        name: "",
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      });

      setChecked(false);
      setErrorMatchingPassword(false);

      dispatch(registerReset());

      navigate.push("/login");
    }
  }, [isRegistered, navigate, dispatch]);

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    setFormRegister({
      ...formRegister,
      [name]: value,
    });
  }

  async function submitHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const { confirmPassword, ...formRegis } = formRegister;
    dispatch(doRegister(formRegis));
  }

  function toggleShowPassword() {
    setShowPassword(!showPassword);
  }
  function toggleShowConfirmPassword() {
    setShowConfirmPassword(!showConfirmPassword);
  }

  function checkMatchingPassword() {
    const { password, confirmPassword } = formRegister;

    if (!password || !confirmPassword || confirmPassword.trim().length === 0)
      return;

    if (password === confirmPassword) {
      setErrorMatchingPassword(false);
    } else {
      setErrorMatchingPassword(true);
    }
  }

  const classForDivInput =
    "w-full h-fit flex flex-col gap-2 justify-start items-start";
  const classForInput =
    "w-full h-12 p-2 outline-none border-2 border-gray-800 rounded-md  focus:border-blue-900 transition-all duration-1000 placeholder:text-gray-700";

  return (
    <div className="bg-black w-full min-h-screen py-8 flex flex-col gap-4 justify-start items-center text-white">
      {/* Awal Logo SBUBU */}
      <div className=" w-64 h-16 relative overflow-hidden mb-2">
        <img
          src={`/sbubu-png-coloron.png`}
          alt="Sbubu Logo"
          className="w-full h-full absolute"
        />
      </div>
      {/* Akhir Logo SBUBU */}

      {/* Awal Create Your Account */}
      <div className="text-4xl font-bold">Create Your Account</div>
      {/* Akhir Create Your Account */}

      {/* Awal Form Register */}
      <form
        onSubmit={submitHandler}
        className="w-[550px] h-fit p-4 border-2 border-gray-600 rounded-lg flex flex-col gap-2 overflow-hidden transition-all duration-1000"
      >
        {/* Awal Your Name */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>
            Your Name <span className="text-red-500">*</span>
          </label>
          {/* Akhir Label */}

          {/* Awal Input Your Name */}
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Dewa Beras Gerlong"
            onChange={changeHandler}
            className={classForInput}
            value={formRegister.name}
            required
          />
          {/* Akhir Input Your Name */}
        </div>
        {/* Akhir Your Name */}

        {/* Awal Email Address */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>
            Email Address <span className="text-red-500">*</span>
          </label>

          {/* Akhir Label */}

          {/* Awal Input Email Address */}
          <input
            type="email"
            name="email"
            id="email"
            placeholder="dewaberasgerlong@gmail.com"
            onChange={changeHandler}
            className={classForInput}
            required
            value={formRegister.email}
          />
          {/* Akhir Input Email Address */}
        </div>
        {/* Akhir Email Address */}

        {/* Awal Username */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>
            Username <span className="text-red-500">*</span>
          </label>
          {/* Akhir Label */}

          {/* Awal Input Username */}
          <input
            type="text"
            name="username"
            id="username"
            placeholder="dewaberasgerlong"
            value={formRegister.username}
            onChange={changeHandler}
            className={classForInput}
            required
          />
          {/* Akhir Input Username */}
        </div>
        {/* Akhir Username */}

        {/* Awal Password */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>
            Password <span className="text-red-500">*</span>
          </label>
          {/* Akhir Label */}

          {/* Awal Input Password */}
          <div className="w-full h-fit flex flex-col relative">
            {/* Awal Input */}
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              className={classForInput}
              value={formRegister.password}
              onChange={changeHandler}
              placeholder="Create your strong password"
              required
            />
            {/* Akhir Input */}

            {/* Awal Tombol Show Password */}
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
            >
              {showPassword ? (
                <RiEyeCloseLine className="text-lg" />
              ) : (
                <RiEyeLine className="text-lg" />
              )}
            </button>
            {/* Akhir Tombol Show Password */}
          </div>
          {/* Akhir Input Password */}
        </div>
        {/* Akhir Password */}

        {/* Awal Confirm Password */}
        <div className={classForDivInput}>
          {/* Awal Label */}
          <label>
            Confirm Password <span className="text-red-500">*</span>
          </label>
          {/* Akhir Label */}

          {/* Awal Input Confirm Password */}
          <div className="w-full h-fit flex flex-col relative">
            {/* Awal Input */}
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              className={`w-full h-12 p-2 outline-none border-2 border-gray-800 rounded-md focus:border-2 focus:border-blue-900 transition-all duration-1000 placeholder:text-gray-700 ${
                errorMatchingPassword
                  ? "bg-red-800 border-transparent focus:border-transparent animate-pulse"
                  : ""
              }`}
              onChange={changeHandler}
              value={formRegister.confirmPassword}
              onBlur={checkMatchingPassword}
              placeholder="Confirm your password"
              required
            />
            {/* Akhir Input */}

            {/* Awal Tombol Show Confirm Password */}
            <button
              type="button"
              onClick={toggleShowConfirmPassword}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-all duration-300 cursor-pointer"
            >
              {showConfirmPassword ? (
                <RiEyeCloseLine className="text-lg" />
              ) : (
                <RiEyeLine className="text-lg" />
              )}
            </button>
            {/* Akhir Tombol Show Confirm Password */}
          </div>
          {/* Akhir Input Confirm Password */}

          {/* Awal Pesan Error Matching Pass */}
          {errorMatchingPassword && (
            <div className="text-xs text-red-500 ">Password tidak cocok</div>
          )}
          {/* Akhir Pesan Error Matching Pass */}
        </div>
        {/* Akhir Confirm Password */}

        {/* Awal Terms & Conditions */}
        <div className="text-xl font-bold mt-2">
          Terms & Conditions <span className="text-red-500">*</span>
        </div>
        {/* Akhir Terms & Conditions */}

        {/* Awal Agree With T&C */}
        <div className="w-full h-fit flex justify-start items-center gap-2">
          {/* Awal Checkbox */}
          <input
            type="checkbox"
            name="checked"
            id="checked"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="cursor-pointer accent-blue-500 w-4 h-4"
          />
          {/* Akhir Checkbox */}
          {/* Awal I Agree */}
          <label>I agree with Terms & Conditions</label>
          {/* Akhir I Agree */}
        </div>
        {/* Akhir Agree With T&C */}

        {/* Awal Button Submit */}
        <button
          disabled={!checked || errorMatchingPassword}
          type="submit"
          className="mt-2 bg-green-900 hover:bg-green-950 p-2 w-full h-12 rounded-md transition-all duration-300  text-lg cursor-pointer disabled:bg-gray-800 disabled:cursor-not-allowed"
        >
          {loadingRegis ? (
            <AiOutlineLoading3Quarters className="m-auto text-2xl animate-spin" />
          ) : (
            "Create Your Account"
          )}
        </button>
        {/* Akhir Button Submit */}

        {/* Awal Sudah Punya Akun? */}
        <div className="mt-2">
          Sudah punya akun?{" "}
          <Link className="text-blue-700 hover:text-blue-900" href={"/login"}>
            Sign In
          </Link>
        </div>
        {/* Akhir Sudah Punya Akun? */}
      </form>
      {/* Akhir Form Register */}

      {/* Awal Footer */}
      <Footer />
      {/* Akhir Footer */}
    </div>
  );
}
