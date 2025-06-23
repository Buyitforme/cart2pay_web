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
import DashboardHome from "../Pages/UserHub/UserDashboardMain";
import MainLayout from "../Components/MainLayout";

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
  {
    path: "/dashboard",
    element: <UserHubLayout />,
    children: [
      { index: true, element: <DashboardHome /> },
      { path: "orders", element: <>Orders</> },
      { path: "payments", element: <>Payments</> },
      { path: "profile", element: <>Profile</> },
      { path: "new-order", element: <>New Order</> },
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
