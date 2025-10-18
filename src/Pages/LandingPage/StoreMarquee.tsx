import { Heading, Text } from "../../Components/Typography";
import zaraLogo from "../../Assets/svg_images/zara2.svg";
import asosLogo from "../../Assets/svg_images/asos.svg";
import sheinLogo from "../../Assets/svg_images/shein.svg";
import primarkLogo from "../../Assets/svg_images/primark.svg";
import fashionovaLogo from "../../Assets/fashionova.jpeg";

import LogoSlider from "../../Components/SliderComponent";

export const storeLogos = [
  { name: "Zara", logo: zaraLogo, url: "https://www.zara.com/" },
  { name: "ASOS", logo: asosLogo, url: "https://www.asos.com/" },
  { name: "Shein", logo: sheinLogo, url: "https://us.shein.com/" },
  { name: "Primark", logo: primarkLogo, url: "https://www.primark.com/en-gb" },
  {
    name: "Fashionova",
    logo: fashionovaLogo,
    url: "https://www.fashionnova.com/",
  },
];

const StoreMarquee = () => {
 
  return (
    <section className="w-full bg-background py-16 pt-24 overflow-hidden">
      <div className="text-center px-4 md:px-0">
        <div className="text-start mb-16">
          <Heading
            as="h1"
            size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
            weight="semibold"
            className="md:leading-tight text-center"
          >
            Stores we support
          </Heading>

          <Text
            size="lg"
            weight="normal"
            className="pt-2 text-[#6B7280] text-center"
          >
            Order items from any of the shops we support{" "}
          </Text>
        </div>

        <div className="relative overflow-hidden">
<LogoSlider />
        </div>
      </div>
    </section>
  );
};

export default StoreMarquee;
