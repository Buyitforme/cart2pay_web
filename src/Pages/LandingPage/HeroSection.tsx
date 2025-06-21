import React from "react";
import { Button } from "../../Components/Button";
import unhappyShopper from "../../Assets/svg_images/unhappy_shopper.svg";
import happyShopper from "../../Assets/svg_images/happy_shopper.svg";
import paymentCards from "../../Assets/svg_images/payment_cards.svg";
import ImageSlider from "../../Components/Slider";
import { Heading, Text } from "../../Components/Typography";

const images = [unhappyShopper, paymentCards, happyShopper];
function HeroSection() {
  return (
    <section className="w-full bg-white pt-6 md:pt-0 ">
      <div className=" flex flex-col md:flex-row items-center gap-2 md:gap-4">
        {/* Left content */}
        <div className="w-full md:w-[65%] text-left">
          <Heading
            size="xl"
            weight="bold"
            color="default"
            className="text-4xl md:text-6xl"
          >
            Shop Globally
          </Heading>
          <Heading
            size="xl"
            weight="bold"
            color="primary"
            className="text-3xl md:text-5xl pt-2 animate-pulse"
          >
            Pay Locally
          </Heading>

          <Text
            size="lg"
            weight="medium"
            color="default"
            className="w-full pt-3"
          >
            Experience seamless international shopping from anywhere in the
            world. We help you access global products with local payment options.
          
          </Text>
          <div className="flex md:flex-row gap-4 pt-6 items-center md:items-start">
            <Button variant="primary" className="w-full md:w-auto">
              Create account
            </Button>
            <Button
              variant="outline"
              className="border border-primary text-primary bg-transparent hover:bg-primary hover:text-white transition w-full md:w-auto"
            >
              Discover Favorite stores
            </Button>
          </div>
        </div>

        {/* Right content (Slider) */}
        <div className="w-full md:w-[35%] pt-4 md:pt-8">
          <ImageSlider images={images} />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
