import React, { useState } from "react";
import { Heading, Text } from "./Typography";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./Button";

const Nav = () => {
const [isOpen, setIsOpen] = useState(false);
const location = useLocation();

const isActive = (path: string) => location.pathname === path;

return (
  <nav className="w-full">
    <div className="px-6 md:px-0 max-w-7xl mx-auto flex items-center justify-between py-3">
      {/* Logo */}
      <div className="flex-shrink-0 h-auto">
        <Link to="/" className="flex">
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

      {/* Hamburger Menu */}
      <button
        className="md:hidden flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full"
        onClick={() => setIsOpen(!isOpen)}
      >
        <svg
          className="w-5 h-5"
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

      {/* Desktop Links */}
      <div className="hidden md:flex items-center space-x-10">
        <Link to="/">
          <Text
            size="lg"
            weight="semibold"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out ${
              isActive("/") ? "text-primary font-bold" : "hover:text-primary"
            }`}
          >
            Home
          </Text>
        </Link>
        <Link to="/about">
          <Text
            size="lg"
            weight="semibold"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out ${
              isActive("/about")
                ? "text-primary font-bold"
                : "hover:text-primary"
            }`}
          >
            About
          </Text>
        </Link>

        <Link to="/how-it-works">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out ${
              isActive("/how-it-works")
                ? "text-primary font-bold"
                : "hover:text-primary"
            }`}
          >
            How It Works
          </Text>
        </Link>

        <Link to="/stories">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out ${
              isActive("/stories")
                ? "text-primary font-bold"
                : "hover:text-primary"
            }`}
          >
            Stories
          </Text>
        </Link>

        <Link to="/contact-us">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out ${
              isActive("/contact-us")
                ? "text-primary font-bold"
                : "hover:text-primary"
            }`}
          >
            Contact Us
          </Text>
        </Link>
      </div>

      {/* Desktop Right Side: Login / Signup */}
      <div className="hidden md:flex items-center space-x-6">
        <Link to="/signin">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className={`cursor-pointer duration-300 ease-in-out ${
              isActive("/signin")
                ? "text-primary font-bold"
                : "hover:text-primary"
            }`}
          >
            Login
          </Text>
        </Link>
        <Link to="/signup">
          <Button variant="primary">Create account</Button>
        </Link>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Mobile Side Drawer */}
      <div
        className={`md:hidden fixed top-0 left-0 h-full w-80 bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="px-6 py-4 flex flex-col h-full">
          {/* Top Row */}
          <div className="flex justify-between items-center mb-8">
            <Link
              to="/"
              className="flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <Heading
                size="xl"
                weight="bold"
                color="default"
                className="text-2xl"
              >
                Cart2
              </Heading>
              <Heading
                size="xl"
                weight="bold"
                color="primary"
                className="text-2xl"
              >
                PAY
              </Heading>
            </Link>

            {/* Close Button */}
            <button
              className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center"
              onClick={() => setIsOpen(false)}
            >
              <svg
                className="w-5 h-5"
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
          <div className="flex flex-col items-start space-y-6 mb-8">
            <Link to="/" onClick={() => setIsOpen(false)}>
              <Text
                className={`text-lg font-medium duration-300 ${
                  isActive("/")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                Home
              </Text>
            </Link>
            <Link to="/about" onClick={() => setIsOpen(false)}>
              <Text
                className={`text-lg font-medium duration-300 ${
                  isActive("/about")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                About
              </Text>
            </Link>
            <Link to="/how-it-works" onClick={() => setIsOpen(false)}>
              <Text
                className={`text-lg font-medium duration-300 ${
                  isActive("/how-it-works")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                How It Works
              </Text>
            </Link>
            <Link to="/stories" onClick={() => setIsOpen(false)}>
              <Text
                size="lg"
                weight="medium"
                color="default"
                className={`cursor-pointer duration-300 ease-in-out ${
                  isActive("/stories")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                Stories
              </Text>
            </Link>
            <Link to="/contact-us" onClick={() => setIsOpen(false)}>
              <Text
                className={`text-lg font-medium duration-300 ${
                  isActive("/contact-us")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                Contact Us
              </Text>
            </Link>
            <Link to="/signin" onClick={() => setIsOpen(false)}>
              <Text
                className={`text-lg font-medium duration-300 ${
                  isActive("/signin")
                    ? "text-primary font-bold"
                    : "hover:text-primary"
                }`}
              >
                Login
              </Text>
            </Link>
          </div>

          {/* Create Account Button */}
          <div className="">
            <Link to="/signup" onClick={() => setIsOpen(false)}>
              <Button variant="primary" className="w-full">
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
