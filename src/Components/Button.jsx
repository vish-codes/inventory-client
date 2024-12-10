import { Link } from "react-router-dom";

export default function Button() {
  return (
    <div className="flex items-center justify-center my-8 px-4">
      <Link to="/login">
        <button className="flex items-center justify-center rounded-3xl text-pano-blue border-2 border-pano-blue font-bold text-sm sm:text-sm md:text-base lg:text-lg bg-white shadow-inner py-1 w-32 sm:w-28 md:w-36 lg:w-48 hover:bg-blue-800 hover:text-white transition duration-300 ease-in-out">
          Explore
        </button>
      </Link>
    </div>
  );
}
