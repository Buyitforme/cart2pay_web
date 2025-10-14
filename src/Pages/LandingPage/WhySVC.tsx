import React from "react";
import { Globe2, CreditCard, ShoppingBag} from "lucide-react";
import { Heading, Text } from "../../Components/Typography";

const WhySVC = () => {
  const features = [
    {
      icon: <ShoppingBag className="w-8 h-8 text-green-700" />,
      title: "Can’t buy from your favorite brands?",
      text: "We help you shop from stores that don’t ship to your country, from Zara to Shein, and more.",
    },
    {
      icon: <CreditCard className="w-8 h-8 text-green-700" />,
      title: "Payment methods always failing?",
      text: "Pay easily in your local currency using familiar options, no international card issues.",
    },
    {
      icon: <Globe2 className="w-8 h-8 text-green-700" />,
      title: "Shipping too stressful or expensive?",
      text: "We manage delivery from checkout to your doorstep, transparent and reliable.",
    },
  ];

  return (
    <section className="min-h-fit bg-white py-16 lg:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="pt-8 lg:pt-0 space-y-4 w-full flex flex-col items-center text-center">
          <Heading
            as="h1"
            size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
            weight="bold"
            className="md:leading-tight "
          >
            Why Shopviacal?
          </Heading>

          <Text
            size="lg"
            weight="normal"
            className="max-w-2xl text-center text-[#6B7280]"
          >
            Because shopping shouldn’t be stressful. We make global shopping
            simple, safe, and seamless, so you can buy what you love, wherever
            it’s from.
          </Text>
        </div>

        {/* Cards Grid */}
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl border-2 border-gray-200 p-8 hover:shadow-lg transition-shadow duration-300 flex flex-col"
            >
              {/* Top Border Accent */}
              <div className="absolute top-0 left-8 right-8 h-1 bg-gradient-to-r from-secondary_dark to-secondary rounded-b-md"></div>

              {/* Icon */}
              <div className="flex justify-start mb-6 pt-4">
                <div className="w-14 h-14 bg-secondary rounded-lg flex items-center justify-center">
                  {React.cloneElement(feature.icon, {
                    className: "w-7 h-7 text-white",
                  })}
                </div>
              </div>

              {/* Title */}
              <Heading
                as="h3"
                size="lg"
                weight="semibold"
                className="text-gray-900 mb-3"
              >
                {feature.title}
              </Heading>

              {/* Description */}
              <Text
                size="sm"
                weight="normal"
                className="text-gray-600 leading-relaxed mb-6 flex-grow"
              >
                {feature.text}
              </Text>

              {/* Left Border Bracket */}
              <div className="absolute left-0 top-16 bottom-8 w-1 border-l-2 border-t-2 border-b-2 border-secondary rounded-tl-2xl rounded-bl-2xl"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhySVC;
