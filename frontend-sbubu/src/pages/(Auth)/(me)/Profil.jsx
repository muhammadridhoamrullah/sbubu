import { useState } from "react";

export default function Profil() {
  const [formUser, setFormUser] = useState({
    name: "Muhammad Ridho Amrullah",
    username: "ridhoamrullah",
    email: "ridhoamrullah99@gmail.com",
    avatarUrl:
      "https://www.billboard.com/wp-content/uploads/2023/07/Olivia-Rodrigo-cr-Larissa-Hofmann-press-04-2023-billboard-1548.jpg?w=942&h=628&crop=1",
  });
  return (
    <div className=" w-full h-full flex flex-col gap-2 justify-start items-start">
      {/* Awal Buat Akun Kreatormu */}
      <div className="bg-[#86172c] w-full h-52 rounded-xl flex justify-start items-center overflow-hidden hover:bg-[#a0203a] transition-all duration-300">
        <div className="w-1/3 h-full relative">
          <img
            src={"/icon-1.png"}
            alt="icon"
            className="absolute w-full h-full object-contain top-5 right-2"
          />
        </div>
        <div className=" w-2/3 h-full py-5 flex flex-col gap-2 justify-start items-start pr-5">
          <div className="font-bold text-2xl">Kembangkan Akun Kreatormu!</div>
          <div>
            Yuk bergabung dengan kami dan mulai mendapatkan cuan dari hobimu!
            Kamu bisa membuat maksimal 3 akun kreator.
          </div>
          <div className="flex flex-col gap-1 justify-start items-start">
            <div>Username kamu:</div>
            <div className="bg-black/70 p-2 rounded-md">ridhoamrullah</div>
          </div>
        </div>
      </div>
      {/* Akhir Buat Akun Kreatormu */}

      {/* Awal Profil */}
      <div className=" w-full h-fit rounded-xl flex flex-col justify-start items-start border border-gray-800 gap-2 overflow-hidden">
        {/* Awal Profil */}
        <div className="bg-[#1A2B32] w-full py-1 px-4 text-xl">Profil</div>
        {/* Akhir Profil */}

        {/* Awal Data Diri */}
        <div className="w-full pt-1 pb-2 px-4 flex flex-col gap-2 justify-start items-start ">
          {/* Awal Foto Profil */}
          <div className=" w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Foto Profil</label>
            <div className=" w-full h-36 flex justify-start items-start gap-4">
              <div className=" w-1/3 h-full relative">
                <img
                  src={formUser.avatarUrl}
                  alt="Foto Profil"
                  className="absolute w-full h-full object-cover rounded-md"
                />
              </div>
              <input
                type="text"
                name="avatarUrl"
                id="avatarUrl"
                value={formUser.avatarUrl}
                className="w-2/3 h-fit p-2 rounded-md outline-none bg-[#1A2B32] "
              />
            </div>
          </div>
          {/* Akhir Foto Profil */}
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Nama</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formUser.name}
              className="w-full h-fit p-2 rounded-md outline-none bg-[#1A2B32] "
            />
          </div>
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Username</label>
            <input
              type="text"
              name="username"
              id="username"
              value={formUser.username}
              disabled
              className="w-full h-fit p-2 rounded-md outline-none bg-[#1A2B32] opacity-50 cursor-not-allowed "
            />
            <p className="text-xs text-gray-500 italic">
              *Tidak dapat mengganti username
            </p>
          </div>
          <div className="w-full h-fit flex flex-col gap-1 justify-start items-start">
            <label>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              value={formUser.email}
              disabled
              className="w-full h-fit p-2 rounded-md outline-none bg-[#1A2B32] opacity-50 cursor-not-allowed"
            />
            <p className="text-xs text-gray-500 italic">
              *Untuk mengganti email, silahkan hubungi customer service kami.
            </p>
          </div>
        </div>
        {/* Akhir Data Diri */}
      </div>
      {/* Akhir Profil */}
    </div>
  );
}
// name,username,email,password,role,avatarUrl,overlayKey
