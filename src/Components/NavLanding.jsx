import { Link } from "react-router-dom";

export default function NavLanding() {
  return (
    <div className="shadow-lg bg-slate-200 flex justify-between items-center border-2 border-gray-400 rounded-2xl px-12 py-2 m-4">
      <Link to="/">
        <h1 className="font-[pacifico] text-slate-600 text-4xl m-2 cursor-pointer">
          Inventory
        </h1>
      </Link>
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 mt-4 md:mt-0">
        <p className="font-sans font-medium text-slate-900 text-lg text-center md:text-left">
          New user? first
        </p>
        <Link to="/login">
          <button className="font-mono font-bold px-3 border-2 border-slate-300 hover:bg-slate-400 shadow-md rounded-md bg-slate-400 p-1">
            Login
          </button>
        </Link>
      </div>
    </div>
  );
}
