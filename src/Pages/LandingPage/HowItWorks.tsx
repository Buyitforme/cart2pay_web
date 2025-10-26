import { Heading, Text } from "../../Components/Typography";
import deliveryMan from "../../Assets/svg_images/delivery.svg";
import request from "../../Assets/svg_images/Request product.svg";
import bag from "../../Assets/svg_images/Request product (1).svg";
import { StepImage } from "../HIWSteps";

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
        <div className="grid grid-cols-1 gap-12 lg:gap-20">
          {/* Step 1 */}
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16">
            <StepImage src={request} alt="product request" stepNumber={1} />
            <div className="flex-1 text-center lg:text-left">
              <Heading
                as="h1"
                size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                weight="bold"
                className="md:leading-tight"
              >
                Share the{" "}
                <span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  product url
                </span>
              </Heading>
              <Text
                size="lg"
                color="secondary"
                className="pt-3 font-[400] text-text-secondary"
              >
                Copy the product URL from any store like Zara, Shein,
                Fashionnova or your favorite retailer and send it to us. No
                complicated forms, just share the link and we’ll take it from
                there.
              </Text>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col lg:flex-row-reverse items-center lg:justify-between gap-8 lg:gap-16">
            <StepImage src={bag} alt="shopping bag" stepNumber={2} />
            <div className="flex-1 text-center lg:text-left">
              <Heading
                as="h1"
                size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                weight="bold"
                className="md:leading-tight"
              >
                We handle{" "}
                <span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  the purchase
                </span>{" "}
                for you
              </Heading>
              <Text
                size="lg"
                color="secondary"
                className="pt-3 font-[400] text-text-secondary"
              >
                After receiving your link, our team reviews the order, checks
                availability, and gives you a clear cost summary. Once you
                confirm and make payment, we complete the purchase securely on
                your behalf.
              </Text>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col lg:flex-row items-center lg:justify-between gap-8 lg:gap-16 pb-12">
            <StepImage src={deliveryMan} alt="delivery man" stepNumber={3} />
            <div className="flex-1 text-center lg:text-left">
              <Heading
                as="h1"
                size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
                weight="bold"
                className="md:leading-tight"
              >
                Get fast,{" "}
                <span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  tracked delivery
                </span>{" "}
                to your{" "}
                <span className="font-bold bg-gradient-to-r from-secondary to-primary bg-clip-text text-transparent">
                  doorstep
                </span>
              </Heading>
              <Text
                size="lg"
                color="secondary"
                className="pt-3 font-[400] text-text-secondary"
              >
                Your order ships straight to your door with full tracking. From
                purchase to delivery, you’ll receive real-time updates every
                step of the way — fast, reliable, and stress-free.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
