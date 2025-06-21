import React from "react";
import { Heading, Text } from "../../Components/Typography";
import zaraLogo from "../../Assets/svg_images/zara2.svg";
import asosLogo from "../../Assets/svg_images/asos.svg";
import sheinLogo from "../../Assets/svg_images/shein.svg";
import primarkLogo from "../../Assets/svg_images/primark.svg";

const storeLogos = [
  { name: "Zara", logo: zaraLogo },
  { name: "ASOS", logo: asosLogo },
  { name: "Shein", logo: sheinLogo },
  { name: "Primark", logo: primarkLogo },
];

const StoreMarquee = () => {
  return (
    <section className="w-full bg-background py-16 overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <Heading
          size="xl"
          weight="bold"
          color="default"
          className="text-2xl md:text-4xl"
        >
          Shop from Your Favorite Stores
        </Heading>
        <Text
          size="lg"
          weight="medium"
          color="default"
          className="w-full pt-3 max-w-2xl mx-auto mb-10"
        >
          Discover the latest trends and timeless essentials from the brands you
          love all in one place. Shop global fashion and lifestyle stores while
          paying with ease locally.
        </Text>

        {/* Scrolling marquee */}
        <div className="relative overflow-hidden">
          <div className="flex gap-10 animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
            {[...storeLogos, ...storeLogos].map((store, idx) => (
              <div
                key={idx}
                className="min-w-fit cursor-pointer opacity-80 hover:opacity-100 transition"
              >
                <img
                  src={store.logo}
                  alt={store.name}
                  className="h-12 md:h-16 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreMarquee;
