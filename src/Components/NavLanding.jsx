import { Link } from "react-router-dom";

export default function NavLanding() {
  return (
    <div className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue flex items-center justify-between px-4 sm:px-6 md:px-10 lg:px-28 py-4">
      <Link to="/" className="flex items-center">
        <img
          className="w-36 sm:w-42 md:w-48 lg:w-56"
          src="./images/panorama-light-logo.png"
          alt="panorama-logo"
        />
      </Link>
      {/* <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <p className="font-sans font-medium text-white text-base md:text-lg text-center md:text-left">
          New user? <span className="font-bold">First</span>
        </p> */}
      <Link to="/login">
        <button className="font-mono font-bold text-white px-3 py-1 border-2 border-slate-300 hover:bg-blue-800 shadow-md rounded-md bg-pano-dark-blue text-xs md:text-sm">
          Login
        </button>
      </Link>
      {/* </div> */}
    </div>
  );
}
