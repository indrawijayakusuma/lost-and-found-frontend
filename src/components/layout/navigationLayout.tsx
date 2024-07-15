import { Outlet } from "react-router-dom";
import { Navbar } from "../fragments/navbar";
import { Footer } from "../fragments/footer";

export const NavigationLayout = () => {
  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
};
