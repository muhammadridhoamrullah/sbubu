import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/(Non-Auth)/Register";
import Profile from "./pages/(Auth)/Profile";
import NonAuthLayout from "./components/NonAuthLayout";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/(Non-Auth)/Login";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/login");
  }

  return null;
}

function preventAuthAccess() {
  if (localStorage.access_token) {
    return redirect("/app/profile");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <div>Ini Landing Page</div>,
  },
  {
    path: "/auth",
    loader: preventAuthAccess,
    element: <NonAuthLayout />,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
    ],
  },
  {
    path: "/app",
    loader: checkLogin,
    element: <AuthLayout />,
    children: [
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
]);

export default router;
