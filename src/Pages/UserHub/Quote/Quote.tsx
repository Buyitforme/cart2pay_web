import React, { useEffect, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import Select from "../../../Components/Select";
import { Button } from "../../../Components/Button";

import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import Lottie from "lottie-react";
import success from "../../../Animations/success.json";
import GoBack from "../../../Components/GoBack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import {
  triggerConfirmPayment,
  triggerGeneratePaymentDetails,
  triggerOrderDetails,
} from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import { Modal } from "../../../Components/Modal";
const Quote = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orderDetails, generatePaymentDetails, confirmPayment } = useSelector(
    (state: RootState) => state.order_management
  );
  const dispatch: AppDispatch = useDispatch();

  const order = orderDetails?.data?.results;

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
    dispatch(triggerGeneratePaymentDetails(orderId!));
  };

  useEffect(() => {
    if (countdown <= 0) return;

    const interval = setInterval(() => {
      setCountdown((prev) => {
        const newCountdown = prev - 1;
        if (newCountdown <= 0) {
          clearInterval(interval);
          localStorage.removeItem(COUNTDOWN_KEY);
          return 0;
        }
        return newCountdown;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [countdown]);

  const handlePaymentConfirmation = () => {
    if (!orderId) {
      return;
    }
    dispatch(triggerConfirmPayment(orderId!));

  };
  useEffect(() => {
    dispatch(triggerOrderDetails(orderId!));
  }, [dispatch, orderId]);

  useEffect(() => {
    if (
      !generatePaymentDetails.error &&
      generatePaymentDetails.statusCode === 200
    ) {
      setIsModalOpen(true);
    } else if (generatePaymentDetails.error) {
      toast.error(generatePaymentDetails.message);
    }
  }, [
    generatePaymentDetails.error,
    generatePaymentDetails.message,
    generatePaymentDetails.statusCode,
  ]);

  useEffect(() => {
    if (!confirmPayment.error && confirmPayment.statusCode === 200) {
      setPaymentComfirmed(true);
    } else if (confirmPayment.error) {
      toast.error(confirmPayment.message);
    }
  }, [confirmPayment.error, confirmPayment.message, confirmPayment.statusCode]);

  if (orderDetails.loading || !orderDetails.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-xl space-y-8">
      <GoBack label={"Quote"} />

      {!orderDetails.loading && order?.items_total === 0 ? (
        <div className="text-center space-y-4 py-10">
          <Heading size="lg" weight="bold">
            Order Received!
          </Heading>
          <Text size="sm" color="subtle">
           
           We’re reviewing your order and will get your quote ready shortly. You’ll receive an email and an in-app notification once it’s ready.
          </Text>

          {/* <div className="text-3xl font-bold text-accent">
            {formatTime(countdown)}
          </div> */}

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
              🎉 Your Quote Is Ready!
            </Heading>
            <Text className="text-gray-600 text-base" color="subtle">
              Review your order summary below, including all costs and fees.
            </Text>
            <Text className="text-sm text-orange-600" color="warning">
              Quick tip! To avoid stockouts, please complete your payment as
              soon as possible because items are selling out fast.
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
                {order?.store}
              </Heading>
            </div>
          </div>

          {/* Delivery Info */}
          <div className="space-y-1">
            <Heading size="sm" weight="semibold">
              Delivery Information
            </Heading>
            <Text>
              <strong>Email:</strong> {order?.email}
            </Text>
            <Text>
              <strong>Phone:</strong> {order?.delivery_information?.phone}
            </Text>
            <Text>
              <strong>Address:</strong>{" "}
              {[
                order?.delivery_information?.street,
                order?.delivery_information?.lga,
                order?.delivery_information?.state,
              ]
                .filter(Boolean)
                .join(", ")}
            </Text>
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t pt-4 space-y-6 w-full">
            <Heading size="md" weight="semibold">
              Cost Breakdown
            </Heading>
            <div className="flex justify-between">
              <Text>Item(s) cost </Text>
              <Text>$ {order?.items_total.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text>Shipping Fee </Text>
              <Text>$ {order?.shipping_fee.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text>Tax</Text>
              <Text>$ {order?.tax.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text>Duties</Text>
              <Text>$ {order?.duties.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text>Exchange Rate</Text>
              <Text>₦{order?.exchange_rate.toLocaleString()} / $1</Text>
            </div>

            <div className="flex justify-between items-start gap-4">
              <Text className="min-w-0 break-words">
                Surcharge (0.5% Items + Shipping + Tax + Duties)
              </Text>
              <Text className="text-right whitespace-nowrap font-medium">
                ₦{order?.surcharge.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text>Cart2pay fee (Flat rate) </Text>
              <Text className="font-medium">
                ₦{order?.service_fee.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text>Local delivery </Text>
              <Text className="font-medium">
                ₦{order?.local_delivery_fee.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <Text>Total to Pay (₦)</Text>
              <div className="py-2 px-3 bg-highlight rounded">
                <Text size="lg" color="" weight="bold" className="font-black ">
                  ₦{order?.sum_total.toLocaleString()}
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

 <div className="flex flex-col gap-6 pt-4">
  {/* Left button */}
  <div>  <Button
    variant="primary"
    onClick={handlePay}
    loading={generatePaymentDetails.loading}
  >
    Get Payment Details
  </Button></div>


  {/* Right section */}
  <div className="f">
    <p className="text-sm text-gray-500 mb-1">
      Once you’ve completed your bank transfer, tap below so we can verify your payment.
    </p>
    <Button
      variant="secondary"
      onClick={handlePaymentConfirmation}
    className="font-bold "
      loading={confirmPayment.loading}
    >
      Confirm I’ve Paid
    </Button>
  </div>
</div>



          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <div className="py-2 w-full flex flex-col items-center justify-center">
              <Lottie
                animationData={success}
                loop={true}
                style={{ width: 80, height: 80 }}
              />

              {/* Account Name */}
              <div className="space-y-1">
                <Text size="sm" color="subtle">
                  Kindly, {generatePaymentDetails.message}
                </Text>
              </div>

              {/* Done Button */}
              <div className="pt-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="w-full"
                  loading={loading}
                >
                  Ok
                </Button>
              </div>
            </div>
          </Modal>

         <Modal
  isOpen={paymentConfirmed}
  onClose={() => setPaymentComfirmed(false)}
>
  <div className="flex flex-col items-center justify-center space-y-6 p-6">
    {/* Title */}
    <h2 className="text-lg font-semibold text-gray-800 text-center">
      Payment Confirmation Submitted
    </h2>

    {/* Body text */}
    <Text size="sm" className="text-center text-gray-500">
      Great! We’ve received your payment confirmation.  
      You’ll be notified via email once the payment is verified.
    </Text>

    {/* Actions */}
    <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm mt-4">
      <Button
        variant="primary"
        className="w-full"
        onClick={() => setPaymentComfirmed(false)}
      >
        Ok
      </Button>

      <Button
        variant="outline"
        className="w-full"
        onClick={() => navigate("/dashboard/new-order")}
      >
        Start New Order
      </Button>
    </div>
  </div>
</Modal>

        </div>
      )}
    </div>
  );
};

export default Quote;
