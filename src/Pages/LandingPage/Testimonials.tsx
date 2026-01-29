import React, { useState } from "react";
import { Heading, Text } from "../../Components/Typography";
import { ChevronLeft, ChevronRight} from "lucide-react";

const testimonials = [
  {
    quote: "So easy. I paste links and my orders arrive fast.",
    name: "Samson Kitigo",
    role: "Freelancer",
    rating: 5,
  },
  {
    quote: "They handled a tricky international checkout seamlessly.",
    name: "Ebere Enyiora",
    role: "Freelancer",
    rating: 5,
  },
  {
    quote: "Worth it for the time saved. I use it weekly.",
    name: "Tunde Nelson",
    role: "Store Owner",
    rating: 5,
  },
  {
    quote: "Best service ever. Saves me hours every week.",
    name: "Edith Martins",
    role: "Student",
    rating: 5,
  },
  {
    quote: "I'd say it's perfect if you love convenience",
    name: "Sarah Johnson",
    role: "Banker",
    rating: 5,
  },
];

interface TestimonialProps {
  onExploreClick?: () => void;
}
const TestimonialSection: React.FC<TestimonialProps> = ({ onExploreClick }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? testimonials.length - itemsPerView : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev >= testimonials.length - itemsPerView ? 0 : prev + 1
    );
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex,
    currentIndex + itemsPerView
  );

  const getInitials = (fullName: string) => {
    const names = fullName.trim().split(" ");
    if (names.length >= 2) {
      return (names[0][0] + names[names.length - 1][0]).toUpperCase();
    }
    return names[0][0].toUpperCase();
  };
  return (
    <div className="w-full bg-gray-50 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="text-center mb-12 lg:mb-16">
        <div className="flex items-center justify-center gap-3 mb-4">
          <span className="text-3xl">😍</span>
          <Heading
            as="h1"
            size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
            weight="bold"
            className="md:leading-tight text-center"
          >
            Loved by <span className="text-primary">customers</span>
          </Heading>
          <span className="text-3xl">❤️</span>
        </div>

        <Text
          size={{ sm: "sm", md: "lg" }}
          weight={{ sm: "normal", md: "semibold" }}
          className="pt-2 text-[#6B7280] text-center"
        >
          {" "}
          Our clients send us bunch of smiles with our services and we love them
        </Text>
      </div>

      {/* Testimonials Carousel */}
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {visibleTestimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow border border-gray-100"
            >
              {/* Quote */}
              <p className="text-gray-700 text-sm sm:text-base mb-6 italic leading-relaxed">
                "{testimonial.quote}"
              </p>

              {/* User Info & Rating */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-semibold text-sm">
                    {getInitials(testimonial.name)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">
                      {testimonial.name}
                    </p>
                    {/* <p className="text-gray-500 text-xs">
                      {testimonial.role}
                    </p> */}
                  </div>
                </div>

                {/* Stars */}
                {/* <div className="flex gap-1">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-orange-400 text-orange-400"
                    />
                  ))}
                </div> */}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={handlePrev}
            className="p-2 rounded-full border-2 border-gray-300 hover:border-primary hover:bg-orange-50 transition-colors"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600 hover:text-orange-500" />
          </button>

          <button
            onClick={handleNext}
            className="p-2 rounded-full border-2 border-gray-300 hover:border-primary hover:bg-orange-50 transition-colors"
            aria-label="Next testimonials"
          >
            <ChevronRight className="w-6 h-6 text-gray-600 hover:text-orange-500" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
