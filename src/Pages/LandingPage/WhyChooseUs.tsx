import star from "../../Assets/svg_images/Background.svg";
import { Heading, Text } from "../../Components/Typography";
import { useInView } from "react-intersection-observer";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Star } from "lucide-react";

const essentials = [
  {
    title: "Local Payment Options",
    description:
      "Pay in your own currency with familiar methods bank transfer, mobile wallet, or debit card. Shop globally, pay locally, no stress.",
    image: star,
    color: "#469EBD",
  },
  {
    title: "Global Store Access",
    description:
      "Shop from Zara, Shein, Fashionova, and more  without borders or restrictions. The world’s top retailers are now within reach.",
    image: star,
    color: "#8FAC6A",
  },
  {
    title: "Fast & Reliable Delivery",
    description:
      "Your orders ship quickly and safely with trusted partners. Track every step from dispatch to doorstep, no delays, no worries.",
    image: star,
    color: "#D96F2D",
  },
  {
    title: "Transparent Pricing",
    description:
      "No hidden charges. See a clear cost breakdown for product, fees, and delivery. With us, what you see is what you pay.",
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
        className="absolute inset-0 z-0 w-full h-full transform -translate-x-full group-hover:translate-x-0 force-hover:translate-x-0 transition-transform duration-700 ease-in-out"
        style={{
          backgroundImage:
            "linear-gradient(to right, #054B2F 80%, #F38C05 120%)",
        }}
      ></div>

      {/* Content */}
      <div className="relative z-10 transition duration-500 group-hover:text-white force-hover:text-white h-full flex flex-col justify-between">
        <div className="flex gap-4 items-center justify-start">
          <div className="h-10 w-10 bg-gray-200 group-hover:bg-orange-500 rounded-xl flex justify-center items-center transition duration-300">
            <Star className="w-[20px] h-[20px] text-gray-500 group-hover:text-white transition duration-300" />
          </div>
          <Text
            size={{ base: "md", md: "lg", lg: "xl" }}
            weight={{ base: "semibold", md: "bold" }}
            className="text-[#4A4A4A] group-hover:text-white transition duration-300"
          >
            {item.title}
          </Text>
        </div>

        <Text
          size={{ sm: "sm", md: 'md'}}
          weight={{ sm: "light", md: "light" }}
          className="text-[#6B7280] group-hover:text-white transition duration-300"
        >
          {item.description}
        </Text>

        <div
          className="flex justify-between items-center mt-2 cursor-pointer"
          onClick={() => navigate("/signup")}
        >
          <Text
            size="lg"
            weight="normal"
            color="secondary"
            className="text-primary group-hover:text-white transition duration-300"
          >
            Get started
          </Text>
          <ArrowRight className="w-5 group-hover:text-white transition duration-300" />
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
            weight="normal"
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
