import React, { useEffect, useState } from "react";
import { Heading, Text } from "../../Components/Typography";
import SectionRenderer from "../../Components/SectionRenderer";
import unhappyShopper from "../../Assets/svg_images/african_girl.svg";
import happyShopper from "../../Assets/svg_images/Whisk_19879cdfd 8.svg";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import shopping_basket from "../../Assets/svg_images/Group 1.svg";
import { ImageRenderer } from "../../Components/ImageRenderer";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../../Components/PageLoader";
import LazyImage from "../../Components/LazyImage";

const faqItems = [
  {
    title: "Our Vision",
    content:
      "To make global shopping effortless, personalized, and accessible for everyone. From finding the right style to securing global items, we aim to be your trusted partner every step of the way.",
  },
  {
    title: "Why Trust ShopViaCal?",
    content:
      "Because we go beyond just facilitating purchases. From helping you discover the right items to handling every step of the shopping journey with care, transparency, and security, ShopViaCal is built to make your experience effortless and reliable.",
  },
  {
    title: "Flexible Support for Every Shopper",
    content:
      "Whether you’re struggling to pick the right outfit, short on time, or facing international checkout barriers, ShopViaCal adapts to your needs. Think of us as your digital concierge for shopping.",
  },
  {
    title: "Clear & Transparent Service",
    content:
      "We keep things simple. No hidden charges or complications just a small, transparent service fee for handling the hard parts of shopping while you enjoy the convenience.",
  },
];

const AboutUs: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <PageLoader />
      </div>
    );
  }
  return (
    <>
      <div className="bg-background text-gray-800">
        {/* Hero Section */}
        <section className="relative h-[250px] sm:h-[300px] md:h-[350px] lg:h-[400px] w-full overflow-hidden">
          <LazyImage
            src={unhappyShopper}
            alt="Hero"
            className="w-full h-full object-cover"
          />

          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-end px-4 sm:px-8 md:px-12 lg:px-16 pb-8 sm:pb-12 md:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="w-full"
            >
              <Heading
                size="2xl"
                weight="bold"
                className="text-white drop-shadow text-start sm:text-3xl md:text-4xl lg:text-5xl"
              >
                About Us
              </Heading>
            </motion.div>
          </div>
        </section>

        {/* Who We Are */}
        <section className="max-w-[700px] mx-auto px-6 py-16">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex flex-col justify-center items-center"
          >
            <Heading
              as="h1"
              size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
              weight="bold"
              className="md:leading-tight text-center"
            >
              Your trusted{" "}
              <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                personal shopper{" "}
              </span>{" "}
              for every need
            </Heading>

            <Text
              size={{ sm: "sm", md: "lg" }}
              weight={{ sm: "normal", md: "semibold" }}
              className="pt-6 text-[#6B7280] text-center"
            >
              Whether it’s securing that limited-edition item, saving time on
              everyday purchases, finding the pieces that best fit your style,
              or navigating complex international checkouts, we’re here to make
              shopping effortless. At ShopViaCal, our goal is simple: to handle
              the hard part of shopping and guide you toward the right choices,
              so you can focus on what matters most.
            </Text>
          </motion.div>
        </section>

        <section className="bg-secondary_dark text-white pt-12 px-6">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-10 items-start">
            {/* Right - FAQ */}
            <div className="flex-1 w-full">
              <div className="space-y-4">
                {faqItems.map((item, idx) => {
                  const isOpen = openIndex === idx;

                  return (
                    <div
                      key={idx}
                      className="border-b px-4 py-6 rounded-md cursor-pointer transition "
                      onClick={() => toggleIndex(idx)}
                    >
                      <div className="flex justify-between items-center">
                        <Text
                          size="lg"
                          weight="normal"
                          className="text-muted_white text-xl md:text-2xl"
                        >
                          {item.title}
                        </Text>
                        {isOpen ? (
                          <ChevronDown className="w-6 h-6 text-white transition-transform duration-200" />
                        ) : (
                          <ChevronRight className="w-6 h-6 text-white transition-transform duration-200" />
                        )}
                      </div>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div
                            key="content"
                            initial={{
                              height: 0,
                              opacity: 0,
                              y: 20,
                              marginTop: 0,
                            }}
                            animate={{
                              height: "auto",
                              opacity: 1,
                              y: 0,
                              marginTop: 16,
                            }}
                            exit={{
                              height: 0,
                              opacity: 0,
                              y: 20,
                              marginTop: 0,
                            }}
                            transition={{ duration: 0.35, ease: "easeInOut" }}
                            className="overflow-hidden"
                          >
                            <Text
                              size="lg"
                              className="text-muted_white leading-6 tracking-wide pr-3"
                            >
                              {item.content}
                            </Text>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Left - Image */}
            <div className="flex-1 ">
              <ImageRenderer src={happyShopper} alt="Team" />
            </div>
          </div>
        </section>

        {/* Mission Section - Side by Side */}
        <section className="max-w-7xl mx-auto px-6 py-12">
          <SectionRenderer
            left={
              <div className="flex justify-center items-center mb-8 md:mb-0">
                <LazyImage
                  src={shopping_basket}
                  alt="Shopping basket"
                  // className="w-full h-full object-cover"
                />
              </div>
            }
            right={
              <motion.div
                initial={{ opacity: 0, x: 60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <Heading
                  as="h1"
                  size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                  weight="bold"
                  className="md:leading-tight text-center md:text-start"
                >
                  Join the{" "}
                  <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                    ShopViaCal Experience
                  </span>
                </Heading>
                <Text
                  size="md"
                  color="subtle"
                  weight="normal"
                  className="leading-6 tracking-wide pt-4 text-center md:text-start"
                >
                  Shopping should feel exciting, not stressful. With ShopViaCal,
                  you have a trusted partner to handle the details — from
                  finding the right items to making secure purchases and
                  ensuring smooth delivery. We’re here to remove the worries of
                  international checkouts, confusing payments, or endless
                  browsing, so you can shop with confidence and ease. Whether
                  it’s for daily needs or special finds, we’ve got you covered.{" "}
                  <span
                    className="inline-flex items-center text-secondary_light font-semibold hover:underline cursor-pointer group"
                    onClick={() => navigate("/signup")}
                  >
                    TRY US TODAY{" "}
                    <ArrowRight className="ml-1 w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </Text>
              </motion.div>
            }
          />
        </section>
      </div>
    </>
  );
};

export default AboutUs;
