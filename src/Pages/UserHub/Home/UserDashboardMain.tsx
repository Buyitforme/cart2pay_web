import { useEffect } from "react";
import { Heading, Text } from "../../../Components/Typography";
import { Button } from "../../../Components/Button";
import { Link } from "react-router-dom";
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
  if (orderHistory.loading || !orderHistory.data) {
    return (
      <div className="flex justify-center items-center h-screen w-full">
        <PageLoader />
      </div>
    );
  }
  return (
    <div className="py-6 space-y-6 text-[#1E2A47]">
      <div>
        <div className="flex gap-1 items-center">
          <Heading size="xl">{greeting},</Heading>
          <Heading size="xl" weight="light">
            {getUserProfileData.loading ? (
              <span className="bg-gray-200 animate-pulse h-6 w-48 rounded inline-block align-middle"></span>
            ) : (
              userData?.fullName || (
                <SectionRenderer left={undefined} right={undefined} />
              )
            )}
          </Heading>
        </div>

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
            Submit your cart or item URL, and we’ll complete the checkout for
            you.
          </Text>
        </div>
        <Link to="/dashboard/new-order">
          <Button variant="primary" className="whitespace-normal py-8 md:py-0">
            Shop for me
          </Button>{" "}
        </Link>
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-xl shadow p-4">
        <Heading size="md" weight="bold" className="mb-4">
          Recent Orders
        </Heading>

        <div className="space-y-4">
          {orders.slice(0, 3).map((order: any) => (
            <div
              key={order._id}
              className="flex items-center justify-between border-b pb-2"
            >
              <div>
                {/* Store name */}
                <Text size="md" weight="medium">
                  {order.store || "Unknown Store"}
                </Text>

                {/* Date created & Status */}
                <Text size="sm" className="text-gray-500">
                  {new Date(order.createdAt).toLocaleDateString()} •{" "}
                  {capitalizeFirstLetter(order.status)}
                </Text>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Helpful Tip + CTA */}
      <div className="bg-[#708238] text-white rounded-xl p-6 shadow space-y-4">
        <Text size="sm" weight="medium">
          Tip:
        </Text>

        <Heading size="lg" weight="semibold" color="muted_white">
          Who doesn’t love a great deal? Check out these stores with huge
          discounts this week!
        </Heading>

        <Text size="sm" className="text-[#DCDCDC]">
          Spot something you love? send the item(s) URL our way, and we’ll
          handle the checkout for you.
        </Text>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
          <a
            href="https://www.fashionnova.com/collections/sale"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ Fashion Nova
            </Button>
          </a>

          <a
            href="https://www.shein.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ Shein
            </Button>
          </a>

          <a
            href="https://www.zara.com/ww/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ Zara
            </Button>
          </a>

          <a
            href="https://www2.hm.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              variant="secondary"
              className="w-full text-[#1E2A47] bg-white hover:bg-[#f5f5f5]"
            >
              🛍️ H&M
            </Button>
          </a>
        </div>
      </div>

      {/* Supported Stores */}
      <div className="bg-white rounded-xl shadow p-4">
        <Heading size="md" weight="bold" className="mb-4">
          Stores We Support
        </Heading>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {["Shein", "Zara", "Fashion Nova", "Amazon"].map((store) => (
            <div
              key={store}
              className="p-3 rounded-lg border text-center hover:shadow transition"
            >
              <Text weight="semibold">{store}</Text>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Links */}
      {/* <div className="flex flex-col md:flex-row gap-4">
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
      </div> */}
    </div>
  );
};

export default Home;
