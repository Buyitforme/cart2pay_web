import { useState } from "react";
import {
  Link,
  CreditCard,
  Truck,
  Package,
  Bell,
  Zap,
  Headphones,
  X,
} from "lucide-react";
import { Button } from "../Components/Button";
import { stores } from "./data";
import { Heading, Text } from "../Components/Typography";
import { useNavigate } from "react-router-dom";
import { AnimatedSection } from "./LandingPage/LandingPageMain";
import happy_shopper from "../Assets/fashion.jpeg";
import beauty from "../Assets/brushes.jpeg";
import LazyImage from "../Components/LazyImage";
import routeNames from "../Navigation/RouteNames";

interface SupportedStoresProps {
  isOpen: boolean;
  onClose: any;
}

const SupportedStoresModal = ({ isOpen, onClose }: SupportedStoresProps) => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState<
    "Fashion" | "Beauty" | null
  >(null);

  if (!isOpen) return null;

  const filteredStores = stores.filter((s) => s.category === selectedCategory);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto ">
        <div className="m-4 rounded-lg p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <Heading size="2xl" weight="bold" className="text-gray-900 mb-2">
                {selectedCategory
                  ? `${selectedCategory} Stores`
                  : "Stores We Support"}
              </Heading>
              <Heading size="md" weight="normal" className="text-gray-600">
                {selectedCategory
                  ? "Explore the supported stores in this category"
                  : "Choose a category to explore supported stores"}
              </Heading>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-colors"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Category or Store View */}
          {!selectedCategory ? (
            // CATEGORY CARDS
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {[
                { title: "Fashion & accessories", img: happy_shopper },
                { title: "Beauty & Cosmetics", img: beauty },
              ].map((category) => (
                <div
                  key={category.title}
                  onClick={() =>
                    setSelectedCategory(
                      category.title.startsWith("Fashion")
                        ? "Fashion"
                        : "Beauty"
                    )
                  }
                  className="cursor-pointer border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                >
                  <LazyImage
                    src={category.img}
                    alt={category.title}
                    className="w-full h-40 object-cover"
                  />

                  <div className="p-4 text-center">
                    <Heading
                      size="lg"
                      weight="semibold"
                      className="text-gray-800"
                    >
                      {category.title}
                    </Heading>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // STORE LIST VIEW
            <>
              {filteredStores.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 mb-8 justify-center items-center">
                  {filteredStores.map((store, index) => (
                    <a
                      key={index}
                      href={store.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex justify-center items-center p-4 rounded-lg hover:shadow-md transition-shadow border border-gray-100 bg-white"
                    >
                      <LazyImage
                        src={store.icon}
                        alt={store.name}
                        className="w-20 h-auto object-contain"
                      />
                    </a>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic mb-8 text-center">
                  No store at the moment.
                </p>
              )}

              {/* Back Button */}
              <Button
                variant="primary"
                className="w-auto px-6"
                // className="text-gray-700 border-gray-300"
                onClick={() => setSelectedCategory(null)}
              >
                Back to catogires
              </Button>
            </>
          )}
        </div>

        <div className="mx-4 mb-4 rounded-lg p-6 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <Heading
              size={{ sm: "sm", md: "lg" }}
              weight="normal"
              className="text-gray-600"
            >
              Do you have questions?
            </Heading>
            <Button
              variant="secondary"
              className="w-auto px-6"
              onClick={() => navigate(routeNames.contactUs)}
            >
              <Headphones className="w-4 h-4" />
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const HowItWorksSection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <AnimatedSection>
      <section className="bg-white py-16 px-4 sm:px-6 lg:px-8 pt-24 lg:pt-32">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <Heading
              as="h1"
              size={{ base: "lg", md: "xl", lg: "2xl" }}
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
              From sharing a product link to receiving your order, shopping
              made effortless in 3 simple steps.
            </Text>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Service Details */}
            <div className="space-y-8">
              {/* Average Time Card */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-[#E8F7F0] rounded-lg flex items-center justify-center">
                    <Zap className="w-5 h-5 text-[#054B2F]" />
                    
                  </div>
                  <div>
                    <Heading
                      size="lg"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Average time to review order
                    </Heading>
                    <Heading
                      size="sm"
                      weight="normal"
                      className="text-gray-600"
                    >
                      30 minutes - 1 hour
                    </Heading>
                  </div>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate("/dashboard/new-order")}
                >
                  Get Started
                </Button>
              </div>

              {/* Security Badge */}

              {/* Pricing Table */}
              <div className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <Heading
                      size="md"
                      weight="medium"
                      className="text-gray-900"
                    >
                      Service fee
                    </Heading>
                    <Heading
                      size="md"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      Flat rate
                    </Heading>
                  </div>

                  <div className="flex justify-between items-center">
                    <Heading
                      size="md"
                      weight="medium"
                      className="text-gray-900"
                    >
                      Delivery
                    </Heading>
                    <Heading
                      size="md"
                      weight="semibold"
                      className="text-gray-900"
                    >
                      At carrier rates
                    </Heading>
                  </div>

                  <div className="pt-4 border-t">
                    <Heading
                      size="sm"
                      weight="normal"
                      className="text-gray-600"
                    >
                      Cost break down shown before you confirm.
                    </Heading>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column - Steps */}
            <div className="space-y-8">
              {/* Step 1 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#E8F7F0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Link className="w-5 h-5 text-[#054B2F]" />
                </div>
                   
                <div className="flex-1">
                  <Heading
                    size="xl"
                    weight="semibold"
                    className="text-gray-900 mb-2"
                  >
                    1. Paste the product link
                  </Heading>
                  <Heading
                    size="md"
                    weight="normal"
                    className="text-gray-600 mb-4"
                  >
                    Copy the product link from any major store (Zara, Fashion
                    Nova, Shein, etc.), share it with us, and add your shipping
                    address.
                  </Heading>

                  <div className="flex justify-between items-center mb-4">
                    {/* <Heading size="sm" weight="normal" className="text-gray-600">
                    Works with most retailers
                  </Heading> */}
                    <button
                      className="text-[#054B2F] text-sm font-medium hover:underline"
                      onClick={() => setIsModalOpen(true)}
                    >
                      See supported sites
                    </button>
                  </div>

                  {/* <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2">
                  <Link className="w-4 h-4 text-gray-400" />
                  <Heading size="sm" weight="normal" className="text-gray-500">
                    https://store.com/product/your-item
                  </Heading>
                </div> */}
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#E8F7F0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <CreditCard className="w-5 h-5 text-[#054B2F]" />
                </div>
                <div className="flex-1">
                  <Heading
                    size="xl"
                    weight="semibold"
                    className="text-gray-900 mb-2"
                  >
                    2. We purchase on your behalf
                  </Heading>
                  <Heading size="md" weight="normal" className="text-gray-600">
                    Our team confirms stock availability, applies discounts if
                    available, and provides you with a full cost breakdown. Once
                    you confirm payment, we’ll make the purchase for you.
                  </Heading>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-[#E8F7F0] rounded-lg flex items-center justify-center flex-shrink-0">
                  <Package className="w-5 h-5 text-[#054B2F]" />
                </div>
                <div className="flex-1">
                  <Heading
                    size="xl"
                    weight="semibold"
                    className="text-gray-900 mb-2"
                  >
                    3. Tracked delivery to your door
                  </Heading>
                  <Heading
                    size="md"
                    weight="normal"
                    className="text-gray-600 mb-4"
                  >
                    We’ll ship your order straight to your door with full
                    tracking and updates along the way. Plus, our support team
                    is here if you need help.
                  </Heading>

                  <div className="flex justify-between items-center mb-4">
                    <Heading
                      size="sm"
                      weight="normal"
                      className="text-gray-600"
                    >
                      Have questions
                    </Heading>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => navigate("/contact-us")}
                    >
                      Contact support
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Truck className="w-4 h-4 text-gray-500" />
                      <Heading
                        size="sm"
                        weight="medium"
                        className="text-gray-700"
                      >
                        Expedited options available
                      </Heading>
                    </div>

                    <div className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-gray-500" />
                      <Heading
                        size="sm"
                        weight="medium"
                        className="text-gray-700"
                      >
                        Notifications for each milestone
                      </Heading>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <SupportedStoresModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </section>
    </AnimatedSection>
  );
};

export default HowItWorksSection;
