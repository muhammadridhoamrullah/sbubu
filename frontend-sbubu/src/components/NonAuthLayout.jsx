import { Outlet } from "react-router-dom";
import NonAuthNavbar from "./NonAuthNavbar";

export default function NonAuthLayout({ children }) {
  return (
    <div className="bg-[#0F191E] w-full flex flex-col min-h-screen justify-start items-center gap-5 py-10">
      <NonAuthNavbar />
      <Outlet />
    </div>
  );
}
