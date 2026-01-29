import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderDetails } from "../../../redux/features/orderManagement/orderManagementThunk";
import toast from "react-hot-toast";
import GoBack from "../../../Components/GoBack";
import ContentLoader from "../../../Components/ContentLoader";
import {
  DetailItem,
  InfoCard,
  ItemCard,
  StatusBadge,
} from "./ComponentHelpers";
import { MapPin } from "lucide-react";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orderDetails } = useSelector(
    (state: RootState) => state.order_management,
  );

  const dispatch: AppDispatch = useDispatch();
  const order = orderDetails?.data?.results;
  const parsedDetails = order?.details ? JSON.parse(order.details) : [];
console.log("Order Details:", JSON.stringify(orderDetails,null,2));
const shouldShowCost = order?.status !== "pending";

  useEffect(() => {
    dispatch(triggerOrderDetails(orderId!));
  }, [dispatch, orderId]);
  useEffect(() => {
    if (!orderDetails.error && orderDetails.statusCode === 200) {
    } else if (orderDetails.error) {
      toast.error(orderDetails.message);
    }
  }, [orderDetails.error, orderDetails.message, orderDetails.statusCode]);
  return (
  <div className="p-4 sm:p-6 max-w-4xl mx-auto min-h-screen bg-white border border-gray-200 shadow-lg rounded-2xl">
    <GoBack label="Order Details" />

    <div className="mt-6 space-y-6">
      {/* ===================== */}
      {/* Order Overview */}
      {/* ===================== */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
          <div>
            <h1 className="text-xl font-semibold text-gray-900 mb-1">
              Order Overview
            </h1>

            <p className="text-sm text-gray-500">
              Placed on{" "}
              {order?.createdAt
                ? new Date(order.createdAt).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : "Loading..."}
            </p>
          </div>

          <div className="flex flex-col items-start sm:items-end gap-2">
            <StatusBadge status={order?.status} />
            <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border">
              Order no: {order?._id?.slice(-8) || "Loading..."}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <InfoCard title="Store" value={order?.store} />
          {/* <InfoCard title="Customer" value={order?.userFullName} /> */}
        </div>
      </div>

      {/* ===================== */}
      {/* Cost Summary */}
      {/* ===================== */}
      {shouldShowCost && (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Cost Summary
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Items subtotal</span>
              <span>
                {order?.currency} {order?.items_total.toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>International shipping</span>
              <span>
                {order?.currency} {order?.shipping_fee.toLocaleString()}
              </span>
            </div>

            {order?.customs_fee?.estimated > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Estimated customs & import charges</span>
                <span>₦{order?.customs_fee?.estimated.toLocaleString()}</span>
              </div>
            )}

            <div className="flex justify-between text-gray-600">
              <span>FX buffer</span>
              <span>₦ {order?.surcharge.toLocaleString()}</span>
            </div>

            <div className="flex justify-between text-gray-600">
              <span>Service fee</span>
              <span>₦ {order?.service_fee.toLocaleString()}</span>
            </div>

            <div className="border-t pt-4 mt-4 flex justify-between font-bold text-base">
              <span>Total</span>
              <span>₦ {order?.sum_total.toLocaleString()}</span>
            </div>

            <p className="text-xs text-gray-500 mt-3">
              Exchange rate used: ₦{order?.exchange_rate.toLocaleString()} /{" "}
              {order?.currency} 1
            </p>
          </div>
        </div>
      )}

      {/* ===================== */}
      {/* Order Items */}
      {/* ===================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-1">
          Order Items
        </h2>
        <p className="text-sm text-gray-500 mb-6">
          {parsedDetails.length > 0
            ? `${parsedDetails.length} item${
                parsedDetails.length > 1 ? "s" : ""
              } in this order`
            : "Loading items..."}
        </p>

        <div className="space-y-4">
          {orderDetails.loading ? (
            <div className="flex justify-center items-center py-12">
              <ContentLoader />
            </div>
          ) : parsedDetails.length > 0 ? (
            parsedDetails.map((item: any, index: number) => (
              <ItemCard key={index} item={item} index={index} />
            ))
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 font-medium">
                Unable to load order items
              </p>
              <p className="text-sm text-gray-400 mt-1">
                Please try refreshing the page
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ===================== */}
      {/* Delivery Information */}
      {/* ===================== */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex items-center gap-3 mb-6">
          <MapPin className="w-5 h-5 text-gray-600" />
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Delivery Information
            </h2>
            <p className="text-sm text-gray-500">
              Where your order will be delivered
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <DetailItem
            label="Street Address"
            value={order?.delivery_information?.street}
          />
          <DetailItem
            label="State"
            value={order?.delivery_information?.state}
          />
          <DetailItem
            label="Local Government Area"
            value={order?.delivery_information?.lga}
          />
          <DetailItem
            label="Phone Number"
            value={order?.delivery_information?.phone}
            className="sm:col-span-2 lg:col-span-1"
          />
          <InfoCard title="Email" value={order?.userEmail} />
        </div>
      </div>
    </div>
  </div>
);

};

export default OrderDetails;
