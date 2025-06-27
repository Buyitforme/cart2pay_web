import React from "react";
import { Link } from "react-router-dom";
import { Heading } from "./Typography";
import { AnimatedSection } from "../Pages/LandingPage/LandingPageMain";

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <AnimatedSection>
      <div className="relative min-h-screen bg-gray-50 px-4 py-8">
        {/* Logo */}
        <div className="absolute top-4 left-6">
          <Link to="/" className="flex items-center">
            <Heading
              size="xl"
              weight="bold"
              color="default"
              className="cursor-pointer text-2xl"
            >
              Cart2
            </Heading>
            <Heading
              size="xl"
              weight="bold"
              color="primary"
              className="cursor-pointer text-2xl"
            >
              PAY
            </Heading>
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
