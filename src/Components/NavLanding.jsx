import { Link } from "react-router-dom";

export default function NavLanding() {
  return (
    <div className="shadow-lg sticky top-0 bg-gradient-to-t from-pano-blue to-pano-dark-blue flex justify-between items-center px-12 py-5 ">
      <Link to="/"> 
        {/* <h1 className="font-[pacifico] text-slate-600 text-4xl m-2 cursor-pointer">
          Inventory
        </h1> */}
        <img className="ml-9" src="./images/panorama-light-logo.png" alt="panorama-logo" />
      </Link>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <p className="font-sans font-medium text-white text-lg text-center md:text-left">
          New user? first
        </p>
        <Link to="/login">
          <button className="font-mono font-bold text-white px-3 border-2 border-slate-300 hover:bg-blue-800 shadow-md rounded-md bg-pano-dark-blue p-1">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
