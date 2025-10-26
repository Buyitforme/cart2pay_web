import { storeLogos } from "../Pages/LandingPage/StoreMarquee";
import LazyImage from "./LazyImage";
import Marquee from "react-fast-marquee";

const LogoSlider = () => {
  return (
    <div className="w-full bg-white py-8 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
        <Marquee
          speed={50}
          gradient={false}
          pauseOnHover={true}
          className="flex items-center"
        >
          {storeLogos.map((logo, idx) => (
            <div
              key={idx}
              className="grayscale hover:grayscale-0 transition-all duration-300 opacity-60 hover:opacity-100 mx-4 sm:mx-12"
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
                  className="h-8 sm:h-10 md:h-12 w-auto object-contain"
                />
              </a>
            </div>
          ))}
        </Marquee>
      </div>
    </div>
  );
};

export default LogoSlider;
