import { createBrowserRouter, redirect } from "react-router-dom";
import Register from "./pages/(Non-Auth)/Register";
import NonAuthLayout from "./components/NonAuthLayout";
import AuthLayout from "./components/AuthLayout";
import Login from "./pages/(Non-Auth)/Login";
import AfterLogInLayout from "./components/AfterLogInLayout";
import Creator from "./pages/(Auth)/(C)/Creator";
import Personal from "./pages/(Auth)/(me)/Personal";
import DonationPage from "./pages/(Non-Auth)/DonationPage";
import SuccessPayment from "./pages/(Non-Auth)/Transaction";
import Transaction from "./pages/(Non-Auth)/Transaction";

function checkLogin() {
  if (!localStorage.access_token) {
    return redirect("/auth/login");
  }

  return null;
}

function preventAuthAccess() {
  if (localStorage.access_token) {
    return redirect("/c/me");
  }
  return null;
}

const router = createBrowserRouter([
  {
    path: "/transaction/:orderId",
    element: <Transaction />,
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
    path: "/:username",
    element: <DonationPage />,
  },
  {
    path: "/c",
    loader: checkLogin,
    element: <AfterLogInLayout />,
    children: [
      {
        path: ":username",
        element: <Creator />,
      },
    ],
  },
  {
    path: "/me",
    loader: checkLogin,
    element: <AfterLogInLayout />,
    children: [
      {
        path: "",
        element: <Personal />,
      },
    ],
  },
]);

export default router;
