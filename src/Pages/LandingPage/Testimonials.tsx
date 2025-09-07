import React from "react";
import { Heading, Text } from "../../Components/Typography";
import { Button } from "../../Components/Button";
import AnimatedCounter from "../../Components/AnimatedCounter";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    name: "Amaka O.",
    quote: "The checkout was super smooth and fast!",
    location: "Lagos, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=1",
  },
  {
    name: "James A.",
    quote: "Love how simple it is to clear my cart here.",
    location: "Abuja, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Ngozi T.",
    quote: "I never worry about cart abandonment anymore!",
    location: "Port Harcourt, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=3",
  },
  {
    name: "Daniel K.",
    quote: "This platform changed how I shop online.",
    location: "Enugu, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=4",
  },
  {
    name: "Lola S.",
    quote: "Super intuitive and efficient. Highly recommend!",
    location: "Ibadan, Nigeria",
    avatar: "https://i.pravatar.cc/100?img=5",
  },
];

interface TestimonialProps {
  onExploreClick?: () => void;
}
const TestimonialSection: React.FC<TestimonialProps> = ({ onExploreClick }) => {
  const navigate = useNavigate();

  return (
    <div className="max-w-[85%] mx-auto bg-white py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="text-start mb-16">
        <Heading
          as="h1"
          size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
          weight="semibold"
          className="md:leading-tight text-center"
        >
          Loved by shoppers
        </Heading>

        <Text
          size="lg"
          weight="light"
          className="pt-2 text-[#6B7280] text-center"
        >
          Real reviews from people who switched to link-based purchasing.
        </Text>
      </div>

      <div className="flex flex-col items-center gap-8">
        {/* Infinite Scroll Animation */}
        <div className="relative overflow-hidden w-full">
          <div className="flex animate-scroll hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="border border-color-border bg-white shadow-md px-6 py-6 rounded-lg flex-shrink-0 hover:shadow-lg transition-shadow duration-300 
                           w-full sm:w-[70%] lg:w-[400px] mx-2"
              >
                <Text
                  size="md"
                  weight="bold"
                  color="default"
                  className="text-gray-600 italic mb-4 whitespace-normal break-words leading-relaxed"
                >
                  "{t.quote}"
                </Text>

                <div className="flex items-center gap-3 mt-4">
                  {/* Avatar with initials */}
                  <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold flex-shrink-0">
                    {t.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>

                  <div className="min-w-0 flex-1">
                    <Text
                      size="md"
                      weight="bold"
                      color="default"
                      className="text-gray-800 font-semibold"
                    >
                      {t.name}
                    </Text>
                    <Text size="sm" color="default" className="text-gray-500">
                      {t.location}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};



export default TestimonialSection;
