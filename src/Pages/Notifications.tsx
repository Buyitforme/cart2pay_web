import React, { useState } from "react";
import { Heading, Text } from "../Components/Typography";
import { Button } from "../Components/Button";

const initialNotifications = [
  {
    id: 1,
    title: "Order Confirmed",
    message: "Your order from Shein has been confirmed.",
    timestamp: "2 hours ago",
    read: false,
  },
  {
    id: 2,
    title: "Payment Received",
    message: "Your payment of ₦25,000 was successful.",
    timestamp: "Yesterday",
    read: true,
  },
  {
    id: 3,
    title: "New Update",
    message: "We're now supporting cart links from H&M!",
    timestamp: "2 days ago",
    read: false,
  },
];

const Notifications = () => {
  const [notifications, setNotifications] = useState(initialNotifications);

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((n) => ({
        ...n,
        read: true,
      }))
    );
  };

  return (
    <div className="min-h-screen bg-background px-4 py-6 md:px-10">
      <div className="flex items-center justify-between mb-6">
        <Heading size="md" weight="semibold" color="accent">
          Notifications
        </Heading>
        {notifications.some((n) => !n.read) && (
          <Button
            variant="ghost"
            size="sm"
            onClick={markAllAsRead}
            className="text-accent hover:text-primary"
          >
            Mark all as read
          </Button>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="text-center text-accent mt-20">
          <Text size="lg" weight="medium" color="default">
            You're all caught up!
          </Text>

          <Text size="sm" weight="medium" color="subtle">
            No new notifications.
          </Text>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.map((note) => (
            <div
              key={note.id}
              className={`p-4 rounded-xl shadow bg-white border ${
                note.read ? "border-muted_white" : "border-primary bg-highlight"
              }`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1 pr-4 ">
                  <Heading size="sm" weight="medium" color="default">
                    {note.title}
                  </Heading>

                  <Text size="sm" weight="medium" color="default" className='pt-3'>
                    {note.message}
                  </Text>
                </div>
                {!note.read && (
                  <span className="w-2 h-2 rounded-full bg-primary mt-1.5" />
                )}
              </div>

              <Text
                size="sm"
                weight="medium"
                color="default"
                className="mt-2 block text-muted_black"
              >
                {note.timestamp}
              </Text>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notifications;
