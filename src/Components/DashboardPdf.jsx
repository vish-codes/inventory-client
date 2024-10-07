import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

const DashboardPdf = () => {
  const [isLettersOpen, setIsLettersOpen] = useState(false);
  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <nav className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 py-4">
      <Link to="/dashboard" className="flex items-center">
        <img
          className="w-36 sm:w-42 md:w-48 lg:w-56 m-4"
          src="./images/panorama-light-logo.png"
          alt="panorama-logo"
        />
      </Link>

      <div className="flex items-center space-x-4">
        <NavButton onClick={() => navigate("/dashboard")} text="Dashboard" />
        <NavButton onClick={() => navigate("/genpayslip")} text="Payslip" />
        <NavButton onClick={() => navigate("/genpdf")} text="Invoice" />

        <div className="relative">
          <NavButton
            onClick={() => setIsLettersOpen(!isLettersOpen)}
            text="Letters ▼"
          />
          {isLettersOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <DropdownItem
                  onClick={() => navigate("/letters/offer")}
                  text="Offer Letter"
                />
                <DropdownItem
                  onClick={() => navigate("/letters/appointment")}
                  text="Appointment Letter"
                />
                <DropdownItem
                  onClick={() => navigate("/letters/termination")}
                  text="Termination Letter"
                />
              </div>
            </div>
          )}
        </div>

        <button
          onClick={handleLogout}
          className="font-mono font-bold text-white px-3 py-1 hover:bg-red-700 shadow-lg rounded-md bg-red-500 text-xs md:text-sm"
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

const NavButton = ({ onClick, text }) => (
  <button
    onClick={onClick}
    className="font-mono font-bold text-white px-3 py-1 border-2 border-slate-300 hover:bg-blue-800 shadow-md rounded-md bg-pano-dark-blue text-xs md:text-sm"
  >
    {text}
  </button>
);

const DropdownItem = ({ onClick, text }) => (
  <a
    href="#"
    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
    role="menuitem"
    onClick={(e) => {
      e.preventDefault();
      onClick();
    }}
  >
    {text}
  </a>
);

export default DashboardPdf;
