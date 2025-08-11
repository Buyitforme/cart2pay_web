// src/layouts/MainLayout.tsx
import React, { useEffect } from "react";
import Nav from "../Components/Nav";
import Footer from "../Components/Footer";
import { Outlet, useLocation } from "react-router-dom";

 
const MainLayout = () => {
    const { pathname } = useLocation();
 useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col w-full bg-white">
      <Nav />
      <main className="flex-grow">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
