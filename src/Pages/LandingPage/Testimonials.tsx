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
    <div className="bg-background py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
        {/* Left Side */}
        <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6 lg:space-y-8">
          <Heading
            size="xl"
            weight="bold"
            color="default"
            className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-6 leading-tight"
          >
            Join over 1000+ individuals that have cleared their{" "}
            <span className="text-primary">Cart</span> with us
          </Heading>

          <div className="flex justify-center lg:justify-start gap-8 sm:gap-12 lg:gap-16 mb-6 lg:mb-8 flex-wrap sm:flex-nowrap">
            <AnimatedCounter end={300} label="Wholesalers" />
            <AnimatedCounter end={700} label="Casual shoppers" />
          </div>

          <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 sm:gap-6 flex-wrap">
            <Button variant="secondary" onClick={() => navigate("/signup")}>
              Shop for me
            </Button>
            <Button variant="outline" onClick={onExploreClick}>
              Explore stores
            </Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="w-full lg:w-1/2 relative">
          {/* Mobile/Tablet: Horizontal Scroll */}
          <div className="block lg:hidden overflow-x-auto pb-4">
            {/* Mobile/Tablet/Desktop: Infinite Scroll Animation */}
<div className="relative overflow-hidden">
  <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
    {[...testimonials, ...testimonials].map((t, idx) => (
      <div
        key={idx}
        className="min-w-[280px] sm:min-w-[320px] md:min-w-[380px] bg-white shadow-md px-4 sm:px-6 py-4 sm:py-6 rounded-lg flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
      >
        {/* testimonial content */}
         <Text
                    size="md"
                    weight="bold"
                    color="default"
                    className="text-gray-600 italic mb-3 text-sm sm:text-base leading-relaxed line-clamp-4"
                  >
                    "{t.quote}"
                  </Text>
                  <div className="flex items-center gap-3 mt-4">
                    {/* Avatar with initials */}
                    <div className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-gray-300 text-gray-700 font-semibold text-sm sm:text-base flex-shrink-0">
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
                        className="text-gray-800 font-semibold text-sm sm:text-base truncate"
                      >
                        {t.name}
                      </Text>
                      <Text size="sm" color="default" className="text-gray-500 text-xs sm:text-sm truncate">
                        {t.location}
                      </Text>
                    </div>
                  </div>
      </div>
    ))}
  </div>
</div>

            
          </div>

          {/* Desktop: Infinite Scroll Animation */}
          <div className="hidden lg:block relative overflow-hidden">
            <div className="flex gap-6 animate-scroll hover:[animation-play-state:paused]">
              {[...testimonials, ...testimonials].map((t, idx) => (
                <div
                  key={idx}
                  className="min-w-[380px] max-w-[380px] bg-white shadow-md px-6 py-6 rounded-lg flex-shrink-0 hover:shadow-lg transition-shadow duration-300"
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
    </div>
  );
};

export default TestimonialSection;
