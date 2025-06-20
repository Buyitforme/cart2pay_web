import React from "react";
import { Link } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Inputfield";
import { Heading, Text } from "./Typography";
import { Facebook, Twitter, Instagram } from "lucide-react";


const Footer: React.FC = () => {
  return (
    <footer className="w-full bg-[#F9FAFB] pt-16 pb-32 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Section */}
        <div className="space-y-6">
          <div className="text-3xl font-bold text-[#1E2A47] flex">
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
          </div>

          <Text size="md" weight="medium" color="default" className="max-w-md">
            Our mission is to make global shopping as easy as shopping locally.
            We remove payment and delivery barriers so you can buy from your
            favorite stores anywhere in the world.
          </Text>

          <div className="flex space-x-4 text-sm text-gray-600">
            <Link to="/about">
              <Text
                size="md"
                weight="semibold"
                className="hover:text-[#8fac6a]"
              >
                About
              </Text>
            </Link>
            <Link to="/how-it-works">
              <Text
                size="md"
                weight="semibold"
                className="hover:text-[#8fac6a]"
              >
                How it works
              </Text>
            </Link>
            <Link to="/contact-us">
              <Text
                size="md"
                weight="semibold"
                className="hover:text-[#8fac6a]"
              >
                Contact Us
              </Text>
            </Link>
          </div>

          <div className="pt-8 text-xs text-gray-400">
            © 2025 Cart2Pay. Built for your payment ease.
          </div>
        </div>

        {/* Right Section (Newsletter Card) */}
        <div>
          {" "}
          <div className="rounded-xl p-6 md:p-8 bg-gradient-to-br from-[#1E2A47] to-[#8fac6a] text-white shadow-xl flex flex-col justify-between h-full">
            <div>
              <Text
                size="xl"
                weight="medium"
                className="mb-6 text-white font-bold"
              >
                Stay in Touch
              </Text>
              <Text size="md" weight="medium" className="mb-6 text-white/80">
                Subscribe to get updates on the latest store integrations,
                discounts, and seamless global shopping tips — right to your
                inbox.
              </Text>
            </div>

            {/* Input with embedded button */}
            <form className="space-y-6">
              <div className="relative w-full">
                <Input
                  placeholder="Enter your email"
                  className="pr-32 bg-white text-black focus:ring-white"
                  type="email"
                />
                <Button
                  variant="secondary"
                  className="absolute top-1 right-1 h-8 px-4  "
                >
                  Get in Touch
                </Button>
              </div>
            </form>
          </div>
          {/* Social Icons */}
          <div className="mt-8 flex justify-end space-x-4">
            <a href="#facebook" aria-label="Facebook" className="hover:text-gray-300">
              <Facebook size={20} />
            </a>
            <a href="#twitter" aria-label="Twitter" className="hover:text-gray-300">
              <Twitter size={20} />
            </a>
            <a href="#instagram" aria-label="Instagram" className="hover:text-gray-300">
              <Instagram size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};



export default Footer;
