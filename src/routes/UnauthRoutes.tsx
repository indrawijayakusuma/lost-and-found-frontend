import { useAuth } from "@/hooks/useAuth";
import { Navigate, Outlet } from "react-router-dom";

export const UnauthRoutes = () => {
  const { token } = useAuth();
  return token ? <Navigate to="/" /> : <Outlet />;
};
