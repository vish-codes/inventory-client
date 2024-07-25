import { Link } from "react-router-dom";

export default function Button() {
  return (
    <div className="flex items-center justify-center my-8">
      <Link to="/dashboard">
        {" "}
        <button className="flex font-sans items-center justify-center rounded-3xl border-2 border-slate-400 font-bold text-xl bg-slate-300 shoadow-inner p-1 w-48 hover:bg-slate-400 hover:border-slate-300">
          Explore
        </button>
      </Link>
    </div>
  );
}
