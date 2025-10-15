import React, { useState } from "react";
import { Heading, Text } from "../../Components/Typography";
import SectionRenderer from "../../Components/SectionRenderer";
import unhappyShopper from "../../Assets/svg_images/african_girl.svg";
import happyShopper from "../../Assets/svg_images/Whisk_19879cdfd 8.svg";
import { ChevronDown, ChevronRight, ArrowRight } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import shopping_basket from "../../Assets/svg_images/Group 1.svg";
import { ImageRenderer } from "../../Components/ImageRenderer";
import { useNavigate } from "react-router-dom";
import LazyImage from "../../Components/LazyImage";
import { Button } from "../../Components/Button";
import { AnimatedSection } from "../LandingPage/LandingPageMain";
import StoreMarquee from "../LandingPage/StoreMarquee";

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

  const navigate = useNavigate();

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

 return (
  <>
    <div className="bg-background text-gray-800">
      <section className="bg-secondary_dark w-full pt-36 lg:pt-48 pb-10 lg:pb-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-16 px-4 lg:px-12 items-center">
          {/* Left Column */} 
          <div>
            <p className="text-sm sm:text-base font-medium tracking-widest text-white/70 mb-2 sm:mb-4">
              ABOUT SHOPVIACAL
            </p>

            <h1 className="mt-2 text-2xl sm:text-3xl lg:text-5xl font-light text-white leading-[1.2] lg:leading-[1.25]">
              The trusted personal shopper <br className="hidden sm:block" />
              <span className="italic font-medium">
                simplifying your buying experience
              </span>
            </h1>
          </div>

          {/* Right Column */}
          <div className="mt-6 lg:mt-0">
            <p className="text-white/90 text-base sm:text-lg leading-relaxed mb-4 max-w-lg">
              Whether it’s securing that limited-edition item, saving time on
              everyday purchases, or navigating complex international
              checkouts, we make shopping effortless and convenient, so you
              get what you need, faster.
            </p>

            <Button
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-secondary_dark transition-all duration-300 px-4 sm:px-5 py-2 sm:py-2.5 w-auto"
              onClick={() => navigate("/dashboard/new-order")}
            >
              Get started
            </Button>
          </div>
        </div>
      </section>

      <div className="w-full h-64 sm:h-80 md:h-[400px] lg:h-[480px] overflow-hidden">
        <LazyImage
          src={unhappyShopper}
          alt="Hero"
          className="w-full h-full object-cover"
        />
      </div>

      <section className="bg-secondary_dark text-white pt-8 px-4 lg:px-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 lg:gap-12 items-start">
          {/* Right - FAQ */}
          <div className="flex-1 w-full">
            <div className="space-y-4">
              {faqItems.map((item, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className="border-b px-4 py-4 rounded-md cursor-pointer transition"
                    onClick={() => toggleIndex(idx)}
                  >
                    <div className="flex justify-between items-center">
                      <Text
                        size="lg"
                        weight="normal"
                        className="text-muted_white text-lg md:text-2xl"
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
          <div className="flex-1">
            <ImageRenderer src={happyShopper} alt="Team" />
          </div>
        </div>
      </section>

      <AnimatedSection>
        <StoreMarquee />
      </AnimatedSection>

      {/* Mission Section - Side by Side */}
      <section className="max-w-7xl mx-auto px-4 py-8 lg:px-12 lg:py-12">
        <SectionRenderer
          left={
            <div className="flex justify-center items-center mb-6 md:mb-0">
              <LazyImage
                src={shopping_basket}
                alt="Shopping basket"
                className="w-full h-full object-cover"
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
                you have a trusted partner to handle the details from finding
                the right items to making secure purchases and ensuring smooth
                delivery. We’re here to remove the worries of international
                checkouts, confusing payments, or endless browsing, so you can
                shop with confidence and ease. Whether it’s for daily needs or
                special finds, we’ve got you covered.{" "}
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
