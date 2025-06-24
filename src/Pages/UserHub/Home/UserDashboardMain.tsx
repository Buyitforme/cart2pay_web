import React from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Link } from "react-router-dom";

const Home = () => {
  const userName = "Chioma"; 

  return (
    <div className="py-6 space-y-6 text-[#1E2A47]">
      {/* Welcome */}
      <div>
        <Heading size="xl" weight="bold">
          👋 Welcome back, {userName}
        </Heading>
        <Text size="lg" className="text-gray-600 mt-1">
          Here’s a quick overview of your activity.
        </Text>
      </div>

      {/* Quick Action */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
        <div>
          <Heading size="lg" weight="semibold">
            Start a New Order
          </Heading>
          <Text size="sm" className="text-gray-500">
            Submit your cart and let us complete your checkout.
          </Text>
        </div>
        <Link to="/dashboard/new-order">
          <Button variant="primary">New Order</Button>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-4">
        <Heading size="md" weight="bold" className="mb-4">
          Recent Checkouts completed
        </Heading>

        <div className="space-y-4">
          <div className="flex items-center justify-between border-b pb-2">
            <div>
              <Text size="md" weight="medium">
                Zara
              </Text>
              <Text size="sm" className="text-gray-500">
                ₦25,000 • Paid
              </Text>
            </div>
            <Button variant="outline">Reorder</Button>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Text size="md" weight="medium">
                Shein
              </Text>
              <Text size="sm" className="text-gray-500">
                ₦13,500 • Paid
              </Text>
            </div>
            <Button variant="outline">Reorder</Button>
          </div>
        </div>
      </div>

      {/* Helpful Tip + CTA */}
      <div className="bg-[#708238] text-white rounded-xl p-6 shadow space-y-4">
        <Text size="sm" weight="medium">
          ℹ️ Tip:
        </Text>

        <Heading size="lg" weight="semibold" color="muted_white">
          We all love a good sale, right? These stores are offering massive
          discounts this week!
        </Heading>

        <Text size="sm" className="text-[#DCDCDC]">
          Go add your favorite items to cart and bring it to us to handle
          payments
        </Text>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <Link to="/dashboard/new-order?store=fashion-nova">
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ Fashion Nova
            </Button>
          </Link>

          <Link to="/dashboard/new-order?store=shein">
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ Shein
            </Button>
          </Link>

          <Link to="/dashboard/new-order?store=zara">
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ Zara
            </Button>
          </Link>

          <Link to="/dashboard/new-order?store=hm">
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ H&M
            </Button>
          </Link>
        </div>
      </div>

      {/* Supported Stores */}
      <div className="bg-white rounded-xl shadow p-4">
        <Heading size="md" weight="bold" className="mb-4">
          Stores We Support
        </Heading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Shein", "Zara", "Fashion Nova", "AliExpress", "Amazon"].map(
            (store) => (
              <div
                key={store}
                className="p-3 rounded-lg border text-center hover:shadow transition"
              >
                <Text weight="semibold">{store}</Text>
              </div>
            )
          )}
        </div>
      </div>

      {/* Quick Links */}
      <div className="flex flex-col md:flex-row gap-4">
        <Link to="/stories" className="flex-1">
          <div className="bg-white rounded-xl shadow p-4 text-center hover:bg-[#DCDCDC] transition">
            <Text weight="bold">📢 Share Your Story</Text>
          </div>
        </Link>

        <Link to="/contact-us" className="flex-1">
          <div className="bg-white rounded-xl shadow p-4 text-center hover:bg-[#DCDCDC] transition">
            <Text weight="bold">🛟 Contact Support</Text>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Home;
