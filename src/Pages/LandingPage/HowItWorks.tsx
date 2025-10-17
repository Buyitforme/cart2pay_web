import React from "react";
import { Heading, Text } from "../../Components/Typography";
import deliveryMan from "../../Assets/svg_images/delivery.svg";
import request from "../../Assets/svg_images/Request product.svg";
import bag from "../../Assets/svg_images/Request product (1).svg";
import LazyImage from "../../Components/LazyImage";

const HowItWorks = () => {
  return (
    <div className="min-h-screen bg-white pt-8">
      <div className="max-w-[85%] mx-auto ">
        {/* Header */}
        <div className="text-start mb-16 w-full lg:w-1/3">
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
            From sharing a product link to receiving your order, shopping made
            effortless in 3 simple steps.
          </Text>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 lg:col-span-2">
            <div className="flex-1 lg:w-1/2 relative">
              <LazyImage
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
                Copy the product URL from any store Zara, Shein, Fashionva or
                your favorite retailer and send it to us. No complicated forms
                or confusing checkout. Just share the link, and we’ll take it
                from there.
              </Text>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 lg:col-span-2">
            <div className="flex-1 lg:w-1/2 lg:order-2 relative">
              <LazyImage
                src={bag}
                alt="bag"
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
                After receiving your link, our team reviews the order, checks
                items availability, and provides you with a clear cost summary.
                Once you confirm and make payment, we securely complete the
                purchase on your behalf.
              </Text>
            </div>
          </div>

          {/* Step 3 */}
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-16 lg:col-span-2 pb-12">
  <div className="flex-1 lg:w-1/2 relative">
    <LazyImage
      src={deliveryMan}
      alt="delivery man"
      className="w-full h-full object-contain"
    />
    {/* Badge */}
    <div className="absolute top-0 right-0 w-12 h-12 bg-black text-white rounded-lg flex items-center justify-center font-bold text-lg">
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
      Your order ships straight to your door with full tracking. From
      purchase to delivery, you’ll receive real-time updates every
      step of the way fast, reliable, and completely stress-free.
    </Text>
  </div>
</div>

        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
