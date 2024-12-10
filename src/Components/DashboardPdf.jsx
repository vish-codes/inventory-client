import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const DashboardPdf = () => {
  const [isLettersOpen, setIsLettersOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/", { replace: true });
  };

  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <NavLink to="/dashboard">
              <img
                className="h-8 w-auto"
                src="../images/panorama-light-logo.png"
                alt="Panorama Logo"
              />
            </NavLink>
          </div>
          <div className="flex items-center">
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/dashboard" label="Dashboard" />
                <NavItem to="/genpdf" label="Invoice" />
                <NavItem to="/genpayslip" label="Payslip" />

                <div className="relative">
                  <button
                    onClick={() => setIsLettersOpen(!isLettersOpen)}
                    className="text-gray-300 hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                  >
                    Letters ▼
                  </button>
                  {isLettersOpen && (
                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
                      <div
                        className="py-1"
                        role="menu"
                        aria-orientation="vertical"
                      >
                        <DropdownItem
                          to="/letters/offer"
                          label="Offer Letter"
                        />
                        <DropdownItem
                          to="/letters/appointment"
                          label="Appointment Letter"
                        />
                        <DropdownItem
                          to="/letters/appraisal"
                          label="Appraisal Letter"
                        />
                        <DropdownItem
                          to="/letters/training"
                          label="Training Letter"
                        />
                        <DropdownItem
                          to="/letters/experience"
                          label="Experience Letter"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `px-3 py-2 rounded-md text-sm font-medium ${
        isActive
          ? "bg-blue-900 text-white"
          : "text-gray-300 hover:bg-blue-700 hover:text-white"
      }`
    }
  >
    {label}
  </NavLink>
);

const DropdownItem = ({ to, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `block px-4 py-2 text-sm ${
        isActive ? "bg-gray-100 text-gray-900" : "text-gray-700"
      } hover:bg-gray-100`
    }
    role="menuitem"
  >
    {label}
  </NavLink>
);

export default DashboardPdf;
