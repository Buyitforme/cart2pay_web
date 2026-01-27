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
import { triggerOrderDetails } from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import { Modal } from "../../../Components/Modal";
const Quote = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orderDetails, generatePaymentDetails } = useSelector(
    (state: RootState) => state.order_management,
  );
  const dispatch: AppDispatch = useDispatch();

  const order = orderDetails?.data?.results;

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
      {!orderDetails.loading &&
      order?.items_total === 0 &&
      order.status === "approved" ? (
        <div className="text-center space-y-4 py-10">
          <Heading size="lg" weight="bold">
            Order Received!
          </Heading>
          <Text size="md" color="secondary" weight="normal">
            We're reviewing your order and will get your quote ready shortly.
            You'll receive an email and an in-app notification once it's ready.
          </Text>

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
      ) : order?.status === "rejected" ? (
        // Rejected state
        <div className="text-center space-y-4 py-10 border   rounded-xl p-4 mt-6">
          <Heading size="lg" weight="bold" className="text-red-600">
            Order Rejected
          </Heading>

          <Text size="md" color="secondary" weight="normal">
            Unfortunately, your order could not be processed.
          </Text>

          {order?.rejection_reason && (
            <Text
              size="md"
              weight="normal"
              className="text-red-700 bg-red-100 p-3 rounded-md"
            >
              <strong>Reason:</strong> {order.rejection_reason}
            </Text>
          )}

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-4">
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
      ) : order?.status === "pending" ? (
        // Pending approval state
        <div className="text-center space-y-4 py-10  rounded-xl p-4 mt-6">
          <Heading size="lg" weight="bold" className="text-yellow-700">
            Order Under Review
          </Heading>
          <Text size="md" color="secondary" weight="normal">
            Your order is currently being reviewed. We'll notify you once it's
            been approved and your quote is ready.
          </Text>

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
        // Approved state - Show full order details
        <div className="max-w-3xl mx-auto rounded-xl space-y-8 md:px-2">
          <div className="text-center space-y-2">
            <Heading size="lg" weight="bold" color="default">
              🎉 Your Quote Is Ready
            </Heading>
            <Text
              className="text-gray-600 text-base"
              color="subtle"
              size="md"
              weight="normal"
            >
              Review your order summary below, including all costs and fees.
            </Text>
            <Text size="md" color="warning" weight="normal">
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
              Order Details
            </Heading>

            <div>
              <Text size="md" weight="normal" color="secondary">
                Store
              </Text>
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
          <div className="border-t pt-4 space-y-3 w-full">
            <Heading size="md" weight="semibold">
              Order Summary
            </Heading>
            <div className="text-sm text-gray-500">
              Exchange rate used:{" "}
              <span className="font-medium text-gray-700">
                ₦{order?.exchange_rate.toLocaleString()} / {order?.currency} 1
              </span>
            </div>
            <div className="flex justify-between">
              <Text size="md" weight="normal" color="secondary">
                Items subtotal
              </Text>
              <Text size="md" weight="normal" color="secondary">
                {order?.currency} {order?.items_total.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between">
              <Text size="md" weight="normal" color="secondary">
                International shipping
              </Text>
              <Text size="md" weight="normal" color="secondary">
                {order?.currency} {order?.shipping_fee.toLocaleString()}
              </Text>
            </div>

            <div className="flex justify-between items-start ">
              <Text
                className="min-w-0 break-words"
                size="md"
                weight="normal"
                color="secondary"
              >
                Estimated customs & import charges
              </Text>
              <Text
                className="text-right whitespace-nowrap"
                size="md"
                weight="normal"
                color="secondary"
              >
                {order?.customs_fee?.currency === "NGN"
                  ? "₦"
                  : order?.customs_fee?.currency}{" "}
                {order?.customs_fee.estimated.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between items-start gap-4">
              <Text
                className="min-w-0 break-words"
                size="md"
                weight="normal"
                color="secondary"
              >
                FX buffer (0.5% Items + Shipping)
              </Text>
              <Text
                className="text-right whitespace-nowrap"
                size="md"
                weight="normal"
                color="secondary"
              >
                ₦{order?.surcharge.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text size="md" weight="normal" color="secondary">
                Service fee
              </Text>
              <Text className="font-medium">
                ₦{order?.service_fee.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between items-center pt-2 border-t">
              <Text size="lg" weight="semibold">
                Total to Pay
              </Text>
              <Text size="lg" weight="bold" className="font-black">
                ₦{order?.sum_total.toLocaleString()}
              </Text>
            </div>
            <div className=" p-3 bg-yellow-50 border border-yellow-200 rounded text-sm text-yellow-800 space-y-2">
              <div>
                <strong>Note:</strong> These exchange rates are provided by
                independent third parties and are not set or controlled by
                ShopViaCal. They are subject to change based on market demands.
              </div>
              <div>
                <strong>FX Buffer:</strong> Covers FX rate volatility between
                order time and payment confirmation.
              </div>
            </div>
          </div>

          {["approved", "pending"].includes(
            orderDetails?.data?.results?.status ?? "",
          ) && (
            <div className="flex flex-col gap-6 pt-4">
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
              <div>
                <Button
                  variant="primary"
                  onClick={() =>
                    navigate(`/dashboard/orders/payment-details/${order._id}`)
                  }
                  disabled={
                    !["approved", "pending"].includes(
                      orderDetails?.data?.results?.status ?? "",
                    )
                  }
                >
                  Get payment details
                </Button>
              </div>
            </div>
          )}

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <div className="py-2 w-full max-w-md flex flex-col items-center justify-center">
              <Lottie
                animationData={success}
                loop={true}
                style={{ width: 80, height: 80 }}
              />

              <div className="space-y-1 w-full px-4">
                <Text
                  size="sm"
                  color="subtle"
                  weight="normal"
                  className="break-words"
                >
                  Kindly,{generatePaymentDetails.message}
                </Text>
              </div>

              <div className="pt-4 w-full px-4">
                <Button
                  variant="primary"
                  onClick={() => {
                    setIsModalOpen(false);
                  }}
                  className="w-full"
                >
                  Ok
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
