import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/login";
import AuthContextProvider from "./context/authContext";
import { Register } from "./pages/register";
import { Otp } from "./pages/otp";
import { FoundItem } from "./pages/foundItem";
import { DetailItem } from "./pages/detailItem";
import { Dashboard } from "./pages/dashboard";
import { ClaimForm } from "./pages/claimForm";
import { Home } from "./pages/home";
import { FormPost } from "./pages/formPost";
import { ProtectedRoutes } from "./routes/ProtectedRoutes";
import { UnauthRoutes } from "./routes/UnauthRoutes";
import { Setting } from "./pages/setting";
import { ForgotPassword } from "./pages/forgotPassword";
import { NewPasswordForm } from "./pages/newPasswordForm";

const routesForPublic = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/daftar-barang-ditemukan",
    element: <FoundItem />,
  },
];

const routesForUnauth = [
  {
    element: <UnauthRoutes />,
    children: [
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/otp",
        element: <Otp />,
      },
      {
        path: "/lupa-password",
        element: <ForgotPassword />,
      },
      {
        path: "/lupa-password/form/:token",
        element: <NewPasswordForm />,
      },
    ],
  },
];

const routesForPrivate = [
  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/daftar-barang-ditemukan/:id",
        element: <DetailItem />,
      },
      {
        path: "/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/claim-form/:postId",
        element: <ClaimForm />,
      },
      {
        path: "/buat-postingan",
        element: <FormPost />,
      },
      {
        path: "/setting/:setting",
        element: <Setting />,
      },
    ],
  },
];

const router = createBrowserRouter([
  ...routesForPublic,
  ...routesForUnauth,
  ...routesForPrivate,
  {
    path: "*",
    element: <div>404</div>,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  </React.StrictMode>
);
