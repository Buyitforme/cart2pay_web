import React, { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { cn } from "../../lib/utils";
import { Heading, Text } from "../../Components/Typography";

const faqs = [
  {
    question: "How does Cart2Pay work?",
    answer:
      "See something you like from an international store? Send us your cart details, pay the local currency equivalent, and we’ll handle the currency conversion and complete the international checkout for you. Simple, secure, and fast.",
  },

  {
    question: "Is Cart2Pay available in my country?",
    answer:
      "Cart2Pay is expanding fast! Currently, we only cover Nigeria, More locations coming soon!.",
  },
  {
    question: "Are my payments secure?",
    answer:
      "Absolutely. We use industry standard encryption and partner with trusted payment gateways to ensure every transaction is safe.",
  },
  {
    question: "Can I track my orders?",
    answer:
      "Currently, Cart2Pay focuses exclusively on handling your payment securely. Once your payment is completed, you’ll receive a receipt via email. All orders are fulfilled using the shipping address you provided during checkout.",
  },
];

const Faq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleOpen = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="w-full bg-background py-16 px-6 md:px-12">
      <div>
    
      </div>
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <Heading
            size="xl"
            weight="bold"
            color="default"
            className=" text-2xl md:text-4xl text-center "
          >
            {" "}
            Got Questions? We’ve Got Answers.
          </Heading>

          <Text
            size="md"
            weight="medium"
            color="subtle"
            className=" text-center max-w-3xl mx-auto py-6"
          >
            {" "}
            Find quick answers to the most common questions about how Cart2Pay
            works and how we keep your shopping experience smooth and secure
          </Text>
        </div>

        <div className="space-y-8">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-200 pb-4">
              <button
                className="flex items-center justify-between w-full text-left"
                onClick={() => toggleOpen(index)}
              >
                <span className="text-lg font-medium text-gray-800">
                  {faq.question}
                </span>
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
