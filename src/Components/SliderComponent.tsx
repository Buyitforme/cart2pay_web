import React from "react";
import { storeLogos } from "../Pages/LandingPage/StoreMarquee";
import LazyImage from "./LazyImage";

const LogoSlider = () => {
  return (
    <div className="w-full bg-white py-12 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        {/* Slider Container */}
        <div className="relative">
          <div className="flex animate-infinite-scroll">
            {/* First set of logos */}
            {storeLogos.map((logo, idx) => (
              <div
                key={`first-${idx}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                      <LazyImage
                   src={logo.logo}
                    alt={logo.name}
                    className="h-10 "
              />
                </a>
              </div>
            ))}

            {/* Duplicate set for seamless loop */}
            {storeLogos.map((logo, idx) => (
              <div
                key={`second-${idx}`}
                className="flex-shrink-0 mx-8 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <a href={logo.url} target="_blank" rel="noopener noreferrer">
                
                    <LazyImage
                   src={logo.logo}
                    alt={logo.name}
                    className="h-10 "
              />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes infinite-scroll {
            0% {
              transform: translateX(0);
            }
            100% {
              transform: translateX(-50%);
            }
          }

          .animate-infinite-scroll {
            animation: infinite-scroll 5s linear infinite;
            display: flex;
            width: fit-content;
          }

          .animate-infinite-scroll:hover {
            animation-play-state: paused;
          }
        `,
        }}
      />
    </div>
  );
};

export default LogoSlider;
