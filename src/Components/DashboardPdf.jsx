import { Link, useNavigate } from "react-router-dom";

const DashboardPdf = () => {
  function handleLogout() {
    localStorage.removeItem("token");
    window.location.href = "/";
  }

  const navigate = useNavigate();
  return (
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
          className="font-mono font-bold text-white px-3 py-1  hover:bg-red-700 shadow-lg rounded-md bg-red-500 text-xs md:text-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPdf;
