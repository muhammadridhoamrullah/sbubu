import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

export default function MainLayout({ children }) {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
