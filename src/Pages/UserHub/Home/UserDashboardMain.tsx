import { useEffect, useMemo } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerGetUserProfile } from "../../../redux/features/UserAccountManagement/userAccountManagementThunk";
import SectionRenderer from "../../../Components/SectionRenderer";
import { triggerOrderHistory } from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import { capitalizeFirstLetter } from "../../../utils";

const Home = () => {
  const { getUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management
  );
  const { orderHistory } = useSelector(
    (state: RootState) => state.order_management
  );

  const userData = getUserProfileData.data?.results?.data;
  const orders = orderHistory.data?.results || [];
  const navigate = useNavigate();

  const dispatch: AppDispatch = useDispatch();

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };
  const greeting = getGreeting();

  useEffect(() => {
    dispatch(triggerGetUserProfile({}));
  }, [dispatch]);

  useEffect(() => {
    dispatch(triggerOrderHistory({}));
  }, [dispatch]);
  const groupedOrders = useMemo(() => {
    const statusCounts: Record<string, number> = {};
    orders.forEach((order: any) => {
      statusCounts[order.status] = (statusCounts[order.status] || 0) + 1;
    });
    return statusCounts;
  }, [orders]);

  if (orderHistory.loading || !orderHistory.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6 text-[#1E2A47]">
      {/* Greeting */}
      <div>
           <Heading size="xl">
            {greeting}, {userData?.fullName}
          </Heading>
       

      <Text size="lg" className="text-gray-600 ">
        Here’s a quick overview of your activity.
      </Text>
      </div>
       

      {/* Quick Stats */}
      <Heading size="lg" weight="semibold">
        Orders
      </Heading>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Pending",
            key: "pending",
            value: groupedOrders["pending"] || 0,
          },
          {
            label: "Approved",
            key: "approved",
            value: groupedOrders["approved"] || 0,
          },
          {
            label: "Processed",
            key: "processed",
            value: groupedOrders["processed"] || 0,
          },
          {
            label: "Received",
            key: "received",
            value: groupedOrders["received"] || 0,
          },
        ].map((stat) => (
          <div key={stat.label} className={`p-4 rounded-lg shadow `}>
            <Heading size="lg">{stat.value}</Heading>
            <Text size="sm">{stat.label}</Text>
          </div>
        ))}
      </div>

      {/* Quick Action */}
      <div className="bg-white rounded-xl shadow p-4 flex items-center justify-between">
        <div>
          <Heading size="lg" weight="semibold">
            Start a New Order
          </Heading>
          <Text size="sm" className="text-gray-500">
            Submit your cart or item URL, and we’ll complete the checkout for
            you.
          </Text>
        </div>
        <Link to="/dashboard/new-order">
          <Button variant="primary" className="whitespace-normal py-8 md:py-0">
            Shop for me
          </Button>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-4">
        <div className="flex justify-between">
          <Heading size="md" weight="bold" className="mb-4">
            Recent Orders
          </Heading>
          <div
            className="cursor-pointer"
            onClick={() => navigate("/dashboard/orders")}
          >
            {" "}
            <Heading size="sm" weight="bold" className="mb-4 text-primary">
              View all
            </Heading>
          </div>
        </div>

        <div className="space-y-4">
          {orders.slice(0, 3).map((order: any) => (
            <div
              key={order._id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                <Text size="md" weight="medium">
                  {order.store || "Unknown Store"}
                </Text>
                <Text size="sm" className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()} •{" "}
                  {capitalizeFirstLetter(order.status)}
                </Text>
              </div>
              <Link to={`/dashboard/orders/order-details/${order._id}`}>
                <Button size="sm" variant="outline">
                  View
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Tip */}
      <div className="bg-[#708238] text-white rounded-xl p-6 shadow space-y-4">
        <Text size="sm" weight="medium">
          Tip:
        </Text>
        <Heading size="lg" weight="semibold" color="muted_white">
          Who doesn’t love a great deal? Check out these stores with huge
          discounts this week!
        </Heading>
        <Text size="sm" className="text-[#DCDCDC]">
          Spot something you love? Send the item(s) URL our way, and we’ll
          handle the checkout for you.
        </Text>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          {[
            {
              label: "Fashion Nova",
              link: "https://www.fashionnova.com/collections/sale",
            },
            { label: "Shein", link: "https://www.shein.com" },
            { label: "Zara", link: "https://www.zara.com/ww/" },
            { label: "H&M", link: "https://www2.hm.com" },
          ].map((store) => (
            <a
              key={store.label}
              href={store.link}
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="secondary"
                className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
              >
                🛍️ {store.label}
              </Button>
            </a>
          ))}
        </div>
      </div>

      {/* Supported Stores */}
      <div className="bg-white rounded-xl shadow p-4">
        <Heading size="md" weight="bold" className="mb-4">
          Stores We Support
        </Heading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Shein", "Zara", "Fashion Nova", "H&M"].map((store) => (
            <div
              key={store}
              className="p-3 rounded-lg border text-center hover:shadow transition"
            >
              <Text weight="semibold">{store}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Payment Reminder */}
      {orders.some((o: any) => o.status === "pending_payment") && (
        <div className="bg-red-100 border-l-4 border-red-500 p-4 rounded-md">
          <Text className="text-red-700">
            ⚠️ You have unpaid orders. Please complete payment to avoid delays.
          </Text>
        </div>
      )}

      {/* Support Section */}
      <div className="bg-white rounded-xl shadow p-4 space-y-3">
        <Heading size="md" weight="bold">
          Need Help?
        </Heading>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link to="/" className="flex-1">
            <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-gray-200 transition">
              <Text weight="bold">FAQs</Text>
            </div>
          </Link>
          <Link to="/contact-us" className="flex-1">
            <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-gray-200 transition">
              <Text weight="bold">Contact Support</Text>
            </div>
          </Link>
          <Link to="/dashboard/orders" className="flex-1">
            <div className="bg-gray-100 rounded-lg p-4 text-center hover:bg-gray-200 transition">
              <Text weight="bold">Track Orders</Text>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
