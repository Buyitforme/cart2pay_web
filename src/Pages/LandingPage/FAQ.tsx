import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";
import { Heading, Text } from "../../Components/Typography";

const faqs = [
  {
    question: "How does ShopViaCal work?",
    answer:
      "See something you like from an international store? Send us your the item(s), the admin reviews the items avalaibility and let you know all cost applied, You securely pay for the sum the sum total and we’ll handle the purchase for you. Simple, secure, and fast.",
  },

  {
    question: "Is ShopViaCal available in my country?",
    answer:
      "ShopViaCal is expanding fast! Currently, we only cover Nigeria, More locations coming soon!.",
  },
  {
    question: "Are my payments secure?",
    answer:
      "Absolutely. We use industry standard encryption and partner with trusted payment gateways to ensure every transaction is safe.",
  },
  {
    question: "Can I track my orders?",
    answer:
      "Currently, ShopViaCal focuses exclusively on handling your payment securely. Once your payment is completed, you’ll receive a receipt via email. All orders are fulfilled using the shipping address you provided during checkout.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-white py-16 px-6 md:px-12">
      <div></div>
      <div className="max-w-4xl mx-auto">
        <div className="text-start mb-16">
          <Heading
            as="h1"
            size={{ sm: "lg", base: "2xl", md: "3xl", lg: "4xl" }}
            weight="semibold"
            className="md:leading-tight text-center"
          >
            FAQ
          </Heading>

          <Text
            size="lg"
            weight="light"
            className="pt-2 text-[#6B7280] text-center"
          >
            Find quick answers to common questions about how our service works,
            from orders to delivery{" "}
          </Text>
        </div>

        <div className="space-y-8  ">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-border py-4 px-6 rounded-full bg-background">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleOpen(index)}
              >
                <Text size="md"
                color="primary"
            weight="light"
            className="">
                  {faq.question}
                </Text>
                <span className="bg-gray-100 rounded-full p-2 transition">
                  {openIndex === index ? (
                    <Minus size={18} className="text-gray-700" />
                  ) : (
                    <Plus size={18} className="text-gray-700" />
                  )}
                </span>
              </button>

              <div
                className={cn(
                  "mt-2 text-gray-600 text-sm transition-all duration-300 ease-in-out",
                  openIndex === index
                    ? "max-h-screen opacity-100"
                    : "max-h-0 overflow-hidden opacity-0"
                )}
              >
                <Text size="sm" weight="normal" color="subtle">
                  {faq.answer}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faq;
