import React from "react";
import { Button } from "../../Components/Button";
import unhappyShopper from "../../Assets/svg_images/unhappy_shopper.svg";
import happyShopper from "../../Assets/happy_shopper.png";
import paymentCards from "../../Assets/svg_images/payment_cards.svg";
import { Heading, Text } from "../../Components/Typography";
import { useNavigate } from "react-router-dom";
import { Play, Rocket } from "lucide-react";

const images = [unhappyShopper, paymentCards, happyShopper];
interface HeroSectionProps {
  onExploreClick?: () => void;
}
const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  const navigate = useNavigate();
 return (
  <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-blue-200 ">
    <div className="max-w-[85%] mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
      {/* Left Content */}
      <div className="pt-8 lg:pt-0 space-y-4">
        <div>
          <Heading as="h1" size={{sm:"xl", base: "3xl", md: "4xl", lg: "5xl" }} weight="bold" className="md:leading-tight  md:text-start">
            Your digital concierge for all things{" "}
            <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-[#054B2F] to-[#0CB16F] bg-clip-text text-transparent">
              shopping
            </span>
          </Heading>
        </div>

        <Text
          size="lg"
          color="secondary"
          weight="light"
          className=" "
        >
          Your personal shopping assistant at your fingertips, Simply share the url to the item you want, and we'll take care of
          the purchasing and delivery process for you, ensuring it arrives
          right at your doorstep.
        </Text>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <Button
            variant="primary"
            icon={<Rocket className="w-5 h-5" />}
            className="w-full text-sm sm:text-base py-2 sm:py-3"
            onClick={() => navigate("/signin")}
          >
            Get Started
          </Button>

          <Button
            variant="secondary"
            icon={<Play className="w-5 h-5" />}
            className="w-full text-sm sm:text-base py-2 sm:py-3 bg-[#E8F7F0] text-secondary hover:bg-secondary"
            onClick={() => navigate("/how-it-works")}
          >
            See how it works
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative flex justify-center lg:justify-end">
        <div className="relative z-10 w-full lg:w-[90%] xl:w-full">
          <img
            src={happyShopper}
            alt="Happy woman with shopping bags giving thumbs up"
            className="rounded-2xl w-full h-auto object-cover"
          />
        </div>
      </div>
    </div>
  </div>
);
};

export default HeroSection;
