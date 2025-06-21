import React from "react";
import { Heading, Text } from "../../Components/Typography";
import { Button } from "../../Components/Button";
import AnimatedCounter from "../../Components/AnimatedCounter";

const testimonials = [
  { name: "Amaka O.", quote: "The checkout was super smooth and fast!" },
  { name: "James A.", quote: "Love how simple it is to clear my cart here." },
  { name: "Ngozi T.", quote: "I never worry about cart abandonment anymore!" },
  { name: "Daniel K.", quote: "This platform changed how I shop online." },
  {
    name: "Lola S.",
    quote: "Super intuitive and efficient. Highly recommend!",
  },
];

const TestimonialSection: React.FC = () => {
  return (
    <div className="bg-background py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
        {/* Left Side */}
        <div className="flex-1 text-center md:text-left">
          <Heading
            size="xl"
            weight="bold"
            color="default"
            className="text-xl md:text-3xl mb-6"
          >
            Join over 1000+ individuals that have cleared their{" "}
            <span className="text-primary">Cart</span> with us
          </Heading>

          <div className="flex justify-center md:justify-start gap-8 mb-8 flex-wrap">
            <AnimatedCounter end={300} label="Wholesalers" />
            <AnimatedCounter end={700} label="Retailers" />
          </div>

          <div className="flex justify-center md:justify-start gap-4 flex-wrap">
            <Button variant="secondary">Create a free account</Button>
            <Button variant="outline">Start shopping</Button>
          </div>
        </div>

        {/* Right Side */}
        <div className="flex-1 relative overflow-hidden w-full max-w-full">
          <div className="flex gap-6 animate-scroll px-1 hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, idx) => (
              <div
                key={idx}
                className="min-w-[300px] max-w-[300px] bg-white shadow-md px-6 py-4 rounded-lg"
              >
                <Text
                  size="md"
                  weight="bold"
                  color="default"
                  className="text-gray-600 italic mb-3 whitespace-normal break-words"
                >
                  “{t.quote}”
                </Text>
                <Text
                  size="md"
                  weight="bold"
                  color="default"
                  className="text-gray-800 font-semibold"
                >
                  - {t.name}
                </Text>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
