import { Link } from "react-router-dom";

const DashboardNavBar = () => {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  return (
    <div className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 py-4">
      <Link to="/dashboard" className="flex items-center">
        <img
          className="w-36 sm:w-42 md:w-48 lg:w-56 m-4" 
          src="./images/panorama-light-logo.png"
          alt="panorama-logo"
        />
      </Link>
      <button
        onClick={handleLogout}
        className="font-mono font-bold text-white px-3 py-1 border-2 border-slate-300 hover:bg-blue-800 shadow-md rounded-md bg-pano-dark-blue text-xs md:text-sm"
      >
        Logout
      </button>
    </div>
  );
};

export default DashboardNavBar;
