import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Loading() {
  return (
    <div className="bg-black w-full min-h-screen flex flex-col gap-4 justify-center items-center">
      <AiOutlineLoading3Quarters className="text-white text-4xl animate-spin" />
      <div className="text-white text-xl font-semibold animate-pulse">
        Loadingnya Username ...
      </div>
    </div>
  );
}
