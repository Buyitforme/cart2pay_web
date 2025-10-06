import React from "react";
import { Heading, Text } from "../../Components/Typography";
import SliderComponent from "../../Components/SliderComponent";

const testimonials = [
  {
    name: "Amaka O.",
    quote:
      "ShopViaCal made buying from Amazon so easy. I just dropped the product link, and they handled the rest!",
    location: "Lagos, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "James A.",
    quote:
      "No more stress with international payments. I paid locally, and my order arrived right on time.",
    location: "Abuja, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Ngozi T.",
    quote:
      "I was worried about delivery delays, but tracking updates kept me informed until my package arrived.",
    location: "Port Harcourt, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Daniel K.",
    quote:
      "Finally, a simple way to shop global brands without hidden fees. Transparent and reliable service.",
    location: "Enugu, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Lola S.",
    quote:
      "The whole process felt effortless. Fast delivery, secure payment, and excellent support!",
    location: "Ibadan, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

interface TestimonialProps {
  onExploreClick?: () => void;
}
const TestimonialSection: React.FC<TestimonialProps> = ({ onExploreClick }) => {
  return (
    <div className="w-full bg-white py-8 sm:py-12 lg:py-16 md:px-8">
      <div className="text-start mb-16">
        <Heading
          as="h1"
          size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
          weight="semibold"
          className="md:leading-tight text-center "
        >
          Loved by shoppers
        </Heading>

        <Text
          size="lg"
          weight="normal"
          className="pt-2 text-[#6B7280] text-center px-4"
        >
          Real stories from people enjoying stress-free shopping with ShopViaCal
        </Text>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Infinite Scroll Animation */}
        <div className="relative overflow-hidden w-full">
         <SliderComponent>
  {[...Array(2)]
    .flatMap(() => testimonials)
    .map((t, idx) => (
      <div
        key={idx}
        className="border border-color-border bg-white shadow-md px-6 py-3 rounded-lg hover:shadow-lg transition-shadow duration-300 w-[300px] sm:w-[350px] md:w-[400px]"
      >
        <Text
          size={{ sm: "sm", base: "xs" }}
          weight="normal"
          className="text-gray-600 italic mb-4 break-words"
        >
          "{t.quote}"
        </Text>

        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold flex-shrink-0">
            {t.name
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </div>
          <div className="min-w-0 flex-1">
            <Text size="md" weight="bold" className="text-gray-800 font-semibold truncate">
              {t.name}
            </Text>
            <Text size="sm" className="text-gray-500 truncate">
              {t.location}
            </Text>
          </div>
        </div>
      </div>
    ))}
</SliderComponent>

          
          </div>
        </div>
      </div>
  );
};

export default TestimonialSection;
