import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderDetails } from "../../../redux/features/orderManagement/orderManagementThunk";
import toast from "react-hot-toast";
import { BeatLoader, SyncLoader } from "react-spinners";
import GoBack from "../../../Components/GoBack";

const OrderDetails = () => {
  const { orderId } = useParams();
  const { orderDetails } = useSelector(
    (state: RootState) => state.order_management
  );

  const dispatch: AppDispatch = useDispatch();
  const order = orderDetails?.data?.results;

  const parsedDetails = order?.details ? JSON.parse(order.details) : [];

  useEffect(() => {
    console.log("id", orderId);
    dispatch(triggerOrderDetails(orderId!));
  }, [dispatch, orderId]);
  useEffect(() => {
    if (!orderDetails.error && orderDetails.statusCode === 200) {
    } else if (orderDetails.error) {
      toast.error(orderDetails.message);
    }
  }, [orderDetails.error, orderDetails.message, orderDetails.statusCode]);
  return (
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <GoBack label={"Order Details"} />

      <div className="space-y-4">
        <DetailRow label="Order ID" value={order?._id} />
        <DetailRow label="Store" value={order?.store} />
        <DetailRow label="Delivery address" value={order?.address} />
        <DetailRow label="Phone" value={order?.phone} />
        <DetailRow label="Email" value={order?.email} />
        <DetailRow label="Status" value={order?.status} />
        <DetailRow
          label="Date created"
          value={
            order?.createdAt
              ? new Date(order.createdAt).toLocaleString()
              : "..."
          }
        />

        <div>
          <h2 className="text-lg font-semibold mb-2">Items:</h2>
          <ul className="space-y-3">
            {orderDetails.loading ? (
              // Show skeleton loaders while fetching
              Array(4)
                .fill(0)
                .map((_, index) => (
                  <li
                    key={index}
                    className="p-4 border rounded-xl bg-gray-100 animate-pulse space-y-2"
                  >
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                    <div className="h-4 bg-gray-300 rounded w-2/3"></div>
                  </li>
                ))
            ) : parsedDetails.length > 0 ? (
              // Show actual order details when loaded
              parsedDetails.map((item: any, index: number) => (
                <li
                  key={index}
                  className="p-4 border rounded-xl bg-gray-50 text-sm text-gray-800"
                >
                  <p>
                    <span className="font-semibold">Item url: </span>
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item.link}
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Size:</span>{" "}
                    {item.variant?.size}
                  </p>
                  <p>
                    <span className="font-semibold">Color:</span>{" "}
                    {item.variant?.color}
                  </p>
                  <p>
                    <span className="font-semibold">Quantity:</span>{" "}
                    {item.variant?.quantity}
                  </p>
                </li>
              ))
            ) : (
              // Show error/fallback when loading is false and no data
              <div className="text-sm text-red-600">
                Unable to load order details
              </div>
            )}
          </ul>
        </div>

        {/* <div className="grid grid-cols-2 gap-4 mt-6">
          <SummaryBox label="Items Total" value={order?.total} />
          <SummaryBox label="Shiping Fee" value={order?.fee} />
          <SummaryBox label="Surcharge" value={order?.surcharge} />
          <SummaryBox label="Cart2pay Fee" value={order?.service_fee} />
          <SummaryBox label="Local delivery" value={order?.delivery} />

          <SummaryBox label="Sum total" value={order?.sumTotal} />
        </div> */}
      </div>
    </div>
  );
};
const DetailRow = ({
  label,
  value,
}: {
  label: string;
  value: string | number | null;
}) => (
  <div className="flex justify-between border-b py-2 text-gray-700">
    <span className="font-medium">{label}</span>
    <span>{value ?? <span className="dot-loading" aria-label="Loading">...</span>}</span>
  </div>
);

const SummaryBox = ({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) => (
  <div className="bg-gray-100 p-4 rounded-lg text-center">
    <div className="text-sm text-gray-500">{label}</div>
    <div className="text-xl font-semibold">{value ?? 0}</div>
  </div>
);

export default OrderDetails;
