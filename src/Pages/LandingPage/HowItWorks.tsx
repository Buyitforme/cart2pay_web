import React from "react";
import { Heading, Text } from "../../Components/Typography";
import deliveryMan from "../../Assets/svg_images/Request product (2).svg";
import request from "../../Assets/svg_images/Request product.svg";

import bag from "../../Assets/svg_images/Request product (1).svg";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-background py-12 ">
      <div className="max-w-[85%] mx-auto">
        {/* Header */}
        <div className="text-start mb-16">
          <Heading
            as="h1"
            size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
            weight="semibold"
            className="md:leading-tight text-center md:text-start"
          >
            How It Works
          </Heading>

          <Text
            size="lg"
            weight="normal"
            className="pt-2 text-[#6B7280] text-center md:text-start"
          >
            Three simple steps from link to delivery.
          </Text>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 lg:col-span-2">
            <div className="flex-1 lg:w-1/2 relative">
              <img
                src={request}
                alt="delivery man"
                className="w-full h-full object-contain"
              />
              {/* Step number */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                1
              </div>
            </div>

            <div className="flex-1 lg:w-1/2">
              <Heading
                as="h1"
                size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                weight="bold"
                className="md:leading-tight text-center md:text-start"
              >
                Share the{" "}
                <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  product url
                </span>
              </Heading>

              <Text
                size="lg"
                color="secondary"
                weight="normal"
                className="pt-3 text-center md:text-start"
              >
                Simply copy the product URL from any major store, whether it's
                Amazon, Walmart, eBay, or another trusted retailer, and send it
                to us. No complicated forms, no endless checkout processes. Just
                share the link, and you're good to go.
              </Text>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 lg:col-span-2">
            <div className="flex-1 lg:w-1/2 lg:order-2 relative">
              <img
                src={bag}
                alt="delivery man"
                className="w-full h-full object-contain"
              />

              {/* Step number */}
              <div className="absolute top-4 right-4 lg:top-6 lg:left-6 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                2
              </div>
            </div>

            <div className="flex-1 lg:w-1/2 lg:order-1">
              <Heading
                as="h1"
                size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                weight="bold"
                className="md:leading-tight text-center md:text-start"
              >
                We handle{" "}
                <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  the purchase
                </span>{" "}
                for you
              </Heading>

              <Text
                size="lg"
                color="secondary"
                weight="normal"
                className="pt-3 text-center md:text-start"
              >
                Once you've shared the product link, our trusted admins step in
                to make the purchase securely on your behalf. You don't have to
                worry about payment gateways, international cards, or hidden
                fees — we handle it all with guaranteed protection and
                transparency.
              </Text>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 lg:col-span-2">
            <div className="flex-1 lg:w-1/2 relative">
              <img
                src={deliveryMan}
                alt="delivery man"
                className="w-full h-full object-contain"
              />
              {/* Badge */}
              <div className="absolute top-4 right-4 lg:top-6 lg:right-6 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
                3
              </div>
            </div>

            <div className="flex-1 lg:w-1/2">
              <Heading
                as="h1"
                size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                weight="bold"
                className="md:leading-tight text-center md:text-start"
              >
                Get fast,{" "}
                <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  tracked delivery
                </span>{" "}
                to your{" "}
                <span className="md:pt-2 inline-block font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  door step
                </span>
              </Heading>

              <Text
                size="lg"
                color="secondary"
                weight="normal"
                className="pt-3 text-center md:text-start"
              >
                After purchase, your item is shipped directly to you with
                end-to-end delivery tracking. From the moment your order is
                placed until it arrives at your door, you'll know exactly where
                your product is. Fast, reliable, and stress-free delivery — just
                the way shopping should be.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
