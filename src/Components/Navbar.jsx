import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    
    <div className="shadow-lg flex justify-between items-center border-2 border-amber-500 rounded-2xl px-12 py-2 m-4">
      <Link to="/">
        <h1 className="font-[pacifico] text-amber-400 flex flex-row justify-center items-center text-4xl m-2 cursor-pointer">
          Inventory
        </h1>
      </Link>
      <div className="flex items-center space-x-4">
        <p className="font-mono text-xl">Hello,</p>
        <div className="border-2 bg-amber-400 text-xl font-bold cursor-pointer border-amber-500 rounded-full w-14 h-14 flex items-center justify-center">
          U
        </div>
      </div>
    </div>
  );
}