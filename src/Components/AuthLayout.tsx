import React from "react";
import { Link } from "react-router-dom";
import { AnimatedSection } from "../Pages/LandingPage/LandingPageMain";
import logo from "../Assets/svg_images/Logo2.svg";


interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AnimatedSection>
      <div
        className="relative min-h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('your-background-image-url')",
        }}
      >
        {/* Logo */}
        <div className="absolute top-4 left-6">
          <Link to="/" className="flex">
            <img src={logo} alt="logo" />
          </Link>
        </div>

        {/* Form card container */}
        <div className="flex justify-center pt-24 items-center h-full">
          <div className="w-full max-w-md space-y-8 bg-white/90 p-8 rounded-lg shadow-md my-auto backdrop-blur-sm">
            {children}
          </div>
        </div>
      </div>
    </AnimatedSection>
  );
};

export default AuthLayout;
