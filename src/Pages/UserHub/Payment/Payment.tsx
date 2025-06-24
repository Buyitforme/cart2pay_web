import React, { useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import Select from "../../../Components/Select";
import { Button } from "../../../Components/Button";
import { Copy, Info, InfoIcon } from "lucide-react";
import Modal from "../../../Components/Modal";
import Tooltip from "../../../Components/Tooltip";


const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);

  const accountDetails = {
    name: "Cart2pay Ltd",
    number: "0123456789",
    bank: "Access Bank",
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(accountDetails.number);
    alert("Account number copied!");
  };
  const handlePay = () => {
    if (!selectedPaymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    // proceed with payment logic
    console.log("Paying with:", selectedPaymentMethod);
    setIsModalOpen(true)
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl space-y-8">
      {/* ... other content ... */}
      <div className="text-center">
        <Heading size="lg" weight="bold">
          Order Summary
        </Heading>
        <Text className="text-gray-600">
          Review your order before making payment
        </Text>
      </div>

      {/* Cart Details */}
      <div className="space-y-2">
        <Heading size="md" weight="semibold">
          Store
        </Heading>
        <Text>Zara</Text>

        <Heading size="md" weight="semibold">
          Cart Link
        </Heading>
        <a
          href="zara.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 underline"
        >
          zara.com
        </a>
      </div>

      {/* Delivery Info */}
      <div className="space-y-1">
        <Heading size="md" weight="semibold">
          Delivery Information
        </Heading>
        <Text>
          <strong>Name:</strong> Chioma Nwabugwu
        </Text>
        <Text>
          <strong>Phone:</strong> 07039379012
        </Text>
        <Text>
          <strong>Address:</strong> 22 lekki phase 1, Eti-osa, Lagos
        </Text>
      </div>

      {/* Pricing Breakdown */}
      <div className="border-t pt-4 space-y-6 w-full">
        <Heading size="md" weight="semibold">
          Cost Breakdown
        </Heading>
        <div className="flex justify-between">
          <Text>Cart Total (USD)</Text>
          <Text>$120.00</Text>
        </div>
        <div className="flex justify-between">
          <Text>Shipping Fee (USD)</Text>
          <Text>$34</Text>
        </div>
        <div className="flex justify-between">
          <Text>Exchange Rate</Text>
          <Text>₦1,500 / $1</Text>
        </div>

        <div className="flex justify-between items-start gap-4">
          <Text className="min-w-0 break-words">
            Surcharge (FX risks: 0.5% Cart + Shipping)
          </Text>
          <Text className="text-right whitespace-nowrap font-medium">
            ₦2,000
          </Text>
        </div>
        <div className="flex justify-between text-gray-700">
          <Text>Cart2pay fee (2% Cart + Shipping) </Text>
          <Text className="font-medium">₦4,000</Text>
        </div>
        <div className="flex justify-between font-bold text-lg pt-2">
          <Text>Total to Pay (₦)</Text>
          <div className="py-2 px-3 bg-highlight rounded">
            <Text size="lg" color="" weight="bold" className="font-black ">
              ₦198,200
            </Text>
          </div>
        </div>
        <div className="mt-6 p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 space-y-2">
          <div>
            <strong>Note:</strong> These exchange rates are provided by
            independent third parties and are not set or controlled by Cart2pay.
            They are subject to change based on market demands.
          </div>
          <div>
            <strong>Surcharge:</strong> Covers FX rate volatility between
            cart time and payment confirmation.
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Heading size="md" weight="semibold">
          Payment Method
        </Heading>
        <Select
          options={[
            { label: "Pay with Card", value: "card" },
            { label: "Bank Transfer", value: "bank" },
          ]}
          value={selectedPaymentMethod}
          onChange={(e) => setSelectedPaymentMethod(e.target.value)}
          placeholder="Select payment method"
          name={""}
        />
      </div>

      <div className="pt-4">
        <Button variant="primary" onClick={handlePay} className="font-bold">
          Pay ₦182,000
        </Button>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="space-y-4">
          <Heading size="md" className="text-center">
            Bank Transfer Details
          </Heading>

          {/* Account Name */}
          <div className="space-y-1">
            <Text size="sm" color="subtle">
              Account Name
            </Text>
            <Text weight="medium">{accountDetails.name}</Text>
          </div>

          {/* Account Number with Copy */}
          <div className="space-y-1">
            <Text size="sm" color="subtle">
              Account Number
            </Text>
            <div className="flex items-center justify-between bg-gray-100 rounded px-3 py-2">
              <Text weight="medium">{accountDetails.number}</Text>
              <button
                onClick={handleCopy}
                className="text-gray-400 hover:text-accent duration-300"
              >
                <Copy className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Bank */}
          <div className="space-y-1">
            <Text size="sm" color="subtle">
              Bank
            </Text>
            <Text weight="medium">{accountDetails.bank}</Text>
          </div>

          {/* Done Button */}
          <div className="pt-4">
            <Button
              variant="primary"
              onClick={() => setIsModalOpen(false)}
              className="w-full"
            >
              Done
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Payment;
