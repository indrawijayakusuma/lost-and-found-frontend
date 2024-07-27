import { Outlet, useNavigate } from "react-router-dom";
import { Navbar } from "../fragments/navbar";
import { Footer } from "../fragments/footer";
import { useAuth } from "@/hooks/useAuth";
import { useLogin } from "@/hooks/useLogin";

export const NavigationLayout = () => {
  const { logout, token } = useAuth();
  const user = useLogin();
  const navigate = useNavigate();

  const handlerLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar token={token} user={user} handlerLogout={handlerLogout} />
      <Outlet />
      <Footer />
    </div>
  );
};
