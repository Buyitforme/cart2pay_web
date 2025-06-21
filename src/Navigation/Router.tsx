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

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPageMain />,
  },
  {
    path: "/about",
    element: <AboutUs />,
  },
  {
    path: "/contact-us",
    element: "contact us",
  },
  {
    path: "/how-it-works",
    element: <HowItWorks />,
  },
  {
    path: "/dashboard",
    element: "Dashboard",
  },
  {
    path: "/signin",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "*",
    element: "Page not found",
  },
];

const router = createBrowserRouter(routes);

const Router = () => {
  return <RouterProvider router={router} />;
};

export default Router;
