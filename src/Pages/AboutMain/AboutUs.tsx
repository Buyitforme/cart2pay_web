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

const faqItems = [
  {
    title: "Our Vision",
    content:
      "To make global shopping accessible and stress-free for everyone, regardless of payment limitations. We aim to bridge the gap between local shoppers and international stores through simple, reliable payment solutions.",
  },
  {
    title: "Secure Payments You Can Trust",
    content:
      "Your safety is our priority. Cart2Pay ensures every transaction is encrypted, transparent, and protected from start to finish. Shop internationally with confidence, knowing your payment is handled by a secure, verified system.",
  },
  {
    title: "Multiple Payment Options to Suit You",
    content:
      "We support flexible local payment methods, so you can choose what works best for you. Whether it’s a bank transfer or mobile wallet, Cart2Pay makes it easy to pay locally and shop globally.",
  },
  {
    title: "A Small, Transparent Service Fee",
    content:
      "We charge a minimal service fee that covers currency conversion and transaction processing, no hidden charges or surprises. Our goal is to give you international access without the payment resrictions hassle.",
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
  <PageLoader />;
      </div> 
    )
   
  }
  return (
    <>
      <div className="bg-background text-gray-800">
        {/* Hero Section */}
        <section className="relative h-fit w-full overflow-hidden">
          <img
            src={unhappyShopper}
            alt="Hero"
            className="w-full h-fit object-cover"
          />

          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end  px-16 pb-16">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Heading
                size="3xl"
                weight="bold"
                className="text-white drop-shadow text-center"
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
            className="flex flex-col justify-center items-center "
          >
            <Text
              size={{ sm: "xl", base: "2xl", md: "3xl", lg: "4xl" }}
              weight={{ sm: "bold", base: "semibold", md: "bold" }}
              className="text-[#4A4A4A] group-hover:text-white transition duration-300 text-center"
            >
              Elevate your shopping experience with ease of payment
            </Text>
            <Text
              size={{ sm: "sm", md: "lg" }}
              weight={{ sm: "normal", md: "semibold" }}
              className="pt-2 text-[#6B7280] text-center"
            >
              At ShopViaCal, we believe that no one should be limited by borders
              or banking restrictions when shopping online from international
              stores. Our platform empowers individuals to shop from
              international stores even without a foreign card by offering a
              seamless, secure way to pay in local currency while we handle the
              rest.
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
                              size="sm"
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
            left={<img src={shopping_basket} alt="Team" className="" />}
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
                  className="leading-6 tracking-wide pt-4"
                >
                  Cart abandonment is no longer part of the story with
                  ShopViaCal. We’ve reimagined how users interact with their
                  carts — turning hesitation into confident checkouts. Our
                  intelligent system ensures that every item you add is just a
                  few steps from your doorstep, without the frustration of
                  forgotten purchases or complicated payment processes. Whether
                  you're a wholesaler or a casual shopper, say goodbye to
                  payment frustrations and uncompleted transactions.{" "}
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
