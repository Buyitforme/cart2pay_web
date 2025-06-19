import {
  createBrowserRouter,
  RouterProvider,
  RouteObject,
} from "react-router-dom";
import LandingPageMain from "../Pages/LandingPage/LandingPageMain";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPageMain />,
  },
  {
    path: "/about",
    element: "About us",
  },
  {
    path: "/contact-us",
    element: "contact us",
  },
  {
    path: "/how-it-works",
    element: "How t works",
  },
  {
    path: "/dashboard",
    element: "Dashboard",
  },
  {
    path: "/signin",
    element: "Signin",
  },
  {
    path: "/signup",
    element: "Signup",
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
