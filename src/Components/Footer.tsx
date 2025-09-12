import React from "react";
import { Link, NavLink } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Inputfield";
import { Text } from "./Typography";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../Assets/svg_images/logoWhite.svg";

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
        toast.success("You're subscribed 🎉");
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
      isActive ? "text-[#8fac6a] " : ""
    }`;

  const textClass = (isActive: boolean) =>
    `text-white hover:text-[#8fac6a] ${isActive ? "!text-[#8fac6a]" : ""}`;
 return (
  <footer className="w-full bg-secondary_dark pt-12 sm:pt-16 pb-8 sm:pb-12 px-4 sm:px-6 lg:px-8 text-white">
    <div className="max-w-[95%] mx-auto">
      {/* Top Section */}
       <Link to="/" className="flex mb-12">
            <img src={logo} alt="logo" className="h-10 w-auto" />
          </Link>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 border-b border-white pb-32">
        {/* Left: Logo + Links */}
        <div className="lg:col-span-2">
          {/* Logo */}
         

          {/* Links */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-12 text-sm">
            {/* PLATFORM */}
            <div>
              <Text size="md" weight="semibold" className="text-[#C4FAD3]">
                PLATFORM
              </Text>
              <div className="flex flex-col gap-4 pt-5">
                <NavLink to="/" className={navLinkClass} end>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      Home
                    </Text>
                  )}
                </NavLink>
                <NavLink to="/about" className={navLinkClass}>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      About Us
                    </Text>
                  )}
                </NavLink>
                <NavLink to="/contact-us" className={navLinkClass}>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      Contact Us
                    </Text>
                  )}
                </NavLink>
              </div>
            </div>

            {/* PRODUCT */}
            <div>
              <Text size="md" weight="semibold" className="text-[#C4FAD3]">
                PRODUCT
              </Text>
              <div className="flex flex-col gap-4 pt-5">
                <NavLink to="/how-it-works" className={navLinkClass} end>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      How it works
                    </Text>
                  )}
                </NavLink>
                <NavLink to="/share-request" className={navLinkClass}>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      Share a request
                    </Text>
                  )}
                </NavLink>
                <NavLink to="/stores" className={navLinkClass}>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      Stores we support
                    </Text>
                  )}
                </NavLink>
              </div>
            </div>

            {/* LEGAL */}
            <div>
              <Text size="md" weight="semibold" className="text-[#C4FAD3]">
                LEGAL
              </Text>
              <div className="flex flex-col gap-4 pt-5">
                <NavLink to="/terms-and-conditions" className={navLinkClass}>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      Terms & Conditions
                    </Text>
                  )}
                </NavLink>
                <NavLink to="/privacy-policy" className={navLinkClass}>
                  {({ isActive }) => (
                    <Text size="sm" weight="light" className={textClass(isActive)}>
                      Privacy Policy
                    </Text>
                  )}
                </NavLink>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Newsletter */}
        <div>
          <Text
            size="sm"
            weight="light"
            className="text-gray-300 text-sm sm:text-base leading-relaxed"
          >
            Stay up to date with us
          </Text>

          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, errors, touched }) => (
              <Form className="mt-4 space-y-4">
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-2 ">
                  <Field name="email">
                    {({ field }: any) => (
                      <Input
                        {...field}
                        id="footer-email"
                        type="email"
                        placeholder="Enter your email"
                        className="w-full md:w-[300px] text-black focus:ring-white h-10 text-sm sm:text-base flex-1"
                        error={
                          touched.email && errors.email ? errors.email : ""
                        }
                      />
                    )}
                  </Field>

                  <Button
                    type="submit"
                    variant="primary"
                    loading={isSubmitting}
                    className="whitespace-nowrap"
                  >
                    Get in Touch
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="mt-6 sm:mt-8 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="text-xs sm:text-sm text-white">
          © 2023 SHOPVIACAL. All rights reserved.
        </div>

        <div className="flex space-x-4">
          <a
            href="#facebook"
            aria-label="Facebook"
            className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
          >
            <Facebook size={20} />
          </a>
          <a
            href="#twitter"
            aria-label="Twitter"
            className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
          >
            <Twitter size={20} />
          </a>
          <a
            href="https://www.instagram.com/shopviacal"
            aria-label="Instagram"
            className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
          >
            <Instagram size={20} />
          </a>
        </div>
      </div>
    </div>
  </footer>
);

};

export default Footer;
