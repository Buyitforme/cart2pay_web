import React from "react";
import { Heading,Text } from "../../Components/Typography";

const stores = [
  "Zara",
  "ASOS",
  "H&M",
  "PrettyLittleThing",
  "Nike",
  "Adidas",
  "Shein",
  "Boohoo",
  "Uniqlo",
  "Forever 21",
];

const StoreMarquee = () => {
  return (
    <section className="w-full bg-background py-16  overflow-hidden">
      <div className="max-w-7xl mx-auto text-center">
        <Heading
          size="xl"
          weight="bold"
          color="default"
          className="text-2xl md:text-4xl"
        >
          {" "}
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

        <div className="relative overflow-hidden">
          <div className="flex gap-10 animate-scroll whitespace-nowrap hover:[animation-play-state:paused]">
            {stores.map((store, idx) => (
              <button
                key={idx}
                className="text-xl md:text-2xl font-semibold text-primary hover:underline transition min-w-fit cursor-pointer"
              >
                {store}
              </button>
            ))}
            {/* Duplicate list to create infinite scroll illusion */}
            {stores.map((store, idx) => (
              <button
                key={`dup-${idx}`}
                className="text-xl md:text-2xl font-semibold text-primary hover:underline transition min-w-fit cursor-pointer"
              >
                {store}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoreMarquee;
