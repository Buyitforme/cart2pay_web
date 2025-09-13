import React from "react";
import { Link } from "react-router-dom";
import { Heading } from "./Typography";
import { AnimatedSection } from "../Pages/LandingPage/LandingPageMain";
import logo from "../Assets/svg_images/Logo2.svg";


interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AnimatedSection>
      <div className="relative min-h-screen bg-gray-50 px-4 py-8">
        {/* Logo */}
        <div className="absolute top-4 left-6">
          <Link to="/" className="flex">
          <img src={logo} alt="logo" />
        </Link>
        </div>

        {/* Form card container */}
        <div className="flex justify-center pt-24 items-center h-full">
          <div className="w-full max-w-md space-y-8 bg-white p-8 rounded-lg shadow-md my-auto">
            {children}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuthLayout;
