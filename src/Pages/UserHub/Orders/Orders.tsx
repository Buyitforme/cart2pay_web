import React, { FC, useEffect, useMemo, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Card } from "../../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderHistory } from "../../../redux/features/orderManagement/orderManagementThunk";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../../../Components/PageLoader";
import Tabs from "../../../Components/Tabs";

export interface Order {
  _id: string;
  userId: string;
  store: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  details: string; // this is a JSON string — you can parse it into a proper object if needed
  total: number;
  fee: number;
  surcharge: number;
  service_fee: number;
  sumTotal: number;
  rate: number;
  delivery: number;
  deletedAt: string | null;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const Orders: FC = () => {
  const { orderHistory } = useSelector(
    (state: RootState) => state.order_management
  );
    const [activeTab, setActiveTab] = useState("pending");

  const tabs = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "processed", label: "Processed" },
    { key: "received", label: "Received" },
  ];

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const orders = orderHistory.data?.results || []

  const filteredOrders = useMemo(
    () => orders.filter((order:any) => order.status === activeTab),
    [orders, activeTab]
  );
  useEffect(() => {
    dispatch(triggerOrderHistory({}));
  }, [dispatch]);

  if (orderHistory.loading || !orderHistory.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
return (
    <div className="px-4 md:px-16 py-6">
      <Heading size="2xl" weight="bold">
        Orders
      </Heading>
      <Text className="mt-2" color="muted">
        Review your past and current orders.
      </Text>

      {/* Tabs */}
      <div className="mt-6">
        <Tabs tabs={tabs} activeTab={activeTab} onChange={setActiveTab} />
      </div>

      {!filteredOrders.length ? (
      <div className="mt-12 text-center space-y-4">
  <Text size="lg">No {activeTab} orders yet.</Text>
  <div className="flex justify-center">
    <Button
      variant="primary"
      className="w-auto px-6"
      onClick={() => (window.location.href = "/dashboard/new-order")}
    >
      Shop for me
    </Button>
  </div>
</div>
      ) : (
       <div className="mt-6 sm:mt-8 grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
  {filteredOrders.map((order: any) => (
    <Card
      key={order._id}
      className="p-3 sm:p-4 lg:p-5 shadow-md hover:shadow-lg bg-white rounded-lg sm:rounded-xl transition-shadow duration-200"
    >
      {/* Header Section */}
      <div className="space-y-2 sm:space-y-3 mb-3 sm:mb-4">
        {/* Order ID - Always full width on mobile */}
        <div className="space-y-1">
          <Heading className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 leading-tight">
            <span className="text-gray-600 font-medium">Order ID:</span>
          </Heading>
              <div className="text-xs text-gray-500 font-mono bg-gray-50 px-2 py-1 rounded border w-fit">
            {order?._id?.slice(-8) || 'Loading...'}
          </div>
        </div>

        {/* Status Badge */}
        <div className="flex justify-end">
          <span className={`
            inline-flex items-center px-2 py-1 rounded-full text-xs font-semibold
            ${order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
              order.status === 'approved' ? 'bg-green-100 text-green-800' :
              order.status === 'completed' ? 'bg-blue-100 text-blue-800' :
              order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
              'bg-gray-100 text-gray-800'}
          `}>
            {order.status}
          </span>
        </div>
      </div>

      {/* Order Details */}
      <div className="space-y-2 mb-4 sm:mb-5">
        <div className="flex flex-col xs:flex-row xs:justify-between gap-1 xs:gap-2">
          <Text className="text-xs sm:text-sm text-gray-600 font-medium flex-shrink-0">
            Store:
          </Text>
          <Text className="text-xs sm:text-sm text-gray-800 font-semibold break-words xs:text-right">
            {order.store}
          </Text>
        </div>

        <div className="flex flex-col xs:flex-row xs:justify-between gap-1 xs:gap-2">
          <Text className="text-xs sm:text-sm text-gray-600 font-medium flex-shrink-0">
            Date submitted:
          </Text>
          <Text className="text-xs sm:text-sm text-gray-800 font-semibold xs:text-right">
            {new Date(order.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          </Text>
        </div>
      </div>

    {/* Action Buttons */}
<div className="flex flex-row w-full gap-2 sm:gap-4">
  <Button
    size="sm"
    className="w-full h-8 sm:h-9 text-xs sm:text-sm"
    variant="outline"
    onClick={() =>
      navigate(`/dashboard/orders/order-details/${order._id}`)
    }
  >
    View Details
  </Button>
  <Button
    size="sm"
    className="w-full h-8 sm:h-9 text-xs sm:text-sm"
    variant="outline"
    onClick={() =>
      navigate(`/dashboard/orders/quote/${order._id}`)
    }
  >
    View Quote
  </Button>
</div>
    </Card>
  ))}
</div>

      )}
    </div>
  );
};

export default Orders;
