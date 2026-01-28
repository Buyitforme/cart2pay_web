import React, { FC, useEffect, useMemo, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderHistory } from "../../../redux/features/orderManagement/orderManagementThunk";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { PageLoader } from "../../../Components/PageLoader";
import Tabs from "../../../Components/Tabs";
import { HelpCircle, Link2, MessageCircle, Package, Plus, ShoppingBag, User } from "lucide-react";

export interface Order {
  _id: string;
  userId: string;
  store: string;
  address: string;
  phone: string;
  email: string;
  status: string;
  details: string; 
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
  const location = useLocation();
  const initialTab = location.state?.activeTab || "pending";
  const [activeTab, setActiveTab] = useState(initialTab);

  const tabs = [
    { key: "pending", label: "Pending" },
    { key: "approved", label: "Approved" },
    { key: "processed", label: "Processed" },
    { key: "shipped", label: "Shipped" },
     { key: "received", label: "Received" },
    { key: "rejected", label: "Rejected" },
  ];

  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const orders = orderHistory.data?.results || [];

  const filteredOrders = useMemo(
    () => orders.filter((order: any) => order.status === activeTab),
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
  <div className="flex gap-6  bg-gray-50">
    {/* Sidebar */}
    <div className="hidden lg:block w-64 bg-white border-r border-gray-200   py-6 bg-white border border-gray-200 rounded-lg  shadow-lg transition-shadow">
      <div className="bg-white  p-4">
          
          <div className="space-y-2">
            <Link to="/dashboard/new-order">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <Plus className="w-4 h-4 text-gray-500" />
                Start new order
              </button>
            </Link>
            <Link to="/dashboard/support">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <MessageCircle className="w-4 h-4 text-gray-500" />
                Contact support
              </button>
            </Link>
            <Link to="/how-it-works">
              <button className="w-full flex items-center gap-3 px-3 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-lg transition-colors text-left">
                <HelpCircle className="w-4 h-4 text-gray-500" />
                How it works
              </button>
            </Link>
          </div>
        </div>
    
    </div>

    {/* Main Content */}
    <div className="flex-1 px-4 md:px-8 lg:px-12 py-6 bg-white border border-gray-200 rounded-lg p-4 shadow-lg transition-shadow">
      <div className="max-w-5xl">
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
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <ShoppingBag className="w-16 h-16 text-gray-400 mb-3" />
              <Text size="lg" weight="medium">
                No {activeTab} orders yet.
              </Text>
              <Text size="sm" className="text-gray-500 mb-5">
                When you place an order, it will appear here.
              </Text>
              <Link to="/dashboard/new-order">
                <Button>Create new order</Button>
              </Link>
            </div>
          </div>
        ) : (
          <div className="mt-6 space-y-3 ">
            {filteredOrders.map((order: any) => (
              <div
                key={order._id}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* Store Icon */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0 bg-gray-100 rounded-lg flex items-center justify-center">
                    <ShoppingBag className="w-6 h-6 sm:w-8 sm:h-8 text-gray-500" />
                  </div>

                  {/* Order Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Text size="sm" color="muted" className="text-xs">
                            Order
                          </Text>
                          <Text size="sm" className="font-mono text-gray-700 text-xs">
                            {order?._id?.slice(-8)}
                          </Text>
                        </div>
                        <Heading size="md" weight="semibold" className="truncate">
                          {order.store}
                        </Heading>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`
                          px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap flex-shrink-0
                          ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-800"
                              : order.status === "approved"
                              ? "bg-green-100 text-green-800"
                              : order.status === "processed"
                              ? "bg-blue-100 text-blue-800"
                              : order.status === "shipped"
                              ? "bg-purple-100 text-purple-800"
                              : order.status === "received"
                              ? "bg-green-100 text-green-800"
                              : order.status === "rejected"
                              ? "bg-red-100 text-red-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        `}
                      >
                        {order.status}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-4">
                      <Text size="sm" color="muted" className="text-xs sm:text-sm">
                        Submitted{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </Text>

                      <div className="flex gap-3 sm:gap-4">
                        <button
                          className="text-secondary_dark text-sm font-medium hover:underline"
                          onClick={() =>
                            navigate(`/dashboard/orders/quote/${order._id}`)
                          }
                        >
                          See Quote
                        </button>
                        <button
                          className="text-gray-700 text-sm font-medium hover:underline"
                          onClick={() =>
                            navigate(`/dashboard/orders/order-details/${order._id}`)
                          }
                        >
                          See Details
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  </div>
);
};

export default Orders;
