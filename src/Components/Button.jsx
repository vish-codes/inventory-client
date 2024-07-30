import { Link } from "react-router-dom";

export default function Button() {
  return (
    <div className="flex items-center justify-center my-8 px-4">
      <Link to="/login">
        <button className="flex items-center justify-center rounded-3xl text-pano-blue border-2 border-pano-blue font-bold text-base sm:text-sm md:text-xl lg:text-2xl bg-white shadow-inner p-2 sm:p-1 md:p-4 lg:p-1 w-40 sm:w-28 lg:w-56 hover:bg-blue-800 hover:text-white transition duration-300 ease-in-out">
          Explore
        </button>
      </Link>
    </div>
  );
}
