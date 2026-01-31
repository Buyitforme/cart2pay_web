import { useEffect, useState } from "react";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../../Assets/svg_images/Logo2.svg";

import {
  X,
  Menu,
  User,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { Heading } from "../../Components/Typography";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/state";

const navLinks = [
  {
    label: "Home",
    to: "/dashboard",
    icon: <LayoutDashboard className="w-5 h-5" />,
  },
  {
    label: "Orders",
    to: "/dashboard/orders",
    icon: <ShoppingBag className="w-5 h-5" />,
    children: [
      {
        label: "Order details",
        to: "/dashboard/orders/order-details/:orderId",
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        label: "Quote",
        to: "/dashboard/orders/quote/:orderId",
        icon: <CreditCard className="w-5 h-5" />,
      },
      {
        label: "Payment Details",
        to: "/dashboard/orders/payment-details/:orderId",
        icon: <CreditCard className="w-5 h-5" />,
      },
    ],
  },
  {
    label: "Shop for me",
    to: "/dashboard/new-order",
    icon: <ShoppingBag className="w-5 h-5" />,
    children: [
      {
        label: "Address",
        to: "/dashboard/new-order/address",
        icon: <CreditCard className="w-5 h-5" />,
      },
    ],
  },
];

const UserHubNav = () => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { getUserProfileData } = useSelector(
    (state: RootState) => state.user_account_management,
  );
  const userData = getUserProfileData.data?.results?.data;
  const navigate = useNavigate();
  const handleClose = () => {
    setAnimate(true);
    setTimeout(() => {
      setOpen(false);
      setAnimate(false);
    }, 300);
  };
  const location = useLocation();

  // Close on route change
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  // Close on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <>
      <nav className="bg-white border-b border-gray-200 py-3 px-4 md:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/dashboard")}
          >
            <img src={logo} alt="logo" />
          </div>

          {/* Center Nav - Desktop only */}
          <div className="hidden md:flex flex-1 justify-center space-x-8">
            {navLinks.map((link) => {
              return (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={!link.children}
                  className={({ isActive: routerIsActive }) => {
                    const active = link.children
                      ? window.location.pathname.startsWith(link.to)
                      : routerIsActive;

                    return `
                    relative text-sm font-medium text-gray-700 pb-1
                    after:content-[''] after:absolute after:left-0 after:bottom-0 
                    after:h-[2px] after:w-0 after:bg-gray-400
                    after:transition-all after:duration-300
                    hover:after:w-full
                    ${active ? "after:w-full after:bg-gray-500 text-gray-900" : ""}
                  `;
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Right Icons - Desktop only */}
          <div className="hidden md:flex items-center space-x-6">
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) =>
                `
      relative pb-1 flex items-center gap-2
      after:content-[''] after:absolute after:left-0 after:bottom-0 
      after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 
      hover:after:w-full
      ${isActive ? "after:w-full after:bg-gray-500" : ""}
    `
              }
            >
              <User className="w-5 h-5 text-gray-700" />
              <span className="text-sm text-gray-600">Hi,</span>
              <Heading size="md" className="inline">
                {userData?.fullName?.split(" ")[0] ||
                  userData?.fullName ||
                  "User"}
              </Heading>
            </NavLink>
          </div>

          {/* Hamburger Menu - Mobile only */}
          <button
            onClick={() => setOpen(true)}
            className="md:hidden p-2 rounded bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </nav>

      {/* Mobile Side Drawer */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-50 transition-all duration-300"
          onClick={handleClose}
        >
          <div
            className={`absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col space-y-6 transition-all duration-300 ${
              animate ? "animate-slide-out" : "animate-slide-in"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <Heading size="lg" weight="bold" color="default">
                Menu
              </Heading>
              <button onClick={() => setOpen(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* User Profile Section */}
            <NavLink
              to="/dashboard/profile"
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                `flex items-center gap-2 pb-4 border-b border-gray-200 ${
                  isActive ? "text-gray-900" : "text-gray-700"
                }`
              }
            >
              <User className="w-5 h-5" />
              <div className="flex items-center gap-1.5">
                <span className="text-sm">Hi,</span>
                <Heading size="sm" className="inline">
                  {userData?.fullName?.split(" ")[0] ||
                    userData?.fullName ||
                    "User"}
                </Heading>
              </div>
            </NavLink>

            {/* Navigation Links */}
            {navLinks.map((link) => {
              const active = link.children
                ? window.location.pathname.startsWith(link.to)
                : window.location.pathname === link.to;

              return (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                  >
                    {/* Icon */}
                    {link.icon}

                    {/* Label with underline */}
                    <span
                      className={`
                  relative pb-1 w-fit
                  after:content-[''] after:absolute after:left-0 after:bottom-0
                  after:h-[2px] after:w-0 after:bg-gray-400
                  after:transition-all after:duration-300
                  hover:after:w-full
                  ${active ? "after:w-full after:bg-gray-500 text-gray-900" : ""}
                `}
                    >
                      {link.label}
                    </span>
                  </NavLink>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default UserHubNav;
