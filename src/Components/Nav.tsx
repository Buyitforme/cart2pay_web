import React, { useState } from "react";
import { Heading, Text } from "./Typography";
import { Link } from "react-router-dom";
import { Button } from "./Button";


const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full ">
      <div className="max-w-7xl mx-auto flex items-center justify-between  py-3">
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
            {/* <ImageRenderer src={logo} alt='logo'/> */}
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
          <Link to="/about">
            <Text
              size="lg"
              weight="semibold"
              color="default"
              className="cursor-pointer hover:text-primary duration-300 ease-in-out"
            >
              About
            </Text>
          </Link>
          <Link to="/how-it-works">
            <Text
              size="lg"
              weight="medium"
              color="default"
              className="cursor-pointer hover:text-primary duration-300 ease-in-out"
            >
              How It Works
            </Text>
          </Link>
          <Link to="/contact-us">
            <Text
              size="lg"
              weight="medium"
              color="default"
              className="cursor-pointer hover:text-primary duration-300 ease-in-out"
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
              className="cursor-pointer hover:text-primary duration-300 ease-in-out"
            >
              Login
            </Text>
          </Link>

          <Button variant="primary">Signup</Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden fixed inset-0 bg-white z-50 px-6 py-4 flex flex-col">
            {/* Top row: Logo on the left, Close button on the right */}
            <div className="flex justify-between items-center mb-6">
              {/* Logo */}
              <Link to="/" className="flex items-center">
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

              {/* Close button */}
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

            {/* Navigation Links (aligned to left) */}
            <div className="flex flex-col items-start space-y-4 mb-6">
              <Link to="/about">
                <Text className="text-lg font-medium hover:text-primary duration-300">
                  About
                </Text>
              </Link>
              <Link to="/how-it-works">
                <Text className="text-lg font-medium hover:text-primary duration-300">
                  How It Works
                </Text>
              </Link>
              <Link to="/contact-us">
                <Text className="text-lg font-medium hover:text-primary duration-300">
                  Contact Us
                </Text>
              </Link>
              <Link to="/signin">
                <Text className="text-lg font-medium hover:text-primary duration-300">
                  Login
                </Text>
              </Link>
            </div>

            {/* Signup button full width */}
            <Button variant="primary" className="w-full">
              Signup
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
