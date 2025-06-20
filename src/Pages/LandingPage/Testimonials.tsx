import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { Star } from "lucide-react";
import { Heading, Text } from "../../Components/Typography";


const testimonials = [
  {
    name: "Amina Bello",
    location: "Lagos, Nigeria",
    rating: 5,
    message:
      "Cart2Pay made it so easy to buy from my favorite stores abroad. The local payment option is a game changer!",
  },
  {
    name: "Michael Adeyemi",
    location: "Accra, Ghana",
    rating: 4,
    message:
      "Smooth experience from payment to delivery. I’ll definitely use Cart2Pay again.",
  },
  {
    name: "Lisa K.",
    location: "Nairobi, Kenya",
    rating: 5,
    message:
      "The process felt local even though I was shopping globally. Seamless and secure!",
  },
  {
    name: "Daniel Okoro",
    location: "Abuja, Nigeria",
    rating: 5,
    message:
      "I used to struggle with international payments—Cart2Pay just made it simple and fast!",
  },
];

const Testimonials = () => {
  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto text-center mb-12">
        <Heading size="2xl" weight="bold" className="text-gray-900 mb-4">
          Seamless Payment, Happy Customers
        </Heading>
        <Text
          size="lg"
          color="default"
          className="text-gray-600 max-w-2xl mx-auto"
        >
          Hear from real shoppers who trust Cart2Pay to deliver global products
          with local convenience.
        </Text>
      </div>

      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={24}
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          768: {
            slidesPerView: 2,
          },
        }}
        className="max-w-7xl mx-auto"
      >
        {testimonials.map((testimonial, idx) => (
          <SwiperSlide key={idx}>
            <div className="bg-white shadow-md rounded-lg p-6 border border-gray-100 hover:shadow-lg transition h-full flex flex-col justify-between">
              <p className="text-gray-700 italic mb-4">
                “{testimonial.message}”
              </p>
              <div>
                <div className="text-sm text-gray-900 font-semibold">
                  {testimonial.name}
                </div>
                <div className="text-xs text-gray-500 mb-2">
                  {testimonial.location}
                </div>
                <div className="flex items-center space-x-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className="text-yellow-500 fill-yellow-500"
                    />
                  ))}
                  {testimonial.rating < 5 &&
                    Array.from({ length: 5 - testimonial.rating }).map(
                      (_, i) => (
                        <Star key={i} size={16} className="text-gray-300" />
                      )
                    )}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Testimonials;
