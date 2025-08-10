import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import LandingPageMain from "../Pages/LandingPage/LandingPageMain";
import AboutUs from "../Pages/AboutMain/AboutUs";
import HowItWorks from "../Pages/Howitworks";
import Login from "../Pages/Login";
import Signup from "../Pages/Signup";
import ContactUs from "../Pages/ContactUs";
import Stories from "../Pages/Stories";
import routeNames from "./RouteNames";
import ShareYourStory from "../Pages/LandingPage/ShareYourStory";
import UserHubLayout from "../Pages/UserHub/UserHubLayout";
import DashboardHome from "../Pages/UserHub/Home/UserDashboardMain";
import MainLayout from "../Components/MainLayout";
import NewOrder from "../Pages/UserHub/Orders/NewOrder";
import Quote from "../Pages/UserHub/Quote/Quote";
import Notifications from "../Pages/Notifications";
import UserProfile from "../Pages/UserProfile";
import Orders from "../Pages/UserHub/Orders/Orders";
import VerificationService from "../Pages/VerificationService";
import ForgotPassword from "../Pages/ForgotPassword";
import ResetPassword from "../Pages/ResetPassword";
import ProtectedRoutes from "./ProtectedRoutes";
import OrderDetails from "../Pages/UserHub/Orders/OrderDetails";
import Address from "../Pages/UserHub/Orders/Address";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <LandingPageMain /> },
      { path: routeNames.about, element: <AboutUs /> },
      { path: routeNames.contactUs, element: <ContactUs /> },
      { path: routeNames.howItWorks, element: <HowItWorks /> },
      { path: routeNames.stories, element: <Stories /> },
      { path: routeNames.share_story, element: <ShareYourStory /> },
    ],
  },
  { path: routeNames.signIn, element: <Login /> },
  { path: routeNames.signUp, element: <Signup /> },
  { path: routeNames.verificationService, element: <VerificationService /> },
  { path: routeNames.forgotPassword, element: <ForgotPassword /> },
  { path: routeNames.resetPassword, element: <ResetPassword /> },

  {
    element: <ProtectedRoutes />,
    children: [
      {
        path: "/dashboard",
        element: <UserHubLayout />,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "orders", element: <Orders /> },
          { path: "new-order", element: <NewOrder /> },
          { path: "orders/quote/:orderId", element: <Quote /> },
          { path: "orders/order-details/:orderId", element: <OrderDetails /> },
          { path: "profile", element: <UserProfile /> },
          { path: "notifications", element: <Notifications /> },
          { path: "settings", element: <>Settings</> },
          { path: "new-order/address", element: <Address /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <>Page not found</>,
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
