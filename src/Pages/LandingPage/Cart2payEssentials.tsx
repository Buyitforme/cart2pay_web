import React from "react";
import exampleImage from "../../Assets/svg_images/payment_cards.svg";
import { Button } from "../../Components/Button";
import { Heading, Text } from "../../Components/Typography";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";

const essentials = [
  {
    title: "Local Payment Options",
    description:
      "Pay in your local currency using familiar payment methods. No need for international bank accounts.",
    image: exampleImage,
    color: "#469EBD",
  },
  {
    title: "Global Store Access",
    description:
      "Shop from top international stores without restrictions. We bridge the gap between global brands and local buyers.",
    image: exampleImage,
    color: "#8FAC6A",
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Your orders delivered quickly and securely to your doorstep. No more long delays or missing parcels.",
    image: exampleImage,
    color: "#D96F2D",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden fees or surprises. What you see is what you pay, with clear breakdowns on every order.",
    image: exampleImage,
    color: "#1E2A47",
  },
];

const CardItem = ({ item }: { item: (typeof essentials)[0] }) => {

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
      style={{ "--card-color": item.color } as React.CSSProperties}
    >
      {/* Background hover overlay */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 force-hover:opacity-100 transition duration-500 z-0"
        style={{ backgroundColor: item.color }}
      />

      {/* Content */}
      <div className="relative z-10 transition duration-500 group-hover:text-white force-hover:text-white h-full flex flex-col justify-between">
        <div>
          <h1 className="text-xl font-semibold mb-2">{item.title}</h1>
          <p className="text-gray-600 group-hover:text-blue-100 force-hover:text-blue-100 mb-4">
            {item.description}
          </p>
        </div>

        <div className="mt-2 w-fit">
          <Button
            variant="outline"
            className={`
              transition 
              border 
              text-[color:var(--card-color)] 
              border-[color:var(--card-color)] 
              group-hover:text-white 
              group-hover:border-white 
              group-hover:bg-[color:var(--card-color)]
              force-hover:text-white 
              force-hover:border-white 
              force-hover:bg-[color:var(--card-color)]
            `}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Hover image animation */}
      <img
        src={item.image}
        alt={item.title}
        className="absolute bottom-[-80px] right-4 w-28 opacity-0 group-hover:bottom-4 group-hover:opacity-100 force-hover:bottom-4 force-hover:opacity-100 transition-all duration-500 ease-out z-10"
      />
    </div>
  );
};

const Cart2payEssentials = () => {
      const navigate = useNavigate();

  return (
    <section className="w-full bg-white py-20 px-3 md:px-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-2 items-center justify-center">
          <Heading
            size="xl"
            weight="bold"
            color="default"
            className="text-2xl md:text-4xl text-center"
          >
            Cart2Pay
          </Heading>
          <Heading
            size="xl"
            weight="bold"
            color="primary"
            className="text-2xl md:text-4xl text-center"
          >
            Essentials
          </Heading>
        </div>

        <Text
          size="lg"
          weight="medium"
          color="default"
          className="text-center max-w-3xl mx-auto py-6"
        >
          Cart2Pay simplifies the international shopping experience by giving
          you local access to global stores. Here’s what makes us essential to
          every modern shopper.
        </Text>

        <div
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mx-6 md:mx-20"
          onClick={() => navigate("/signup")}
        >
          {essentials.map((item, index) => (
            <CardItem key={index} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Cart2payEssentials;
