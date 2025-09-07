import frame1 from "../../Assets/svg_images/Frame 44 (1).svg";
import frame2 from "../../Assets/svg_images/Frame 44.svg";
import frame3 from "../../Assets/svg_images/Frame 45 (1).svg";
import frame4 from "../../Assets/svg_images/Frame 45.svg";
import { Heading, Text } from "../../Components/Typography";
import { useNavigate } from "react-router-dom";

const Cart2payEssentials = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white py-8 md:py-11 lg:py-16 ">
      <div className="max-w-[85%] mx-auto">
        {/* Header with dotted border */}
        <div className="relative lg:mb-16">
          {/* Main dotted border container */}
          <div className=" rounded-none p-8 md:p-12 bg-transparent relative">
            <div className="text-start md: mb-6 lg:mb-8">
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
                weight="light"
                className="pt-2 text-[#6B7280] text-center"
              >
                Designed to remove friction at every step.{" "}
              </Text>
            </div>
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-16">
          {/* Easy to use */}
          <div className="text-center  ">
            <div className="mb-8 flex justify-center lg:border-r-2  lg:border-primary_light">
              <img src={frame4} alt="image" />
            </div>

            <Text
              size="xl"
              weight="semibold"
              color="primary"
              className="pt-2  text-center"
            >
              Easy to use
            </Text>

            <Text
              size="lg"
              weight="light"
              color="secondary"
              className="pt-2  text-center"
            >
              Paste a link and confirm.
              <br />
              That's it.
            </Text>
          </div>

          {/* Admin-handled checkout */}
          <div className="text-center">
            <div className="mb-8 flex justify-center lg:border-r-2  lg:border-primary_light">
              <img src={frame3} alt="image" />
            </div>

            <Text
              size="xl"
              weight="semibold"
              color="primary"
              className="pt-2  text-center"
            >
              Admin-handled checkout
            </Text>

            <Text
              size="lg"
              weight="light"
              color="secondary"
              className="pt-2  text-center"
            >
              Real people complete
              <br />
              checkout accurately.
            </Text>
          </div>

          {/* Secure payments */}
          <div className="text-center">
            <div className="mb-8 flex justify-center lg:border-r-2  lg:border-primary_light">
              <img src={frame2} alt="image" />
            </div>

            <Text
              size="xl"
              weight="semibold"
              color="primary"
              className="pt-2  text-center"
            >
              Secure payments
            </Text>

            <Text
              size="lg"
              weight="light"
              color="secondary"
              className="pt-2  text-center"
            >
              Protected transactions
              <br />
              with trusted providers.
            </Text>
          </div>

          {/* Fast delivery */}
          <div className="text-center">
            <div className="mb-8 flex justify-center">
              <img src={frame1} alt="image" />
            </div>

            <Text
              size="xl"
              weight="semibold"
              color="primary"
              className="pt-2  text-center"
            >
              Fast delivery
            </Text>

            <Text
              size="lg"
              weight="light"
              color="secondary"
              className="pt-2  text-center"
            >
              Expedited shipping
              <br />
              options
              <br />
              available.
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart2payEssentials;
