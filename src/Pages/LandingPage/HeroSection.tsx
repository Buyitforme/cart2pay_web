import React from "react";
import { Button } from "../../Components/Button";
import unhappyShopper from "../../Assets/svg_images/unhappy_shopper.svg";
import happyShopper from "../../Assets/svg_images/happy_shopper.svg";
import paymentCards from "../../Assets/svg_images/payment_cards.svg";
import ImageSlider from "../../Components/Slider";
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
  <div className="bg-gradient-to-br from-slate-100 via-blue-50 to-indigo-100 py-16">
    <div className="max-w-[85%] mx-auto grid lg:grid-cols-2 gap-12 items-start lg:items-center">
      {/* Left Content */}
      <div className="space-y-8">
        <div>
          <Heading
            as="h1"
            size="4xl"
            weight="light"
            className="leading-tight"
          >
            Skip the hassle of online{" "}
            <span className="text-secondary_light">checkout</span>
          </Heading>
        </div>

        <Text
          size="lg"
          color="secondary"
          weight="light"
          className="leading-relaxed max-w-lg "
        >
          Simply paste the link to the item you want, and we'll take care of
          the purchasing and delivery process for you, ensuring it arrives
          right at your doorstep.
        </Text>

        <div className="flex flex-col sm:flex-row gap-4">
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
            className="w-full text-sm sm:text-base py-2 sm:py-3"
            onClick={() => navigate("/how-it-works")}
          >
            See how it works
          </Button>
        </div>
      </div>

      {/* Right Image */}
      <div className="relative flex justify-center">
        <div className="relative z-10">
          <img
            src={paymentCards} 
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
