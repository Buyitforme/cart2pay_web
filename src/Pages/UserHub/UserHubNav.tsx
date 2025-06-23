import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { X, Menu, Bell, Settings,User } from "lucide-react"; // optional icons
import { Heading } from "../../Components/Typography";

const navLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Orders", to: "/dashboard/orders" },
  { label: "New Order", to: "/dashboard/new-order" },
  { label: "Payments", to: "/dashboard/payments" },
];

const UserHubNav = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <nav className="bg-white border-b border-gray-200 px-4 py-3 md:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end // 👈 this ensures only exact matches are considered active
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-gray-600 hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
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
        <div className="fixed inset-0 bg-black/30 z-50">
          <div className="absolute top-0 left-0 h-full w-64 bg-white shadow-lg p-6 flex flex-col space-y-6">
            <div className="flex justify-between items-center mb-4">
              <Link to="/" className="flex items-center space-x-1">
                <Heading size="lg" weight="bold" color="default">
                  Cart2
                </Heading>
                <Heading size="lg" weight="bold" color="primary">
                  PAY
                </Heading>
              </Link>
              <button onClick={() => setOpen(false)} className="text-gray-500">
                <X className="w-6 h-6" />
              </button>
            </div>

            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `text-sm font-medium ${
                    isActive
                      ? "text-primary font-bold"
                      : "text-gray-700 hover:text-primary"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserHubNav;
