import frame1 from "../../Assets/svg_images/Frame 44 (1).svg";
import frame2 from "../../Assets/svg_images/Frame 44.svg";
import frame3 from "../../Assets/svg_images/Frame 45 (1).svg";
import frame4 from "../../Assets/svg_images/Frame 45.svg";
import { Heading, Text } from "../../Components/Typography";

const Cart2payEssentials = () => {

  return (
  <div className="bg-white py-8 md:py-11 lg:py-16">
    <div className="max-w-[85%] mx-auto">
      {/* Header */}
      <div className="relative lg:mb-16">
        <div className="rounded-none  md:p-12 bg-transparent relative">
          <div className="text-start mb-6 lg:mb-8">
            <Heading
              as="h1"
              size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
              weight="semibold"
              className="md:leading-tight text-center"
            >
              Our Unique Benefits
            </Heading>

            <Text
              size="lg"
              weight="normal"
              className="pt-2 text-[#6B7280] text-center"
            >
              Built to simplify shopping, ensure security, and deliver peace of mind.{" "}
            </Text>
          </div>
        </div>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
        {/* Easy to use */}
        <div className="text-center">
          <div className="mb-8 flex justify-center lg:border-r-2 lg:border-primary_light">
            <img src={frame4} alt="Easy to use" />
          </div>

          <Text
            size="xl"
            weight="semibold"
            color="primary"
            className="pt-2 text-center"
          >
            Easy to Use
          </Text>

          <Text
            size="lg"
            weight="light"
            color="secondary"
            className="pt-2 text-center"
          >
            Just paste your product link, confirm, and relax.
            
            We’ll handle the rest.
          </Text>
        </div>

        {/* Admin-handled checkout */}
        <div className="text-center">
          <div className="mb-8 flex justify-center lg:border-r-2 lg:border-primary_light">
            <img src={frame3} alt="Admin handled checkout" />
          </div>

          <Text
            size="xl"
            weight="semibold"
            color="primary"
            className="pt-2 text-center"
          >
            Checkout Done for You
          </Text>

          <Text
            size="lg"
            weight="light"
            color="secondary"
            className="pt-2 text-center"
          >
            Our team completes checkout on your behalf
           
            accurate, stress-free, and reliable.
          </Text>
        </div>

        {/* Secure payments */}
        <div className="text-center">
          <div className="mb-8 flex justify-center lg:border-r-2 lg:border-primary_light">
            <img src={frame2} alt="Secure payments" />
          </div>

          <Text
            size="xl"
            weight="semibold"
            color="primary"
            className="pt-2 text-center"
          >
            Secure Payments
          </Text>

          <Text
            size="lg"
            weight="light"
            color="secondary"
            className="pt-2 text-center"
          >
            Pay safely with trusted providers.
            <br />
            Your money is always protected.
          </Text>
        </div>

        {/* Fast delivery */}
        <div className="text-center">
          <div className="mb-8 flex justify-center">
            <img src={frame1} alt="Fast delivery" />
          </div>

          <Text
            size="xl"
            weight="semibold"
            color="primary"
            className="pt-2 text-center"
          >
            Fast Delivery
          </Text>

          <Text
            size="lg"
            weight="light"
            color="secondary"
            className="pt-2 text-center"
          >
            Get your items quickly with
            <br />
            reliable shipping and tracking.
          </Text>
        </div>
      </div>
    </div>
  </div>
);

};

export default Cart2payEssentials;
