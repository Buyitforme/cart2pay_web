import React from "react";
import star from "../../Assets/svg_images/Background.svg";
import { Button } from "../../Components/Button";
import { Heading, Text } from "../../Components/Typography";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const essentials = [
  {
    title: "Local Payment Options",
    description:
      "Pay in your local currency using familiar payment methods. No need for international bank accounts.",
    image: star,
    color: "#469EBD",
  },
  {
    title: "Global Store Access",
    description:
      "Shop from top international stores without restrictions. We bridge the gap between global brands and local buyers.",
    image: star,
    color: "#8FAC6A",
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Your orders delivered quickly and securely to your doorstep. No more long delays or missing parcels.",
    image: star,
    color: "#D96F2D",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees or surprises. What you see is what you pay, with clear breakdowns on every order.",
    image: star,
    color: "#1E2A47",
  },
];

const CardItem = ({ item }: { item: (typeof essentials)[0] }) => {
  const navigate = useNavigate();

  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

return (
  <div
    ref={ref}
    className={`group relative bg-white shadow-lg rounded-lg p-6 overflow-hidden h-80 transition duration-500 ${
      inView ? "force-hover" : ""
    }`}
  >
    {/* Sliding gradient background */}
    <div
      className="absolute inset-0 z-0 w-full h-full transform -translate-y-full group-hover:translate-y-0 force-hover:translate-y-0 transition-transform duration-700 ease-in-out"
      style={{
        backgroundImage:
          "linear-gradient(to right, #34C759, #FFA500)",
      }}
    ></div>

    {/* Content */}
    <div className="relative z-10 transition duration-500 group-hover:text-white force-hover:text-white h-full flex flex-col justify-between">
      <div className="flex gap-2 items-start justify-start">
        <img src={star} alt="" className="filter group-hover:brightness-0 group-hover:invert-0 group-hover:sepia group-hover:saturate-[500%] group-hover:hue-rotate-[30deg]" />
        <Text
          size="xl"
          weight="bold"
          className="text-[#4A4A4A] group-hover:text-white"
        >
          {item.title}
        </Text>
      </div>

      <Text
        size="lg"
        weight="light"
        className="text-[#6B7280] group-hover:text-white"
      >
        {item.description}
      </Text>

      <div
        className="flex justify-between items-center mt-2 cursor-pointer"
        onClick={() => navigate("/signup")}
      >
        <Text
          size="lg"
          weight="light"
          color="secondary"
          className="text-primary group-hover:text-white"
        >
          Get started
        </Text>
        <ArrowRight className="w-5 group-hover:text-white" />
      </div>
    </div>
  </div>
);


};

const WhyChooseUs = () => {
  return (
    <section className="w-full bg-background py-20 px-3 md:px-12">
      <div className="max-w-[85%] mx-auto">
        <div className="text-start mb-16">
          <Heading
            as="h1"
            size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
            weight="semibold"
            className="md:leading-tight text-center"
          >
            Why choose us
          </Heading>

          <Text
            size="lg"
            weight="light"
            className="pt-2 text-[#6B7280] text-center"
          >
            Convenience without the checkout stress.{" "}
          </Text>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-6 md:mx-20">
          {essentials.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
