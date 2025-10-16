import React from "react";
import { Link } from "react-router-dom";
import logo from "../Assets/svg_images/logoWhite.svg";
import happyShopper from "../Assets/cart.png";
import { Text } from "./Typography";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-1 flex-col md:flex-row">
        {/* Left Section - Image, Logo, Overlay */}
        <div className="relative md:w-1/2 w-full h-[400px] sm:h-[500px] md:h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <img
            src={happyShopper}
            alt="Shopping"
            className="absolute inset-0 w-full h-full object-contain"
          />

          {/* Overlay Pattern */}
          <div className="absolute inset-0 bg-secondary_dark/85" />

          {/* Logo & Text Centered */}
          <div className="relative z-10 text-white text-center px-4 sm:px-6 md:px-10">
            <Link to="/" className="inline-block mb-3 sm:mb-4">
              <img 
                src={logo} 
                alt="App Logo" 
              />
            </Link>

            <Text 
              size={{ sm: "lg", md: "xl" }}
              weight="light" 
              className="text-white"
            >
              Simplifying your buying experience
            </Text>
          </div>
        </div>

        {/* Right Section - Form */}
        <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10">
          <div className="w-full max-w-sm">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
