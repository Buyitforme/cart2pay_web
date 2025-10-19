import React from "react";
import { Heading, Text } from "../Components/Typography";
import { AnimatedSection } from "./LandingPage/LandingPageMain";

const Privacy = () => {
  const sections = [
    {
      id: "Data-collection",
      title: "Data Collection",
      content: [
        "We collect personal information that you provide to us directly when using our platform, such as name, email, and any other data you submit through forms or account creation. Additionally, we gather information automatically through cookies, log data, and analytics tools",
      ],
    },
    {
      id: "data-usage",
      title: "How We Use Your data",
      content: [
        "We use the information we collect to process your orders, personalize your shopping experience, communicate important updates and offers, improve our services, and maintain security and legal compliance",
      ],
    },
    {
      id: "data-sharing",
      title: "How We Share Your data",
      content: [
        "We never sell your personal data. We only share information with trusted partners like vendors, delivery services, payment processors, and service providers to fulfill your orders, and with legal authorities when required by law",
      ],
    },
    {
      id: "data-security",
      title: "Data Security",
      content: [
        "We protect your data with SSL/TLS encryption, secure servers, firewalls, and restricted access controls. Our systems are regularly audited and updated. However, no online platform can guarantee absolute security against all evolving cyber threats. We encourage you to use strong passwords to further protect your account",
      ],
    },
    {
      id: "choices-and-rights",
      title: "Your Choices & Rights",
      content: [
        "You have full control over your personal information, including the right to view, modify, or delete your data and opt out of promotional messages",
      ],
    },
    {
      id: "date-retention",
      title: "Data Retention",
      content: [
        "We retain your data only as long as necessary to provide our Services, comply with legal requirements, or resolve disputes.",
      ],
    },
  ];

  return (
    <AnimatedSection>
    <div className="min-h-screen bg-background pt-8">
      {/* Hero Section */}
      <div className="relative pt-20 pb-16 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-96 h-96  rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96  rounded-full blur-3xl"></div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 md:px-8 text-center">
          <Heading
            as="h1"
            size={{ sm: "xl", base: "2xl", md: "2xl", lg: "3xl" }}
            weight="bold"
            className="mb-4"
          >
            Privacy <span className="">Policy</span>
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
          <aside className="lg:col-span-3 rounded-lg py-4 shadow-[0_0_20px_rgba(0,0,0,0.1)]">
            <div className="sticky top-24 space-y-2">
              {sections.map((section) => (
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
            {sections.map((section) => (
              <section
                key={section.id}
                id={section.id}
                className="scroll-mt-24"
              >
                <div className="bg-white/5 backdrop-blur-sm shadow-[0_0_20px_rgba(0,0,0,0.1)] rounded-2xl p-6 md:p-8 border border-white/10 hover:border-primary transition-all duration-300">
                  <Heading
                    as="h2"
                    size={{ sm: "lg", base: "lg", md: "xl" }}
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
    </AnimatedSection>
  );
};

export default Privacy;
