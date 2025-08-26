import React from "react";
import exampleImage from "../../Assets/svg_images/payment_cards.svg";
import { Heading, Text } from "../../Components/Typography";
import { Button } from "../../Components/Button";

interface Props {
  onExploreClick?: () => void;
}
const ThirstTraps: React.FC<Props> = ({ onExploreClick }) => {
  return (
    <section className="w-full bg-background py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-[95%] mx-auto flex flex-col-reverse md:flex-row items-center gap-8 md:gap-12 lg:gap-16 px-4 sm:px-6 lg:px-8">
        {/* Right Content */}
        <div className="w-full text-right space-y-6 sm:space-y-8">
          {/* Title */}
          <Heading
            size="xl"
            weight="bold"
            color="default"
            // className="text-4xl md:text-6xl"
          
            className="text-2xl sm:text-2xl md:text-3xl lg:text-4xl leading-snug text-center lg:text-start"
          >
            Discover, Share and Relax.{" "}
          </Heading>

          {/* Description */}
          <Text
            size="sm"
            weight="medium"
            color="default"
            className="text-base sm:text-lg md:text-lg lg:text-xl leading-relaxed text-center lg:text-start"
          >
            Let’s make things simple. You focus on discovering and the products
            you love, and we’ll take care of the rest ensuring you get them
            without stress. From seamleslessly sharing your product url to
            geting it delivered right to your door step. Shopping has never
            been this easy.
          </Text>

          {/* CTA */}
          <div className="flex flex-col justify-start items-start">
            <Button variant="primary" onClick={onExploreClick}>
              Get me started
            </Button>
          </div>
        </div>

        {/* Left Image */}
        <div className="w-full md:w-1/2">
          <img
            src={exampleImage}
            alt="Creative commerce illustration"
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>
      </div>
    </section>
  );
};

export default ThirstTraps;
