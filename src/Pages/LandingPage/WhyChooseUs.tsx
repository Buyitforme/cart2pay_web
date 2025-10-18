import star from "../../Assets/svg_images/Background.svg";
import { Heading, Text } from "../../Components/Typography";
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

  return (
    <div
      className="group relative rounded-2xl shadow-lg overflow-hidden transition-all duration-500 
      hover:shadow-xl hover:-translate-y-1"
    >
      {/* Gradient background - visible by default on mobile, slides on desktop hover */}
      <div
        className="absolute inset-0 z-0 w-full h-full rounded-2xl 
        translate-x-0 md:transform md:-translate-x-full md:group-hover:translate-x-0 
        transition-transform duration-700 ease-in-out"
        style={{
          backgroundImage:
            "linear-gradient(to right, #1C4A3F 80%, #F38C05 120%)",
        }}
      ></div>

      {/* Card Content */}
      <div className="relative z-10 bg-transparent md:bg-white md:group-hover:bg-transparent h-full rounded-2xl p-6 flex flex-col justify-between transition-all duration-500 min-h-[320px]">
        <div className="flex gap-4 items-start">
          <div className="h-12 w-12 bg-primary md:bg-gray-200 md:group-hover:bg-primary rounded-xl flex justify-center items-center transition duration-300 flex-shrink-0">
            <Star className="w-[20px] h-[20px] text-white md:text-gray-500 md:group-hover:text-white transition duration-300" />
          </div>
          <Text
            size={{ base: "lg", md: "xl", lg: "2xl" }}
            weight="bold"
            className="text-white md:text-[#1F2937] md:group-hover:text-white transition duration-300"
          >
            {item.title}
          </Text>
        </div>

        <Text
          size={{ sm: "sm", md: "md" }}
          weight="normal"
          className="text-white md:text-[#6B7280] md:group-hover:text-white transition duration-300 mt-4"
        >
          {item.description}
        </Text>

        <div
          className="flex items-center gap-2 mt-6 cursor-pointer"
                onClick={() => navigate("/dashboard/new-order")}
        >
          <Text
            size="lg"
            weight="semibold"
            className="text-white md:text-[#F38C05] md:group-hover:text-white transition duration-300"
          >
            Get Started
          </Text>
          <ArrowRight className="w-5 h-5 text-white md:text-[#F38C05] md:group-hover:text-white transition duration-300" />
        </div>
      </div>
    </div>
  );
};



const WhyChooseUs = () => {
  return (
    <section className="w-full bg-background py-20  md:px-12">
      <div className="max-w-[95%] mx-auto">
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

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
  <CardItem item={essentials[0]} />
  <CardItem item={essentials[1]} />
  <CardItem item={essentials[2]} />
  <div className="md:col-start-2 lg:col-start-2">
    <CardItem item={essentials[3]} />
  </div>
</div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
