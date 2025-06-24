import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {
  X,
  Menu,
  Bell,
  Settings,
  User,
  LayoutDashboard,
  ShoppingBag,
  CreditCard,
  User as UserIcon,
} from "lucide-react";
import { Heading } from "../../Components/Typography";

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
  },
  {
    label: "New Order",
    to: "/dashboard/new-order",
    icon: <ShoppingBag className="w-5 h-5" />,
    children: [
      {
        label: "Payment",
        to: "/dashboard/new-order/payment", // <-- corrected
        icon: <CreditCard className="w-5 h-5" />,
      },
    ],
  },
];

const UserHubNav = () => {
  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState(false);

  const handleClose = () => {
    setAnimate(true);
    setTimeout(() => {
      setOpen(false);
      setAnimate(false);
    }, 300);
  };
  // Updated Navigation Component
  // Updated Navigation Component
  return (
    <>
      <nav className="bg-white border-b border-gray-200 py-3 px-4 md:px-16">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-1">
            <Heading size="lg" weight="bold" color="default">
              Cart2
            </Heading>
            <Heading size="lg" weight="bold" color="primary">
              PAY
            </Heading>
          </Link>

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

                    return `text-sm font-medium ${
                      active
                        ? "text-primary font-bold"
                        : "text-gray-600 hover:text-primary"
                    }`;
                  }}
                >
                  {link.label}
                </NavLink>
              );
            })}
          </div>

          {/* Right Icons - Desktop only */}
          <div className="hidden md:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-primary">
              <Bell className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-primary">
              <Settings className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-primary">
              <User className="w-5 h-5" />
            </button>
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

            {navLinks.map((link) => {
              const active = link.children
                ? window.location.pathname.startsWith(link.to)
                : window.location.pathname === link.to;

              return (
                <div key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center space-x-2 text-sm font-medium ${
                      active
                        ? "text-primary font-bold"
                        : "text-gray-700 hover:text-primary"
                    }`}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </NavLink>

                  {/* Render child navigation items if they exist */}
                  {/* {link.children && (
                    <div className="ml-6 mt-2 space-y-2">
                      {link.children.map((child) => (
                        <NavLink
                          key={child.to}
                          to={child.to}
                          onClick={() => setOpen(false)}
                          className={({ isActive }) =>
                            `flex items-center space-x-2 text-xs font-medium ${
                              isActive
                                ? "text-primary font-bold"
                                : "text-gray-600 hover:text-primary"
                            }`
                          }
                        >
                          {child.icon}
                          <span>{child.label}</span>
                        </NavLink>
                      ))}
                    </div>
                  )} */}
                </div>
              );
            })}

            <div className="mt-auto pt-24 border-t border-gray-200">
              <div className="flex flex-col gap-6">
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary">
                  <Settings className="w-5 h-5" />
                  <span>Notifications</span>
                </button>
                <button className="flex items-center space-x-2 text-sm font-medium text-gray-700 hover:text-primary">
                  <User className="w-5 h-5" />
                  <span>Profile</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHubNav;
