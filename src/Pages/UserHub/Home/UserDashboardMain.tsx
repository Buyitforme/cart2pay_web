import { useEffect, useMemo, useState } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../../redux/state";
import { triggerGetUserProfile } from "../../../redux/features/UserAccountManagement/userAccountManagementThunk";
import { triggerOrderHistory } from "../../../redux/features/orderManagement/orderManagementThunk";
import { PageLoader } from "../../../Components/PageLoader";
import { capitalizeFirstLetter } from "../../../utils";
import {
  ArrowRight,
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
import { ArrowUpRight } from "lucide-react";

const Home = () => {
  const { getUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management
  );
  const { orderHistory } = useSelector(
    (state: RootState) => state.order_management
  );
  const [showPaymentReminder, setShowPaymentReminder] = useState(true);

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
    <div className="py-0 md:py-2 space-y-3  bg-background">
      {/* Greeting */}
      <div>
        <div className="flex flex-col md:flex-row md:items-center gap-0 md:gap-2">
          <Heading size="xl" weight="normal" className="text-primary">
            {greeting},
          </Heading>
          <Heading size="xl">{userData?.fullName}</Heading>
        </div>

        <Text size="lg" className="opacity-90 pt-3 md:pt-1 " weight="normal">
          Here is a quick overview of your activity
        </Text>
      </div>

      {/* Quick Stats Section */}
      <Heading size="lg" weight="semibold" className="mb-4 pt-4">
        Orders
      </Heading>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
        {[
          {
            label: "Pending",
            key: "pending",
            value: groupedOrders["pending"] || 0,
            icon: (
              <div className="p-2 sm:p-2 rounded-lg flex items-center justify-center bg-yellow-100">
                <TrendingUpDown className="w-8 h-8 sm:w-10 sm:h-10 text-yellow-800" />
              </div>
            ),
          },
          {
            label: "Approved",
            key: "approved",
            value: groupedOrders["approved"] || 0,
            icon: (
              <div className="p-2 sm:p-2 rounded-lg bg-secondary_light flex items-center justify-center bg-blue-100 ">
                <BookOpenCheck className="w-8 h-8 sm:w-10 sm:h-10 text-secondary" />
              </div>
            ),
          },
          {
            label: "Processed",
            key: "processed",
            value: groupedOrders["processed"] || 0,
            icon: (
              <div className="p-2 sm:p-2 rounded-lg bg-primary_light flex items-center justify-center bg-indigo-100 ">
                <PackageSearch className="w-8 h-8 sm:w-10 sm:h-10  text-indigo-800" />
              </div>
            ),
          },
          {
            label: "Shipped",
            key: "shipped",
            value: groupedOrders["shipped"] || 0,
            icon: (
              <div className="p-2 sm:p-2 rounded-lg bg-primary_light flex items-center justify-center bg-purple-100">
                <Truck className="w-8 h-8 sm:w-10 sm:h-10 text-purple-800" />
              </div>
            ),
          },
          {
            label: "Received",
            key: "received",
            value: groupedOrders["received"] || 0,
            icon: (
              <div className="p-2 sm:p-2 rounded-lg flex items-center justify-center bg-teal-100 ">
                <HandCoins className="w-8 h-8 sm:w-10 sm:h-10  text-teal-800" />
              </div>
            ),
          },
          {
            label: "Rejected",
            key: "rejected",
            value: groupedOrders["rejected"] || 0,
            icon: (
              <div className="p-2 sm:p-2 rounded-lg flex items-center justify-center bg-red-100">
                <BanknoteX className="w-8 h-8 sm:w-10 sm:h-10 text-red-800" />
              </div>
            ),
          },
        ].map((stat) => (
          <div
            key={stat.key}
            onClick={() =>
              navigate("/dashboard/orders", { state: { activeTab: stat.key } })
            }
            className="p-4 sm:p-5 rounded-xl shadow-md border border-gray-200 bg-white hover:shadow-lg hover:border-highlight transition-all duration-300 cursor-pointer flex flex-col justify-between gap-6"
          >
            {/* Top section */}
            <div className="flex justify-between items-start">
              <div>
                <Text size="sm" className="text-gray-600" weight="semibold">
                  {stat.label}
                </Text>
                <Heading size="xl" weight="bold" className="text-gray-900 mt-2">
                  {stat.value}
                </Heading>
              </div>
              {stat.icon}
            </div>

            {/* Bottom section */}
            <div
              className="flex gap-1 justify-start items-center cursor-pointer text-primary hover:text-primary-dark transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                navigate("/dashboard/orders", {
                  state: { activeTab: stat.key },
                });
              }}
            >
              <Text size="sm" weight="medium">
                View
              </Text>
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Action */}
      <div className="bg-white rounded-xl shadow p-4 md:p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-6">
        <div className="text-left">
          <Heading
            size="lg"
            weight="semibold"
            className="text-gray-900 leading-snug "
          >
            Start a New Order
          </Heading>
          <Text
            size="sm"
            className="text-gray-500 mt-2 text-sm md:text-base leading-relaxed"
          >
            Submit your cart or item link, and we’ll complete the checkout for
            you.
          </Text>
        </div>

        <Link to="/dashboard/new-order" className="self-start md:self-center">
          <Button
            variant="primary"
            className="px-6 py-2 md:px-8 md:py-3 text-sm md:text-base"
          >
            Shop for me
          </Button>
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl shadow-md p-4 sm:p-6">
        <div className="flex justify-between items-center gap-3 sm:gap-0 mb-6">
          <Heading size={{ base: "sm", sm: "lg" }} weight="bold">
            Recent Orders
          </Heading>
          <button
            onClick={() => navigate("/dashboard/orders")}
            className="text-primary hover:text-primary-dark transition-colors flex items-center gap-1 group self-start sm:self-auto"
          >
            <Text size="sm" weight="semibold" className="text-primary">
              View all
            </Text>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="space-y-3">
          {orders.length > 0 ? (
            orders.slice(0, 3).map((order: any) => (
              <div
                key={order._id}
                className="group bg-gray-50 bg-gray-50 rounded-xl p-3 sm:p-4 transition-all duration-300 shadow-md border border-transparent border-gray-200"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0">
                  <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    {/* Store Icon/Avatar */}
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center flex-shrink-0">
                      <ShoppingBag className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                    </div>

                    {/* Order Info */}
                    <div className="flex-1 min-w-0">
                      <Text
                        size={{ base: "sm", sm: "lg" }}
                        weight="semibold"
                        className="mb-1 truncate"
                      >
                        {order.store || "Unknown Store"}
                      </Text>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Text
                          size={{ base: "xs", sm: "sm" }}
                          className="text-gray-500"
                        >
                          {new Date(order.createdAt).toLocaleDateString(
                            "en-US",
                            {
                              month: "short",
                              day: "numeric",
                              year: "numeric",
                            }
                          )}
                        </Text>
                        <span className="text-gray-300 hidden xs:inline">
                          •
                        </span>
                        <span
                          className={`inline-flex items-center px-2 sm:px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            order.status === "pending"
                              ? "bg-yellow-100 text-yellow-600"
                              : order.status === "approved"
                              ? "bg-secondary_light text-secondary_dark"
                              : order.status === "processed"
                              ? "bg-primary_light text-primary_dark"
                              : order.status === "received"
                              ? "bg-green-100 text-green-600"
                              : "bg-gray-100 text-gray-800"
                          }`}
                        >
                          {capitalizeFirstLetter(order.status)}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* View Button */}
                  <Link
                    to={`/dashboard/orders/order-details/${order._id}`}
                    className="w-full sm:w-auto sm:ml-4"
                  >
                    <Button
                      className="w-auto sm:w-auto px-4 sm:px-6 py-2 sm:py-3 text-sm"
                      variant="outline"
                    >
                      View
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center justify-center py-12 sm:py-16 text-center px-4">
              {/* Empty State Illustration */}
              <div className="relative mb-6">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
                </div>
              </div>

              <Heading
                size={{ base: "sm", sm: "lg" }}
                weight="bold"
                className="mb-2"
              >
                No orders yet
              </Heading>
              <Text
                size={{ base: "sm", sm: "md" }}
                className="text-gray-500 mb-6 max-w-xs sm:max-w-sm px-4"
              >
                Browse stores and place your first order.
              </Text>
              <Link
                to="/dashboard/new-order"
                className="w-full max-w-xs sm:max-w-none sm:w-auto"
              >
                <Button className="w-full sm:w-auto px-6 py-3 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" />
                  Start Shopping
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Helpful Tip */}
      <div className="bg-secondary text-white rounded-2xl p-4 sm:p-6 md:p-8 shadow-xl relative overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute top-0 right-0 w-48 h-48 sm:w-64 sm:h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 sm:w-48 sm:h-48 bg-primary/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 space-y-4 sm:space-y-6">
          {/* Tip Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 border border-white/20">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <Text
              size={{ base: "xs", sm: "sm" }}
              weight="semibold"
              className="uppercase tracking-wide"
            >
              Hot Deals
            </Text>
          </div>

          {/* Main Heading */}
          <Heading
            size={{ base: "lg", sm: "xl", md: "2xl" }}
            weight="bold"
            className="leading-tight"
          >
            Who doesn't love a great deal? Check out these stores with huge
            discounts this week! 🎉
          </Heading>

          {/* Description */}
          <Text
            size={{ base: "sm", md: "lg" }}
            className="text-white/90 leading-relaxed"
          >
            Spot something you love? Send the item(s) URL our way, and we'll
            handle the rest!
          </Text>

          {/* Store Buttons Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 sm:gap-3 pt-2 sm:pt-4">
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
                link: "https://www.zara.com/ww/",
                discount: "New Arrivals",
              },
              {
                label: "Primark",
                link: "https://www.primark.com/en-us",
                discount: "Best Prices",
              },
              {
                label: "Asos",
                link: "https://www.asos.com/men/",
                discount: "20% Off",
              },
            ].map((store) => (
              <div key={store.label}>
                <a
                  href={store.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block"
                >
                  <div className="bg-highlight rounded-xl p-3 sm:p-4 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer h-full">
                    <div className="flex flex-col items-center text-center space-y-1.5 sm:space-y-2">
                      <Text
                        size={{ base: "xs", sm: "sm" }}
                        weight="semibold"
                        className="text-secondary group-hover:text-primary transition-colors line-clamp-1"
                      >
                        {store.label}
                      </Text>
                      <span className="inline-block bg-primary/10 text-primary text-[10px] sm:text-xs font-medium px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-full whitespace-nowrap">
                        {store.discount}
                      </span>
                    </div>
                  </div>
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Add a CTA */}
        <div className="flex items-center justify-center mt-6 sm:mt-8">
          <Button
            className="w-full sm:w-auto px-4 sm:px-6 py-2.5 sm:py-3  text-sm sm:text-base"
            variant="primary"
            onClick={() => navigate("/dashboard/new-order")}
            icon={<ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />}
          >
            Start shopping
          </Button>
        </div>
      </div>

      {/* Payment Reminder */}
      {orders.some((o: any) => o.status === "pending") &&
        showPaymentReminder && (
          <div className="fixed bottom-3 right-3 left-3 sm:left-auto sm:w-80 z-50 animate-slide-up">
            <div className="bg-white rounded-xl shadow-lg p-3 sm:p-4 relative overflow-hidden">
              <div className="relative z-10">
                {/* Close button */}
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => setShowPaymentReminder(false)}
                    className="w-7 h-7 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-all duration-200 hover:rotate-90"
                    aria-label="Close reminder"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <Text size="sm" className="mb-3 leading-snug">
                  Hi {userData?.fullName}, you have{" "}
                  <span className="font-bold text-base">
                    {groupedOrders["approved"] || 0}
                  </span>{" "}
                  approved{" "}
                  {groupedOrders["approved"] === 1 ? "order" : "orders"}{" "}
                  awaiting checkout. Complete your payment to avoid price
                  changes and stockouts.
                </Text>

                {/* Action button */}
            <Button
  className="w-full sm:w-auto px-3 py-2 text-xs sm:text-sm"
  variant="outline"
  onClick={(e) => {
    e.stopPropagation();
    navigate("/dashboard/orders", {
      state: { activeTab: "approved" },
    });
  }}
>
  {groupedOrders["approved"] === 1 ? "View Order" : "View Orders"}
</Button>

              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default Home;
