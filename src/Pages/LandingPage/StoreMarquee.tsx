import React from "react";
import { Heading, Text } from "../../Components/Typography";
import zaraLogo from "../../Assets/svg_images/zara2.svg";
import asosLogo from "../../Assets/svg_images/asos.svg";
import sheinLogo from "../../Assets/svg_images/shein.svg";
import primarkLogo from "../../Assets/svg_images/primark.svg";

const storeLogos = [
  { name: "Zara", logo: zaraLogo, url: "https://www.zara.com/" },
  { name: "ASOS", logo: asosLogo, url: "https://www.asos.com/" },
  { name: "Shein", logo: sheinLogo, url: "https://us.shein.com/" },
  { name: "Primark", logo: primarkLogo, url: "https://www.primark.com/en-gb" },
];

const StoreMarquee = () => {
    const handleStoreClick = (url: string, storeName: string) => {
      // Optional: Add analytics tracking here
      console.log(`Clicking on ${storeName}`);

      // Open in new tab
      window.open(url, "_blank", "noopener,noreferrer");
    };
  return (
    <section className="w-full bg-background py-16 overflow-hidden">
      <div className="text-center">
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
          className="w-full px-3 pt-3 max-w-2xl mx-auto mb-10"
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
                className="min-w-fit cursor-pointer opacity-80 hover:opacity-100 transition-all duration-300 hover:scale-105"
                onClick={() => handleStoreClick(store.url, store.name)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleStoreClick(store.url, store.name);
                  }
                }}
              >
                <img
                  src={store.logo}
                  alt={`Visit ${store.name} store`}
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
