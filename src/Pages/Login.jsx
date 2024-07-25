import { Link } from "react-router-dom";
import BrandLogo from "../Components/BrandLogo";
import Heading from "../Components/Heading";

export default function Login() {
  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen md:flex-row">
      <div className="bg-indigo-50 shadow-lg flex flex-col border-2 border-gray-700 rounded-2xl px-8 py-4 sm:px-12 md:px-24">
        <BrandLogo>Inventory</BrandLogo>
        <Heading>Log In</Heading>
        <form className="bg-indigo-50 flex flex-col">
          <h2 className="mt-4 font-mono">Email</h2>
          <input
            className="border-2 font-mono shadow-inner"
            placeholder="Email"
            value="testing@example.com"
            type="text"
          />
          <h2 className="mt-4 font-mono">Password</h2>
          <input
            className="border-2 font-mono shadow-inner"
            placeholder="Password"
            type="password"
            value="password"
          />
            <button className="font-mono bg-indigo-400 border-2 text-white border-black rounded px-1 mt-6 mb-3">
              Login
            </button>
        </form>
      </div>
    </div>
  );
}
