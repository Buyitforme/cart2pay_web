import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "./Button";
import { Input } from "./Inputfield";
import { Text } from "./Typography";
import { Facebook, Twitter, Instagram } from "lucide-react";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import axios from "axios";
import logo from "../Assets/svg_images/logoWhite.svg";
import routeNames from "../Navigation/RouteNames";
interface FooterProps {
  onExploreClick?: () => void;
}
const Footer: React.FC = ({ onExploreClick }: FooterProps) => {
  const navigate = useNavigate();

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

  return (
    <>
      <section className="bg-gradient-to-br from-emerald-50 via-blue-50 to-blue-100 py-16">
        {" "}
        <div className="max-w-[85%] mx-auto text-center space-y-6">
          <Text
            size={{ base: "md", md: "lg", lg: "2xl" }}
            weight={{ base: "semibold", md: "bold" }}
          >
            Shop easier. Shop smarter. Shop your way.
          </Text>

          <Text
            size={{ sm: "sm", md: "lg" }}
            weight={{ sm: "normal", md: "semibold" }}
            className="text-[#6B7280] group-hover:text-white transition duration-300"
          >
            Share your first product link and we’ll handle the rest simple,
            safe, and fast.
          </Text>
          <div>
            <Button
              variant="primary"
              className="w-auto px-6"
              onClick={() => navigate("/dashboard/new-order")}
            >
              Get Started
            </Button>
          </div>
        </div>
      </section>
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
                  <div className="flex flex-col justify-start items-start gap-4 pt-5">
                    <button
                      className="hover:text-secondary_light"
                      onClick={() => navigate("/")}
                    >
                      <Text size="sm" weight="normal">
                        Home
                      </Text>
                    </button>
                    <button
                      className="hover:text-secondary_light"
                      onClick={() => navigate("/about")}
                    >
                      <Text size="sm" weight="normal">
                        About Us
                      </Text>
                    </button>
                    <button
                      className="hover:text-secondary_light"
                      onClick={() => navigate("/contact-us")}
                    >
                      <Text size="sm" weight="normal">
                        Contact Us
                      </Text>
                    </button>
                  </div>
                </div>

                {/* PRODUCT */}
                <div>
                  <Text size="md" weight="semibold" className="text-[#C4FAD3]">
                    PRODUCT
                  </Text>
                  <div className="flex flex-col justify-start items-start gap-4 pt-5">
                    <button
                      className="hover:text-secondary_light"
                      onClick={() => navigate("/how-it-works")}
                    >
                      <Text size="sm" weight="normal">
                        How it works
                      </Text>
                    </button>
                    <button
                      className="hover:text-secondary_light"
                      onClick={() => navigate("/dashboard/new-order")}
                    >
                      <Text size="sm" weight="normal">
                        Share a request
                      </Text>
                    </button>
                  </div>
                </div>

                {/* LEGAL */}
                <div>
                  <Text size="md" weight="semibold" className="text-[#C4FAD3]">
                    LEGAL
                  </Text>
                  <div className="flex flex-col justify-start items-start gap-4 pt-5">
                    <button
                      className="hover:text-secondary_light"
                      onClick={() => navigate(routeNames.termsAndConditions)}
                    >
                      <Text size="sm" weight="normal">
                        Terms of Service
                      </Text>
                    </button>
                    <button className="hover:text-secondary_light">
                      <Text
                        size="sm"
                        weight="normal"
                        onClick={() => navigate(routeNames.privacy)}
                      >
                        Privacy Policy
                      </Text>
                    </button>
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
              © 2025 SHOPVIACAL. All rights reserved.
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
                target="blank"
                aria-label="Instagram"
                className="hover:text-[#8fac6a] transition-colors duration-200 p-2"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
