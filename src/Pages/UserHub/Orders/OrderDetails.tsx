import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderDetails } from "../../../redux/features/orderManagement/orderManagementThunk";
import toast from "react-hot-toast";
import GoBack from "../../../Components/GoBack";
import ContentLoader from "../../../Components/ContentLoader";
import TextLoader from "../../../Components/TextLoader";

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
    <div className="p-6 max-w-3xl mx-auto bg-white rounded-2xl shadow-md">
      <GoBack label={"Order Details"} />

      <div className="space-y-4">
        <DetailRow label="Order ID" value={order?._id} />
        <DetailRow label="Store" value={order?.store} />
        <DetailRow label="Street" value={order?.delivery_information?.street} />
        <DetailRow label="State" value={order?.delivery_information?.state} />
        <DetailRow label="Lga" value={order?.delivery_information?.lga} />

        <DetailRow label="Phone" value={order?.delivery_information?.phone} />
        <DetailRow label="Email" value={order?.email} />
        <DetailRow label="Status" value={order?.status} />
        <DetailRow
          label="Date created"
          value={
            order?.createdAt ? new Date(order.createdAt).toLocaleString() : null
          }
        />

        <div>
          <h2 className="text-lg font-semibold mb-2">Items:</h2>
          <ul className="space-y-3">
            {orderDetails.loading ? (
              <div className="flex justify-center items-center">
                <ContentLoader />
              </div>
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
                      className="text-blue-600 underline break-all"
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
    <span>{value ?? <TextLoader />}</span>
  </div>
);

export default OrderDetails;
