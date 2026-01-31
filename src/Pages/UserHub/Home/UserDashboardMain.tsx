import { useEffect, useMemo, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerOrderHistory } from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import {
  ArrowRight,
  ArrowUpRight,
  BanknoteX,
  BookOpenCheck,
  HandCoins,
  PackageSearch,
  ShoppingBag,
  ShoppingCart,
  TrendingUpDown,
  Truck,
  X,
} from "lucide-react";

const ORDER_STATS = [
  {
    key: "pending",
    label: "Pending",
    icon: <TrendingUpDown className="w-8 h-8 text-secondary" />,
    bg: "bg-highlight",
  },
  {
    key: "approved",
    label: "Approved",
    icon: <BookOpenCheck className="w-8 h-8 text-secondary" />,
    bg: "bg-highlight",
  },
  {
    key: "processed",
    label: "Processed",
    icon: <PackageSearch className="w-8 h-8 text-secondary" />,
    bg: "bg-highlight",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: <Truck className="w-8 h-8 text-secondary" />,
    bg: "bg-highlight",
  },
  {
    key: "received",
    label: "Received",
    icon: <HandCoins className="w-8 h-8 text-secondary" />,
    bg: "bg-highlight",
  },
  {
    key: "rejected",
    label: "Rejected",
    icon: <BanknoteX className="w-8 h-8 text-secondary" />,
    bg: "bg-highlight",
  },
];

