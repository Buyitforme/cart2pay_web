import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Inputfield";
import { Heading, Text } from "./Typography";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";

const Footer: React.FC = () => {
  
  const initialValues = {
    email: "",
  };

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
  });

  const handleSubmit = async (
    values: typeof initialValues,
    { resetForm }: any
  ) => {
    try {
      const response = await axios.post("https://formspree.io/f/mqadkkre", {
        email: values.email,
      });

      if (response.status === 200) {
        // setStatus("success");
toast.success("You're subscribed 🎉")
        resetForm();
      } else {
        toast.error("error!");
      }
    } catch (error) {
      toast.error("error!");
    }
  };
   const navLinkClass = ({ isActive }: { isActive: boolean }) => 
    `hover:text-[#8fac6a] transition-colors duration-200 ${
      isActive ? 'text-[#8fac6a] ' : ''
    }`;

  const textClass = (isActive: boolean) => 
    `text-white hover:text-[#8fac6a] ${isActive ? '!text-[#8fac6a]' : ''}`;
  return (
<footer className="w-full bg-accent pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 text-white">
  <div className="max-w-7xl mx-auto">
    {/* Main Content Grid */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
      {/* Left Section */}
      <div className="space-y-6">
        {/* Logo */}
        <div className="text-2xl sm:text-3xl font-bold flex">
          <Heading
            size="xl"
            weight="bold"
            color="default"
            className="cursor-pointer text-xl sm:text-2xl text-white"
          >
            Cart2
          </Heading>
          <Heading
            size="xl"
            weight="bold"
            color="primary"
            className="cursor-pointer text-xl sm:text-2xl text-[#8fac6a]"
          >
            PAY
          </Heading>
        </div>

        {/* Mission Statement */}
        <Text size="md" weight="medium" className="max-w-md text-gray-300 text-sm sm:text-base leading-relaxed">
          Our mission is to make global shopping as easy as shopping locally. We
          remove payment and delivery barriers so you can buy from your favorite
          stores anywhere in the world.
        </Text>

        {/* Footer Navigation */}
        <div className="pt-2">
            <div className="grid grid-cols-2 sm:flex sm:flex-wrap gap-3 sm:gap-4 lg:gap-6 text-sm">
      <NavLink to="/" className={navLinkClass} end>
        {({ isActive }) => (
          <Text
            size="md"
            weight="semibold"
            className={textClass(isActive)}
          >
            Home
          </Text>
        )}
      </NavLink>
      
      <NavLink to="/about" className={navLinkClass}>
        {({ isActive }) => (
          <Text
            size="md"
            weight="semibold"
            className={textClass(isActive)}
          >
            About
          </Text>
        )}
      </NavLink>
      
      <NavLink to="/how-it-works" className={navLinkClass}>
        {({ isActive }) => (
          <Text
            size="md"
            weight="semibold"
            className={textClass(isActive)}
          >
            How it works
          </Text>
        )}
      </NavLink>
      
      <NavLink to="/contact-us" className={navLinkClass}>
        {({ isActive }) => (
          <Text
            size="md"
            weight="semibold"
            className={textClass(isActive)}
          >
            Contact Us
          </Text>
        )}
      </NavLink>
      
      <NavLink to="/terms-and-conditions" className={({ isActive }) => 
        `col-span-2 sm:col-span-1 hover:text-[#8fac6a] transition-colors duration-200 ${
          isActive ? 'text-[#8fac6a] border-b-2 border-[#8fac6a] pb-1' : ''
        }`
      }>
        {({ isActive }) => (
          <Text
            size="md"
            weight="semibold"
            className={textClass(isActive)}
          >
            Terms & Conditions
          </Text>
        )}
      </NavLink>
    </div>
        </div>
      </div>

      {/* Right Section (Newsletter Card) */}
      <div className="w-full">
        <div className="rounded-xl p-4 sm:p-6 lg:p-8 bg-[#2f405a] shadow-xl">
          {/* Newsletter Header */}
          <div className="mb-6">
            <Text size="lg" weight="bold" className="mb-3 sm:mb-4 text-white text-lg sm:text-xl">
              Stay in Touch
            </Text>
            <Text size="sm" weight="medium" className="text-gray-300 text-sm sm:text-base leading-relaxed">
              Subscribe to get updates on the latest store integrations,
              discounts, and seamless global shopping tips — right to your inbox.
            </Text>
          </div>

          {/* Newsletter Form */}
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="space-y-4">
                <div className="flex flex-col sm:flex-row w-full gap-3 sm:gap-2">
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="footer-email"
                        type="email"
                        placeholder="Enter your email"
                        className="flex-1 text-black focus:ring-white h-10 text-sm sm:text-base"
                        error={touched.email && errors.email ? errors.email : ""}
                      />
                    )}
                  </Field>

                  <Button
                    type="submit"
                    variant="secondary"
                    className="h-10 px-4 sm:px-6 bg-[#8fac6a] text-white text-sm sm:text-base whitespace-nowrap hover:bg-[#7a9859] transition-colors duration-200"
                    loading={isSubmitting}
                  >
                    Get in Touch
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>

        {/* Social Icons */}
        <div className="mt-6 sm:mt-8 flex justify-center lg:justify-end space-x-4">
          <a 
            href="#facebook" 
            aria-label="Facebook" 
            className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
          >
            <Facebook size={20} className="text-white" />
          </a>
          <a 
            href="#twitter" 
            aria-label="Twitter" 
            className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
          >
            <Twitter size={20} className="text-white" />
          </a>
          <a
            href="https://www.instagram.com/shopviacal?igsh=MW1nNGdlcWE3Y2EzZQ%3D%3D&utm_source=qr"
            aria-label="Instagram"
            className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
          >
            <Instagram size={20} className="text-white" />
          </a>
        </div>
      </div>
    </div>

    {/* Copyright Section */}
    <div className="pt-8 sm:pt-12 mt-8 sm:mt-12 border-t border-gray-600">
      <div className="text-xs sm:text-sm text-gray-400 text-center">
        © 2025 Cart2Pay. All rights reserved.
      </div>
    </div>
  </div>
</footer>

  );
};

export default Footer;
