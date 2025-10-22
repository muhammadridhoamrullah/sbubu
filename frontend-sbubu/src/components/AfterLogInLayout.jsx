import { Outlet } from "react-router-dom";
import AfterLoginNavbar from "./AfterLoginNavbar";
import Footer from "./Footer";

export default function AfterLogInLayout({ children }) {
  return (
    <div className="bg-[#0F191E] w-full min-h-screen flex flex-col gap-5 justify-start items-center py-14">
      <AfterLoginNavbar />
      <Outlet />
      <Footer />
    </div>
  );
}
