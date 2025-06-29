import React, { useEffect, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import Select from "../../../Components/Select";
import { Button } from "../../../Components/Button";
import { Copy} from "lucide-react";
import Modal from "../../../Components/Modal";
import Tooltip from "../../../Components/Tooltip";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import success from "../../../Animations/success.json";
const Payment = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
 
  const [loading, setsLoading] = useState(false);
  const [paymentConfirmed, setPaymentComfirmed] = useState(false);
const COUNTDOWN_KEY = "cart2pay_quote_start";
const COUNTDOWN_DURATION = 2 * 60; // 1 hour in seconds

const getInitialCountdown = () => {
  const storedStart = localStorage.getItem(COUNTDOWN_KEY);
  const now = Date.now();

  if (storedStart) {
    const elapsed = Math.floor((now - parseInt(storedStart, 10)) / 1000);
    return Math.max(COUNTDOWN_DURATION - elapsed, 0);
  } else {
    localStorage.setItem(COUNTDOWN_KEY, now.toString());
    return COUNTDOWN_DURATION;
  }
};

// 👇 Set initial countdown right when useState runs
const [countdown, setCountdown] = useState(getInitialCountdown);
const [quoteReady, setQuoteReady] = useState(false);


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
    setIsModalOpen(true);
  };

useEffect(() => {
  if (quoteReady || countdown <= 0) return;

  const interval = setInterval(() => {
    setCountdown((prev) => {
      const newCountdown = prev - 1;
      if (newCountdown <= 0) {
        clearInterval(interval);
        setQuoteReady(true);
        localStorage.removeItem(COUNTDOWN_KEY);
        return 0;
      }
      return newCountdown;
    });
  }, 1000);

  return () => clearInterval(interval);
}, [countdown, quoteReady]);


  const formatTime = (seconds: number) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  const handlePaymentConfirmation = () => {
    setsLoading(true);
    setTimeout(() => {
      toast.success(
        "We’re verifying your payment. You’ll get a confirmation shortly."
      );
    }, 4000);
    setTimeout(() => {
      setIsModalOpen(false);
      setPaymentComfirmed(true);
    }, 6000);
  };
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl space-y-8">
      {!quoteReady ? (
        <div className="text-center space-y-4 py-10">
          <Heading size="lg" weight="bold">
            Order Request Received
          </Heading>
          <Text size="sm" color="subtle">
            We've received your order request and our team is reviewing it
            carefully.
            <br />
            Please allow up to <strong>24 hours</strong> for us to finalize your
            total in ₦aira.
            <br />
            It may be ready much sooner depending on the number of items in your
            cart.
          </Text>

          <Text size="sm" color="primary">
            You’ll get an email and in-app notification once it’s ready.
          </Text>

          <div className="text-3xl font-bold text-accent">
            {formatTime(countdown)}
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-6">
            <Button
              variant="outline"
              onClick={() => navigate("/dashboard/orders")}
            >
              View My Orders
            </Button>
            <Button variant="ghost" onClick={() => navigate("/dashboard")}>
              Explore Stores
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-3xl mx-auto p-6 rounded-xl space-y-8">
          <div className="text-center space-y-2">
            <Heading size="lg" weight="bold" color="default">
              🎉 Your Total Is Ready!
            </Heading>
            <Text className="text-gray-600 text-base" color="subtle">
              We’ve carefully reviewed your cart and calculated your total in
              ₦aira. Please take a moment to review the summary below before
              making payment.
            </Text>
          </div>

          {/* Cart Details */}

          <div className="pt-6 space-y-4">
            <Heading
              size="md"
              weight="semibold"
              color="default"
              className="text-left"
            >
              Order Summary
            </Heading>

            <div>
              <Text className="text-sm text-muted-foreground">Store</Text>
              <Heading size="sm" weight="semibold">
                Zara
              </Heading>
            </div>

            <div>
              <Text className="text-sm text-muted-foreground">Cart Link</Text>
              <a
                href="https://zara.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                View Cart on Zara
              </a>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-1">
            <Heading size="sm" weight="semibold">
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
                independent third parties and are not set or controlled by
                Cart2pay. They are subject to change based on market demands.
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
              options={[{ label: "Bank Transfer", value: "bank" }]}
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
                  onClick={handlePaymentConfirmation}
                  className="w-full"
                  loading={loading}
                >
                  I've made payment
                </Button>
              </div>
            </div>
          </Modal>

          <Modal
            isOpen={paymentConfirmed}
            onClose={() => setPaymentComfirmed(false)}
          >
            <div className="space-y-12">
              <div className="flex flex-col items-center justify-center space-y-4">
                <Lottie
                  animationData={success}
                  loop={true}
                  style={{ width: 80, height: 80 }}
                />
                <Heading size="md">Payment Confirmed</Heading>
                <Text size="sm" className="text-center text-gray-500">
                  Your payment has been confirmed and your order will be placed
                  shortly.This usually takes about 15 minutes.
                  <br />
                  Please check your email for the receipt and shipping
                  information.
                </Text>
              </div>

              <div className="flex justify-between items-center">
                <Button
                  variant="primary"
                  onClick={() => navigate("/dashboard/orders")}
                >
                  View order
                </Button>

                <Button
                  variant="outline"
                  onClick={() => navigate("/dashboard/new-order")}
                >
                  Start a new order
                </Button>
              </div>
            </div>
          </Modal>
        </div>
      )}
    </div>
  );
};

export default Payment;
