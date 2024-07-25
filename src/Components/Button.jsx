import { Link } from "react-router-dom";

export default function Button() {
  return (
    <div className="flex items-center justify-center my-8">
      <Link to="/dashboard">
        {" "}
        <button className="flex font-sans items-center justify-center rounded-3xl text-pano-blue border-2 border-pano-blue font-bold text-xl bg-white shoadow-inner p-1 w-48 hover:bg-blue-800 hover:text-white ">
          Explore
        </button>
      </Link>
    </div>
  );
}
