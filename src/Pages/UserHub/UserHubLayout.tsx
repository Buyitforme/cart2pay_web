import React from "react";
import { Outlet } from "react-router-dom";
import UserHubNav from "./UserHubNav";
import Footer from "../../Components/Footer";
import { AnimatedSection } from "../LandingPage/LandingPageMain";

const UserHubLayout = () => {
  return (
        <AnimatedSection>

    <div className="min-h-screen flex flex-col  ">
      <UserHubNav />
      <main className="py-12 flex-1 bg-background  px-4  md:px-16">
        <Outlet />
      </main>
      <Footer />
    </div>
    </AnimatedSection>
  );
};

export default UserHubLayout;
