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
  triggerOrderDetails,
} from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import { Modal } from "../../../Components/Modal";
const Quote = () => {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { orderId } = useParams();
  const { orderDetails, generatePaymentDetails} = useSelector(
    (state: RootState) => state.order_management
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

      {!orderDetails.loading && order?.items_total === 0 ? (
        <div className="text-center space-y-4 py-10">
          <Heading size="lg" weight="bold">
            Order Received!
          </Heading>
          <Text size='md' color="secondary" weight='normal'>
            We’re reviewing your order and will get your quote ready shortly.
            You’ll receive an email and an in-app notification once it’s ready.
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
        <div className="max-w-3xl mx-auto  rounded-xl space-y-8 md:px-2">
          <div className="text-center space-y-2">
            <Heading size="lg" weight="bold" color="default">
              🎉 Your Quote Is Ready!
            </Heading>
            <Text className="text-gray-600 text-base" color="subtle"  size='md' weight='normal'>
              Review your order summary below, including all costs and fees.
            </Text>
                        <Text size='md' color="warning" weight='normal'>

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
              <Text  size='md' weight='normal' color="secondary">Store</Text>
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
              <Text  size='md' weight='normal' color="secondary">Item(s) cost </Text>
              <Text  size='md' weight='normal' color="secondary">$ {order?.items_total.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text  size='md' weight='normal' color="secondary">Shipping Fee </Text>
              <Text  size='md' weight='normal' color="secondary">$ {order?.shipping_fee.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text  size='md' weight='normal' color="secondary">Tax</Text>
              <Text  size='md' weight='normal' color="secondary">$ {order?.tax.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text  size='md' weight='normal' color="secondary">Duties</Text>
              <Text  size='md' weight='normal' color="secondary">$ {order?.duties.toLocaleString()}</Text>
            </div>
            <div className="flex justify-between">
              <Text  size='md' weight='normal' color="secondary">Exchange Rate</Text>
              <Text  size='md' weight='normal' color="secondary">₦{order?.exchange_rate.toLocaleString()} / $1</Text>
            </div>

            <div className="flex justify-between items-start gap-4">
              <Text className="min-w-0 break-words"  size='md' weight='normal' color="secondary">
                Surcharge (0.5% Items + Shipping + Tax + Duties)
              </Text>
              <Text className="text-right whitespace-nowrap"  size='md' weight='normal' color="secondary">
                ₦{order?.surcharge.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text  size='md' weight='normal' color="secondary">Cart2pay fee (Flat rate) </Text>
              <Text className="font-medium">
                ₦{order?.service_fee.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between text-gray-700">
              <Text  size='md' weight='normal' color="secondary">Local delivery </Text>
              <Text className="font-medium"  size='md' weight='normal' color="secondary">
                ₦{order?.local_delivery_fee.toLocaleString()}
              </Text>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2">
              <Text  size='md' weight='normal' color="secondary">Total to Pay (₦)</Text>
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

          {["approved", "pending"].includes(
            orderDetails?.data?.results?.status ?? ""
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
              {/* Left button */}
              <div>
                {" "}
                <Button
                  variant="primary"
                  // onClick={handlePay}
                  onClick={() => navigate(`/dashboard/orders/payment-details/${order._id}`)}

                  // loading={generatePaymentDetails.loading}
                  disabled={
                    !["approved", "pending"].includes(
                      orderDetails?.data?.results?.status ?? ""
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
    
    {/* Account Name */}
    <div className="space-y-1 w-full px-4">
      <Text size="sm" color="subtle" weight='normal' className="break-words">
        Kindly,{generatePaymentDetails.message}
      </Text>
    </div>
    
    {/* Done Button */}
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
