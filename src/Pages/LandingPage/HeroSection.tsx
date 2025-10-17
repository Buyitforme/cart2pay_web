import { Button } from "../../Components/Button";
import happyShopper from "../../Assets/svg_images/hero_image.svg";
import { Heading, Text } from "../../Components/Typography";
import { useNavigate } from "react-router-dom";
import {
  Clock,
  CreditCard,
  Globe2,
  Play,
  Rocket,
  ShoppingBag,
  Zap,
} from "lucide-react";
import type { TypedObject } from "@portabletext/types";
import { useEffect, useState } from "react";
import { client } from "../../sanityClient";
import { PortableText } from "@portabletext/react";
import LazyImage from "../../Components/LazyImage";
import React from "react";

interface HeroSectionProps {
  onExploreClick?: () => void;
}
export interface HeroSectionTypes {
  title: TypedObject[];
  description: string;
  image: string;
}
const query = `*[_type == "heroSection"][0]{
  title,
  description,
  "image": image.asset->url
}`;

const features = [
  {
    icon: <ShoppingBag className="w-8 h-8 text-primary_dark" />,
    title: "Shop globally",
    text: "Access authentic fashion, beauty, and lifestyle items from Zara, ASOS, Amazon US, and more brands not easily found locally.",
  },
  {
    icon: <CreditCard className="w-8 h-8 text-primary_dark" />,
    title: "Flexible payment options",
    text: "No international payment issues. Pay in your local currency using familiar payment methods that actually work.",
  },
  {
    icon: <Clock className="w-8 h-8 text-primary_dark" />,
    title: "Done in minutes",
    text: "Skip hours of browsing multiple websites, comparing prices, and tracking shipments. We handle it all for you.",
  },
];

const HeroSection = ({ onExploreClick }: HeroSectionProps) => {
  const [heroSection, setHeroSection] = useState<HeroSectionTypes>();
  //  useEffect(() => {
  //    const fetchHeroSection = async () => {
  //   try {
  //     if (!query) {
  //       console.error("Query is undefined or null");
  //       return;
  //     }
  //     const data = await client.fetch(query);
  //     setHeroSection(data);
  //   } catch (error) {
  //     console.error("Error fetching heroSection:", error);
  //   }
  // };
  //     fetchHeroSection();
  //   }, []);
  //   console.log("HS", heroSection);

  const navigate = useNavigate();
  return (
    <div>
      <div className="relative bg-gradient-to-br from-slate-100 via-blue-50 to-blue-200 pt-16 lg:pt-8">
        <div className="max-w-[85%] mx-auto grid lg:grid-cols-2 gap-4 lg:gap-8 items-center">
          {/* Left Content */}
          <div className="pt-8 lg:pt-0 space-y-4">
            <div>
              <Heading
                as="h1"
                size={{ sm: "xl", base: "3xl", md: "4xl", lg: "5xl" }}
                weight="bold"
                className="md:leading-tight  md:text-start leading-snug"
              >
                {/* {heroSection?.title && <PortableText value={heroSection.title} />} */}
                Your digital concierge for all things{" "}
                <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-[#054B2F] to-[#0CB16F] bg-clip-text text-transparent pb-1">
                  shopping
                </span>
              </Heading>
            </div>

            <Text
              size="lg"
              color="secondary"
              weight="extra_light"
              className=" "
            >
              Your personal shopping assistant at your fingertips. From rare
              finds to everyday essentials, we make shopping simple, fast, and
              stress-free, so you shop more and worry less.{" "}
            </Text>

            <div className="flex justify-start items-center gap-4 pt-4">
              <Button
                variant="primary"
                icon={<Rocket className="w-5 h-5" />}
                className="w-full text-sm sm:text-base py-2 sm:my-3"
                onClick={() => navigate("/dashboard/new-order")}
              >
                Shop for me
              </Button>

              <Button
                variant="secondary"
                icon={<Play className="w-5 h-5" />}
                className="w-full text-sm sm:text-base py-2 sm:py-3 bg-[#E8F7F0] text-secondary hover:bg-secondary"
                onClick={() => navigate("/how-it-works")}
              >
                How it works
              </Button>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative flex justify-center lg:justify-end">
            <div className="relative z-10 w-full lg:w-auto">
              <LazyImage
                src={happyShopper}
                alt="img"
                className="rounded-2xl w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <section className="relative -mt-4 pb-16 lg:pb-20 z-40 bg-transparent">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Cards Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <div
                key={index}
                className="relative bg-white rounded-3xl border-2 border-gray-200 p-6 hover:shadow-lg transition-shadow duration-300 flex flex-col shadow-md"
              >
                {/* Icon & Content Row */}
                <div className="flex gap-4 mb-2">
                  {/* Icon */}
                  <div className="w-14 h-14 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    {React.cloneElement(feature.icon, {
                      className: "w-7 h-7 text-primary_dark",
                    })}
                  </div>

                  {/* Title & Description */}
                  <div className="flex flex-col flex-grow">
                    <Heading
                      as="h3"
                      size="lg"
                      weight="semibold"
                      className="text-gray-900 mb-1"
                    >
                      {feature.title}
                    </Heading>

                    {/* Description */}
                    <Text
                      size="sm"
                      weight="normal"
                      className="text-gray-600 leading-relaxed mb-2 flex-grow"
                    >
                      {feature.text}
                    </Text>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
