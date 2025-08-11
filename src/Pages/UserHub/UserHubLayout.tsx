import React, { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import UserHubNav from "./UserHubNav";
import Footer from "../../Components/Footer";

const UserHubLayout = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]); 

  return (
    <div className="min-h-screen flex flex-col">
      <UserHubNav />
      <main className="py-12 flex-1 bg-background px-4 md:px-16">
        <Outlet />
      </main>
      
      <Footer />
    </div>
  );
};

export default UserHubLayout;
