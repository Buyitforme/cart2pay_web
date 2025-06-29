import React, { useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Card } from "../../../Components/Card";

type Order = {
  id: string;
  store: string;
  date: string;
  status: string;
  total: string;
};

const mockOrders = [
  {
    id: "ORD-1023",
    store: "Shein",
    date: "2025-06-01",
    status: "Processing",
    total: "$120.50",
  },
  {
    id: "ORD-1022",
    store: "Zara",
    date: "2025-05-20",
    status: "Delivered",
    total: "$89.99",
  },
];

const Orders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  const handleViewOrder = (order: any) => setSelectedOrder(order);

  return (
    <div className="px-4 md:px-16 py-6">
      <Heading size="2xl" weight="bold">
        Orders
      </Heading>
      <Text className="mt-2" color="muted">
        Review your past and current orders.
      </Text>

      {!mockOrders.length ? (
        <div className="mt-12 text-center space-y-4">
          <Text size="lg">You haven’t placed any orders yet.</Text>
          <Button
            variant="primary"
            onClick={() => (window.location.href = "/dashboard/new-order")}
          >
            Start Shopping
          </Button>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2">
          {mockOrders.map((order) => (
            <Card key={order.id} className="p-4 shadow-md bg-white rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <Heading size="md" weight="semibold">
                  {order.id}
                </Heading>
                <Text color="primary" weight="semibold">
                  {order.status}
                </Text>
              </div>
              <Text>
                <strong>Store:</strong> {order.store}
              </Text>
              <Text>
                <strong>Date:</strong> {order.date}
              </Text>
              <Text>
                <strong>Total:</strong> {order.total}
              </Text>
              <Button
                size="sm"
                className="mt-4"
                variant="outline"
                onClick={() => handleViewOrder(order)}
              >
                View Details
              </Button>
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
              <strong>Order ID:</strong> {selectedOrder.id}
            </Text>
            <Text>
              <strong>Store:</strong> {selectedOrder.store}
            </Text>
            <Text>
              <strong>Date:</strong> {selectedOrder.date}
            </Text>
            <Text>
              <strong>Status:</strong>{" "}
              <span className="text-primary font-extrabold">
                {selectedOrder.status}
              </span>
            </Text>
            <Text>
              <strong>Total:</strong> {selectedOrder.total}
            </Text>
            <Text>
              <strong>Delivery:</strong> John Doe, 123 Sample Street, Lagos
            </Text>

            {/* <div className="pt-4 space-x-2 flex justify-end">
              <Button
                variant="secondary"
                onClick={() => alert("Contacting Support...")}
              >
                Contact Support
              </Button>
             
            </div> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Orders;
