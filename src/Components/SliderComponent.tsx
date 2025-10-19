import React, { useEffect, useRef, useState } from "react";
import { storeLogos } from "../Pages/LandingPage/StoreMarquee";
import LazyImage from "./LazyImage";


const LogoSlider = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(40); 

  useEffect(() => {
    if (scrollRef.current) {
      const scrollWidth = scrollRef.current.scrollWidth / 2; 
const baseSpeed = 70;
const computedDuration = Math.min(scrollWidth / baseSpeed, 40); 
      setDuration(computedDuration);
    }
  }, []);

  return (
    <div className="w-full bg-white py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="relative">
          {/* Scrolling container */}
          <div
            ref={scrollRef}
            className="flex animate-infinite-scroll items-center"
            style={{
              animationDuration: `${duration}s`,
            }}
          >
            {[...storeLogos, ...storeLogos].map((logo, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 mx-4 sm:mx-6 grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100"
              >
                <a
                  href={logo.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center"
                >
                  <LazyImage
                    src={logo.logo}
                    alt={logo.name}
                    className="h-6 sm:h-8 md:h-10 w-auto object-contain"
                  />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Animation styles */}
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
            display: flex;
            width: fit-content;
            animation-name: infinite-scroll;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
            will-change: transform;
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




