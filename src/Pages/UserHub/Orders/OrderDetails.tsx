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
    (state: RootState) => state.order_management
  );

  const dispatch: AppDispatch = useDispatch();
  const order = orderDetails?.data?.results;

  const parsedDetails = order?.details ? JSON.parse(order.details) : [];

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
    <div className="p-4 sm:p-6 max-w-4xl mx-auto bg-gray-50 min-h-screen rounded-lg">
      <GoBack label={"Order Details"} />

      <div className="mt-6 space-y-6">
        {/* Order Overview Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Order Details
              </h1>
              <p className="text-sm text-gray-500">
                Order placed on{" "}
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
                ID: {order?._id?.slice(-8) || "Loading..."}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <InfoCard title="Store" value={order?.store} />
            <InfoCard title="Email" value={order?.email} />
          </div>
        </div>

        {/* Delivery Information Card */}
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
          </div>
        </div>

        {/* Order Items Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <div className="flex items-center gap-3 mb-6">
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Order Items
              </h2>
              <p className="text-sm text-gray-500">
                {parsedDetails.length > 0
                  ? `${parsedDetails.length} item${
                      parsedDetails.length > 1 ? "s" : ""
                    } in this order`
                  : "Loading items..."}
              </p>
            </div>
          </div>

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
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    className="w-8 h-8 text-red-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16c-.77.833.192 2.5 1.732 2.5z"
                    />
                  </svg>
                </div>
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
      </div>
    </div>
  );
};

export default OrderDetails;
