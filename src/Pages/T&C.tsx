import React from "react";
import { Heading, Text } from "../Components/Typography";

const TermsAndConditions = () => {
  const data = [
    {
      id: "introduction",
      title: "Introduction",
      content: [
        "Welcome to our Personal Shopper platform. By using our website, you agree to these Terms and Conditions. Please read them carefully before using our services.",
      ],
    },
    {
      id: "service-overview",
      title: "Service Overview",
      content: [
        "ShopViaCal is a personal shopping service. We act as a facilitator between you and the vendor, helping you place, track, and receive your orders conveniently.",
      ],
    },

    {
      id: "user-eligibility",
      title: "User Eligibility",
      content: [
        "You must be at least 18 years old or have parental consent to use our platform. You agree to provide accurate, complete, and up-to-date information when creating an account or placing an order.",
      ],
    },
    {
      id: "account-responsibility",
      title: "Account Responsibility",
      content: [
        "You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. Notify us immediately if you suspect unauthorized use of your account.",
      ],
    },
    {
      id: "orders-and-payments",
      title: "Orders and Payments",
      content: [
        "All orders are subject to vendor availability and confirmation. Prices, delivery fees, and taxes are clearly displayed at checkout. Payments must be made through approved methods on our platform. We reserve the right to cancel or refuse orders that appear fraudulent or invalid.",
      ],
    },
    {
  id: "pricing-and-fees",
  title: "Pricing & Fees",
  content: [
    "Product prices and shipping costs are determined by the respective vendors, not by ShopViaCal.",
    "Our service charge is separate and covers the personal shopping, order processing, and delivery coordination services we provide.",
    "Any changes in vendor prices, discounts, or promotions are beyond our control and will reflect directly on your final checkout cost.",
  ],
},

    {
      id: "returns-and-refunds",
      title: "Returns & Refunds",
      content: [
        "As a personal shopping service, we do not hold inventory or manufacture products. All items are purchased directly from third-party vendors or retailers based on the product links shared by YOU.",
        "We are not responsible for product quality issues, damages, or defects that originate from the vendor (e.g., Zara, Shein, etc.). Customers are advised to review vendor policies before selecting products.",
        "Refunds are only issued if an item becomes unavailable or sold out by the time we attempt to complete the purchase after your payment. In such cases, we will immediately refund the full amount to your original payment method.",
        "Once an order is successfully placed with the vendor, it cannot be canceled, exchanged, or refunded through us. All post-purchase concerns should be directed to the vendor in accordance with their return or refund policy.",
      ],
    },

    {
      id: "delivery-policy",
      title: "Delivery Policy",
      content: [
        "Estimated delivery times are provided by vendors and may vary based on location, item availability, and external factors like weather or logistics delays.",
        "We are not liable for delays beyond our control but work closely with vendors to ensure timely delivery.",
      ],
    },
    {
      id: "user-conduct",
      title: "User Conduct",
      content: [
        "You agree not to misuse the platform, impersonate others, post false information, or engage in any unlawful activity. Violation of these rules may result in suspension or termination of your account.",
      ],
    },
    {
      id: "liability-limitation",
      title: "Limitation of Liability",
      content: [
        "We act solely as an intermediary between customers and vendors. We are not responsible for product defects, vendor errors, or third-party service delays. However, we'll assist in resolving any disputes promptly and fairly.",
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      content: [
        "All content, branding, logos, and materials on our platform are protected by intellectual property laws and may not be used without prior permission.",
      ],
    },
    {
      id: "updates-to-terms",
      title: "Updates to Terms",
      content: [
        "We may update these Terms and Conditions periodically to reflect service changes or legal requirements. Continued use of our platform after updates constitutes acceptance of the revised terms.",
      ],
    },
    {
      id: "contact-us",
      title: "Contact Us",
      content: [
        "If you have questions or complaints about these Terms, please contact our support team through the Help section in the website or via email.",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background pt-8">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Heading
            as="h1"
            size={{ sm: "xl", base: "xl", md: "2xl", lg: "3xl" }}
            weight="bold"
            className="mb-4"
          >
            Terms of <span className="">Service</span>
          </Heading>
          <Text size="sm" className="text-gray-400">
            Last Updated: October 19, 2025
          </Text>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-6xl mx-auto px-4 md:px-8 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-3 shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-lg py-4">
            <div className="sticky top-24 space-y-2">
              {data.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className="block px-4 py-2 text-sm text-gray-400 hover:text-primary  rounded-lg transition-all duration-200"
                >
                  {section.title}
                </a>
              ))}
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-9 space-y-12">
            {data.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-2xl p-4 md:p-8 border border-white/10 hover:border-primary transition-all duration-300">
                  <Heading
                    as="h2"
                    size={{ sm: "lg", base: "lg", md: "2xl" }}
                    weight="bold"
                    className="mb-6 text-text-primary"
                  >
                    {section.title}
                  </Heading>

                  <div className="space-y-4">
                    {section.content.map((paragraph, index) => (
                      <Text
                        key={index}
                        size={{ base: "sm" }}
                        weight="normal"
                        className="text-text-secondary leading-relaxed"
                      >
                        {paragraph}
                      </Text>
                    ))}
                  </div>
                </div>
              </section>
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;
