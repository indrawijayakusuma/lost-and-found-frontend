import { ReactNode } from "react";
import { Navbar } from "../fragments/navbar";
import { Footer } from "../fragments/footer";

export const NavigationLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
};
