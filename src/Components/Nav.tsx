import React, { useState } from "react";
import { Heading, Text } from "./Typography";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./Button";
import logo from "../Assets/svg_images/Logo2.svg";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="w-full">
      <div className="px-3 sm:px-4 lg:px-6 max-w-[95%] mx-auto flex items-center justify-between py-3">
        {/* Logo */}
        <Link to="/" className="flex">
          <img src={logo} alt="logo" />
        </Link>

        {/* Hamburger Menu - Hidden on large screens */}
        <button
          className="lg:hidden flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-gray-100 rounded-full transition-colors hover:bg-gray-200"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <svg
            className="w-5 h-5 sm:w-6 sm:h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop/Tablet Links - Hidden on mobile, shown on large screens */}
        <div className="hidden lg:flex items-center space-x-8 xl:space-x-10">
          {/* <Link to="/">
          <Text
            size="lg"
            weight="semibold"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out transition-colors ${
              isActive("/") ? "text-primary font-bold" : "hover:text-primary"
            }`}
          >
            Home
          </Text>
        </Link> */}
          <Link to="/how-it-works">
            <Text
              size="md"
              weight="normal"
              color="default"
              className={`cursor-pointer duration-300 ease-in-out text-secondary  ${
                isActive("/how-it-works")
                  ? "text-secondary_light font-[500]"
                  : "hover:text-secondary_light"
              }`}
            >
              How It Works
            </Text>
          </Link>

          <Link to="/about">
            <Text
              size="md"
              weight="normal"
              color="default"
              className={`cursor-pointer duration-300 ease-in-out text-secondary ${
                isActive("/about")
                  ? "text-secondary_light font-[500]"
                  : "hover:text-secondary_light"
              }`}
            >
              About Us
            </Text>
          </Link>

          {/* <Link to="/stories">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out transition-colors ${
              isActive("/stories") || isActive("/share-your-story")
                ? "text-primary font-bold"
                : "hover:text-primary"
            }`}
          >
            Stories
          </Text>
        </Link> */}

          <Link to="/contact-us">
            <Text
              size="md"
              weight="normal"
              color="default"
              className={`cursor-pointer duration-300 ease-in-out text-secondary ${
                isActive("/contact-us")
                  ? "text-secondary_light font-[500]"
                  : "hover:text-secondary_light"
              }`}
            >
              Contact Us
            </Text>
          </Link>
          <div className="hidden lg:flex items-center space-x-4 xl:space-x-6">
            <Link to="/signin">
              <Text
                size="md"
                weight="normal"
                color="default"
                className={`cursor-pointer duration-300 ease-in-out text-secondary ${
                  isActive("/signin")
                    ? "text-secondary_light font-[500]"
                    : "hover:text-secondary_light"
                }`}
              >
                Login
              </Text>
            </Link>
            <Link to="/signup">
              <Button variant="primary" className="whitespace-nowrap">
                Create account
              </Button>
            </Link>
          </div>
        </div>

        {/* Desktop Right Side: Login / Signup - Hidden on mobile and tablet */}

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
        )}

        {/* Mobile/Tablet Side Drawer */}
        <div
          className={`lg:hidden fixed top-0 left-0 h-full w-72 sm:w-80 bg-white z-50 shadow-xl transform transition-transform duration-300 ease-in-out ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          <div className="px-4 sm:px-6 py-4 sm:py-6 flex flex-col h-full">
            {/* Top Row */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <Link to="/" className="flex">
                <img src={logo} alt="logo" />
              </Link>

              {/* Close Button */}
              <button
                className="w-8 h-8 sm:w-10 sm:h-10 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300 transition-colors"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <svg
                  className="w-5 h-5 sm:w-6 sm:h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Links */}
            <div className="flex flex-col items-start space-y-4 sm:space-y-6 mb-6 sm:mb-8 flex-1">
              {/* <Link to="/" onClick={() => setIsOpen(false)} className="w-full">
              <Text
                className={`text-base sm:text-lg font-medium duration-300 transition-colors py-2 block ${
                  isActive("/")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                Home
              </Text>
            </Link> */}
              <Link
                to="/about"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Text
                  size="md"
                  weight="normal"
                  className={`text-base sm:text-lg font-medium duration-300 text-secondary py-2 block ${
                    isActive("/about")
                      ? "text-secondary_light font-[500]"
                      : "hover:text-secondary_light"
                  }`}
                >
                  About Us
                </Text>
              </Link>
              <Link
                to="/how-it-works"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Text
                  size="md"
                  weight="normal"
                  className={`text-base sm:text-lg font-medium duration-300 text-secondary py-2 block ${
                    isActive("/how-it-works")
                      ? "text-secondary_light font-[500]"
                      : "hover:text-secondary_light"
                  }`}
                >
                  How It Works
                </Text>
              </Link>
              {/* <Link to="/stories" onClick={() => setIsOpen(false)} className="w-full">
              <Text
                className={`text-base sm:text-lg font-medium duration-300 transition-colors py-2 block ${
                  isActive("/stories") || isActive("/share-your-story")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                Stories
              </Text>
            </Link> */}
              <Link
                to="/contact-us"
                onClick={() => setIsOpen(false)}
                className="w-full"
              >
                <Text
                  size="md"
                  weight="normal"
                  className={`text-base sm:text-lg font-medium duration-300 text-secondary py-2 block ${
                    isActive("/contact-us")
                      ? "text-secondary_light font-[500]"
                      : "hover:text-secondary_light"
                  }`}
                >
                  Contact Us
                </Text>
              </Link>

              {/* Divider */}
              <div className="w-full border-t border-gray-200 pt-4 sm:pt-6">
                <Link
                  to="/signin"
                  onClick={() => setIsOpen(false)}
                  className="w-full"
                >
                  <Text
                    size="md"
                    weight="normal"
                    className={`text-base sm:text-lg font-medium duration-300 text-secondary py-2 block ${
                      isActive("/signin")
                        ? "text-secondary_light font-[500]"
                        : "hover:text-secondary_light"
                    }`}
                  >
                    Login
                  </Text>
                </Link>
              </div>
            </div>

            {/* Create Account Button - Sticky at bottom */}
            <div className="mt-auto">
              <Link to="/signup" onClick={() => setIsOpen(false)}>
                <Button
                  variant="primary"
                  className="w-full text-sm sm:text-base py-2 sm:py-3"
                >
                  Create account
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
