import { Link, useNavigate } from "react-router-dom";
import { BadgePlus, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";

const DashboardPdf = () => {
   function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  return (
    /*
    <div className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 py-4">
      <Link to="/dashboard" className="flex items-center">
        <img
          className="w-36 sm:w-42 md:w-48 lg:w-56 m-4"
          src="./images/panorama-light-logo.png"
          alt="panorama-logo"
        />
      </Link>
      <div className="flex space-x-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="font-mono font-bold text-white px-3 py-1 border-2 border-slate-300 hover:bg-blue-800 shadow-md rounded-md bg-pano-dark-blue text-xs md:text-sm"
        >
          &larr; Dashboard
        </button>
        <button
          onClick={handleLogout}
          className="font-mono font-bold text-white px-3 py-1  hover:bg-red-700 shadow-lg rounded-md bgwhite text-xs md:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
    */
    <nav className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue shadow-lg py-3">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <Link to="/dashboard" className="flex items-center">
              <img
                className="w-36 sm:w-42 md:w-48 lg:w-56 m-4"
                src="./images/panorama-light-logo.png"
                alt="panorama-logo"
              />
            </Link>
          </div>
          <div className="hidden md:flex items-center space-x-3">
            <a
              href="/dashboard"
              className="py-4 px-2 text-white font-semibold hover:text-green-400 transition duration-300"
            >
              Home
            </a>
            <a
              href="/genpdf"
              className="py-4 px-2 text-white font-semibold hover:text-green-400 transition duration-300"
            >
              Invoice
            </a>
            <a
              href="/genpayslip"
              className="py-4 px-2 text-white font-semibold hover:text-green-400 transition duration-300"
            >
              Payslip
            </a>
            <button  onClick={handleLogout} className="bgwhite hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center transition duration-300">
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </button>
          </div>
          <div className="md:hidden flex items-center">
            <button
              className="outline-none mobile-menu-button"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6 text-white" />
              ) : (
                <Menu className="h-6 w-6 text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="mobile-menu md:hidden">
          <a
            href="#"
            className="block py-2 px-4 text-sm hover:bg-green-400 hover:text-white transition duration-300"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-sm hover:bg-green-400 hover:text-white transition duration-300"
          >
            About
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-sm hover:bg-green-400 hover:text-white transition duration-300"
          >
            Services
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-sm hover:bg-green-400 hover:text-white transition duration-300"
          >
            Contact
          </a>
          <button  onClick={handleLogout} className="block w-full text-left py-2 px-4 text-sm bgwhite text-white hover:bg-red-600 transition duration-300">
            <LogOut  className="h-4 w-4 inline mr-2" />
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default DashboardPdf;
