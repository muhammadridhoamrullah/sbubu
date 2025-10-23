export default function LoadingSkeleton() {
  return (
    <div className="bg-[#111D22] w-full min-h-screen py-14 text-white flex flex-col gap-4 justify-start items-center">
      <div className="w-3/4 h-24 bg-[#1A2B32] rounded-md animate-pulse"></div>
      <div className="w-3/4 h-52 bg-[#1A2B32] rounded-md animate-pulse"></div>
      <div className="w-3/4 h-40 bg-[#1A2B32] rounded-md animate-pulse"></div>
    </div>
  );
}