const Home = () => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();

  const { getUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management,
  );
  const { orderHistory } = useSelector(
    (state: RootState) => state.order_management,
  );

  const [showPaymentReminder, setShowPaymentReminder] = useState(true);

  const user = getUserProfileData.data?.results?.data;
  const orders = orderHistory.data?.results || [];

  useEffect(() => {
    // dispatch(triggerGetUserProfile({}));
    dispatch(triggerOrderHistory({}));
  }, [dispatch]);

  const groupedOrders = useMemo(() => {
    return orders.reduce((acc: Record<string, number>, order: any) => {
      acc[order.status] = (acc[order.status] || 0) + 1;
      return acc;
    }, {});
  }, [orders]);

  const greeting = (() => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  })();

  if (orderHistory.loading || !orderHistory.data) {
    return (
      <div className="flex items-center justify-center h-screen">
        <PageLoader />
      </div>
    );
  }

  return (
    <div className="p-4 sm:p-6 bg-background">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* ================= MAIN CONTENT ================= */}
        <main className="lg:col-span-3 space-y-8">
          {" "}
          {/* ===== Header ===== */}
          <header>
            <div className="flex flex-wrap items-center gap-2">
              <Heading size="xl" weight="normal">
                {greeting},
              </Heading>
              <Heading size="xl">
                {user?.fullName?.split(" ")[0] || "User"}
              </Heading>
            </div>
            <Text size="lg" className="opacity-80 mt-2">
              Track your orders or request a new purchase{" "}
            </Text>
          </header>
          {/* ===== Order Stats ===== */}
          <section className="bg-white rounded-2xl p-6 shadow-sm border ">
            {" "}
            <Heading size="lg" weight="semibold" className="mb-4">
              Orders
            </Heading>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {ORDER_STATS.map(({ key, label, icon, bg }) => (
                <div
                  key={key}
                  onClick={() =>
                    navigate("/dashboard/orders", { state: { activeTab: key } })
                  }
                  className="cursor-pointer bg-white border border-2 rounded-xl p-5 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <Text
                        size="sm"
                        className="text-secondary"
                        weight="semibold"
                      >
                        {label}
                      </Text>
                      <Heading size="xl" className="mt-2">
                        {groupedOrders[key] || 0}
                      </Heading>
                    </div>

                    <div
                      className={`p-2 rounded-lg flex items-center justify-center ${bg}`}
                    >
                      {icon}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mt-6 text-primary">
                    <Text size="sm" weight="medium">
                      View
                    </Text>
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              ))}
            </div>
          </section>
          {/* ===== Recent Orders ===== */}
          <section className="bg-white rounded-2xl p-6 shadow">
            <div className="flex justify-between items-center mb-6">
              <Heading size="lg" weight="bold">
                Recent Orders
              </Heading>
              <button
                onClick={() => navigate("/dashboard/orders")}
                className="flex items-center gap-1 text-primary"
              >
                <Text size="sm" weight="semibold">
                  View all
                </Text>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-12">
                <ShoppingBag className="mx-auto w-10 h-10 text-gray-400 mb-4" />
                <Heading size="lg">No orders yet</Heading>
                <Text size="sm" className="text-gray-500 mt-2">
                  Start shopping to see your orders here.
                </Text>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 3).map((order: any) => (
                  <div
                    key={order._id}
                    className="flex justify-between items-center bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition"
                  >
                    <div>
                      <Text weight="semibold">
                        {order.store || "Unknown Store"}
                      </Text>
                      <Text size="xs" className="pt-2">
                        Date Created :{" "}
                        {new Date(order.createdAt).toDateString()}
                      </Text>
                    </div>

                    <Link to={`/dashboard/orders/order-details/${order._id}`}>
                      <Button variant="outline">See details</Button>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </section>
        </main>

        {/* ================= RIGHT RAIL ================= */}
        <aside className="space-y-6 lg:sticky lg:top-6 h-fit">
          {/* Quick Action Card */}
          <div className="bg-gradient-to-br from-secondary to-secondary_dark rounded-2xl p-6 text-white shadow-lg">
            <div className="mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
             <Heading size="lg" className="text-white mb-2">
  Start a New Order
</Heading>
<Text size="lg" className="text-white/90">
  Just share the product link—we'll handle{" "}
  <span className="font-bold text-primary">everything</span> else.
</Text>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="whitespace-nowrap"
              onClick={() => navigate("/dashboard/new-order")}
            >
              Share a product link
            </Button>
          </div>
          {/* ===== Hot Deals ===== */}
          <div className="bg-secondary text-white rounded-2xl p-5 shadow-lg">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg">🔥</span>
              <Heading size="sm" weight="bold">
                Hot Deals
              </Heading>
            </div>

            <Text size="sm" className="text-white/80 mb-4">
              Big discounts from your favorite stores
            </Text>

            <div className="space-y-3">
              {[
                {
                  label: "Fashion Nova",
                  link: "https://www.fashionnova.com/collections/sale",
                  discount: "Up to 70%",
                },
                {
                  label: "Shein",
                  link: "https://www.shein.com",
                  discount: "Flash Sale",
                },
                {
                  label: "Zara",
                  link: "https://www.zara.com",
                  discount: "New Arrivals",
                },
                {
                  label: "Asos",
                  link: "https://www.asos.com",
                  discount: "20% Off",
                },
              ].map((store) => (
                <a
                  key={store.label}
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block bg-white/10 hover:bg-white/20 rounded-lg p-3 transition"
                >
                  <Text weight="semibold">{store.label}</Text>
                  <span className="text-xs opacity-80">{store.discount}</span>
                </a>
              ))}
            </div>
          </div>
        </aside>

        {/* ===== Payment Reminder (unchanged) ===== */}
        {groupedOrders["approved"] > 0 && showPaymentReminder && (
          <div className="fixed bottom-4 right-4 z-50 bg-white rounded-xl p-4 shadow-lg max-w-sm">
            <button
              onClick={() => setShowPaymentReminder(false)}
              className="absolute top-2 right-2"
            >
              <X className="w-4 h-4" />
            </button>

            <Text size="sm">
              You have{" "}
              <span className="font-bold">{groupedOrders["approved"]}</span>{" "}
              approved orders awaiting checkout.
            </Text>

            <Button
              variant="outline"
              className="mt-3"
              onClick={() =>
                navigate("/dashboard/orders", {
                  state: { activeTab: "approved" },
                })
              }
            >
              View orders
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
