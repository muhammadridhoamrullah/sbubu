"use client";

import { useState } from "react";
import Loading from "./loading";

export default function Register() {
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
      <div>Form Register</div>
      {/* Akhir Form Register */}
    </div>
  );
}
