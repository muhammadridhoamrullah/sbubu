"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="text-white bg-black w-full min-h-screen flex flex-col gap-2 justify-center items-center">
      <div className="font-bold text-2xl">Something went wrong!</div>
      <div>{error.message}</div>

      <button
        onClick={() => reset()}
        className="px-4 py-2 bg-blue-700 hover:bg-blue-900 rounded-lg"
      >
        Try Again
      </button>
    </div>
  );
}
