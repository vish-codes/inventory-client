import { Link } from "react-router-dom";

export default function NavLanding() {
  return (
    <nav className="bg-gradient-to-r from-blue-700 to-blue-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center">
            <img
              className="h-8 w-auto"
              src="../images/panorama-light-logo.png"
              alt="Panorama Logo"
            />
          </Link>
          {/* <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <p className="font-sans font-medium text-white text-base md:text-lg text-center md:text-left">
          New user? <span className="font-bold">First</span>
        </p> */}
          <Link to="/login">
            <button className="bg-pano-blue hover:pano-dark-blue border-white border text-white font-bold py-1 px-3 rounded transition duration-300 ease-in-out">
              Login
            </button>
          </Link>
          {/* </div> */}
        </div>
      </div>
    </nav>
  );
}
