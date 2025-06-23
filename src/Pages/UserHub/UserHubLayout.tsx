import React from "react";
import { Outlet } from "react-router-dom";
import UserHubNav from "./UserHubNav";
import Footer from "../../Components/Footer";

const UserHubLayout = () => {
  return (
    <div className="min-h-screen flex flex-col  ">
      <UserHubNav />
      <main className="flex-1 bg-background  px-4  md:px-16">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default UserHubLayout;
