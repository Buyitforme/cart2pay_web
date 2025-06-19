import React, { useState } from "react";
import { Heading, Text } from "./Typography";
import { Link } from "react-router-dom";
import { Button } from "./Button";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="w-full ">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link to="/">
            <Heading
              size="xl"
              weight="bold"
              color="primary"
              className="cursor-pointer"
            >
              Cart2PAY
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
          <Link to="/about" className="hover:underline">
            <Text
              size="md"
              weight="medium"
              color="default"
              className="cursor-pointer"
            >
              About
            </Text>
          </Link>
          <Link to="/how-it-works" className="hover:underline">
            <Text
              size="md"
              weight="medium"
              color="default"
              className="cursor-pointer"
            >
              How It Works
            </Text>
          </Link>
          <Link to="/contact-us" className="hover:underline">
            <Text
              size="md"
              weight="medium"
              color="default"
              className="cursor-pointer"
            >
              Contact Us
            </Text>
          </Link>
        </div>

        {/* Desktop Right Side: Login / Signup */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/signin" className="hover:underline">
            <Text
              size="md"
              weight="medium"
              color="default"
              className="cursor-pointer"
            >
              Login
            </Text>
          </Link>
          <Button variant="primary">Signup</Button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden flex flex-col space-y-4 mt-4">
            <Link to="/about" className="hover:underline">
              <Text
                size="md"
                weight="medium"
                color="default"
                className="cursor-pointer"
              >
                About
              </Text>
            </Link>
            <Link to="/how-it-works" className="hover:underline">
              <Text
                size="md"
                weight="medium"
                color="default"
                className="cursor-pointer"
              >
                How It Works
              </Text>
            </Link>
            <Link to="/contact-us" className="hover:underline">
              <Text
                size="md"
                weight="medium"
                color="default"
                className="cursor-pointer"
              >
                Contact Us
              </Text>
            </Link>
          
            <Link to="/signin" className="hover:underline">
              <Text
                size="md"
                weight="medium"
                color="default"
                className="cursor-pointer"
              >
                Login
              </Text>
            </Link>
            
            <Button variant="primary">Signup</Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Nav;
