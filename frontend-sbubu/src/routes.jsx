import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/(Non-Auth)/Register";
import MainLayout from "./components/MainLayout";
import Profile from "./pages/(Auth)/Profile";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }

  return null;
}

const router = createBrowserRouter([
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    loader: checkLogin,
    element: <MainLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
