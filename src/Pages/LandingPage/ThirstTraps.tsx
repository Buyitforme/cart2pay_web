import React from "react";
import exampleImage from "../../Assets/svg_images/payment_cards.svg";
import { Text } from "../../Components/Typography";
import { Button } from "../../Components/Button";

interface Props {
  onExploreClick?: () => void;
}
const ThirstTraps: React.FC<Props> = ({ onExploreClick }) => {
  return (
    <section className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[95%] mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8">
        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src={exampleImage}
            alt="Creative commerce illustration"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        {/* Right Content */}
        <div className="w-full  text-left space-y-4 sm:space-y-6">
          <Text
            size="lg"
            weight="medium"
            color="default"
            className="text-lg sm:text-lg md:text-xl lg:text-3xl leading-relaxed text-center lg:text-end"
          >
            How about we both stick to our strengths, shall we? You focus on
            adding your favorite items to your cart from international stores
            and we handle the checkout.
          </Text>

          <div className="flex fle-col justify-end items-end">
            {" "}
            <Button variant="primary" onClick={onExploreClick}>
    Get me started
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ThirstTraps;
