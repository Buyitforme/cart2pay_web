// src/layouts/MainLayout.tsx
import { useEffect } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Outlet, useLocation } from "react-router-dom";
import CookieConsent from "../services/CookiesConscent";

const MainLayout = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div className="min-h-screen flex flex-col w-full ">
      <Nav />
      <main className="flex-grow">
        <Outlet />
        <CookieConsent />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
