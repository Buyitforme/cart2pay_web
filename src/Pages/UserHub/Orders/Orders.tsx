import React, { FC, useEffect, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Card } from "../../../Components/Card";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderHistory } from "../../../redux/features/orderManagement/orderManagementThunk";
import { useNavigate } from "react-router-dom";
import { PageLoader } from "../../../Components/PageLoader";

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
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const { orderHistory } = useSelector(
    (state: RootState) => state.order_management
  );
  const dispatch: AppDispatch = useDispatch();
    const navigate = useNavigate();


  const orders = orderHistory.data?.results || [];

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

      {!orders.length ? (
        <div className="mt-12 text-center space-y-4">
          <Text size="lg">You haven’t placed any orders yet.</Text>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/dashboard/new-order")}
          >
            Let's shop for you
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {orders.map((order: Order) => (
            <Card key={order._id} className="p-4 shadow-md bg-white rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Heading size="md" weight="semibold">
                  {order._id}
                </Heading>
                <Text color="primary" weight="semibold">
                  {order.status}
                </Text>
              </div>
              <Text>
                <strong>Store:</strong> {order.store}
              </Text>
              <Text>
                <strong>Date submitted:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </Text>
             
              <div className="flex justify-between">
                 <Button
                size="sm"
                className="mt-4"
                variant="outline"
onClick={() => navigate(`/dashboard/orders/order-details/${order._id}`)}
              >
                View Details
              </Button>
               <Button
                size="sm"
                className="mt-4"
                variant="outline"
onClick={() => navigate(`/dashboard/orders/quote/${order._id}`)}
              >
                View Quote
              </Button>
              </div>
             
            </Card>
          ))}
        </div>
      )}

      {/* Order Details Modal */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg max-w-md w-full space-y-4">
            <div className="flex justify-between items-center">
              <Heading size="lg" weight="bold">
                Order Details
              </Heading>
              <button
                onClick={() => setSelectedOrder(null)}
                className="text-gray-500"
              >
                ✕
              </button>
            </div>
            <Text>
              <strong>Order ID:</strong> {selectedOrder._id}
            </Text>
            <Text>
              <strong>Store:</strong> {selectedOrder.store}
            </Text>
            <Text>
              <strong>Date:</strong>{" "}
              {new Date(selectedOrder.createdAt).toLocaleString()}
            </Text>
            <Text>
              <strong>Status:</strong>{" "}
              <span className="text-primary font-extrabold">
                {selectedOrder.status}
              </span>
            </Text>
            <Text>
              <strong>Total:</strong> ₦{selectedOrder.sumTotal}
            </Text>
            <Text>
              <strong>Delivery:</strong> {selectedOrder.address}
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
