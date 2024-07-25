import { Link } from "react-router-dom";
import BrandLogo from "../Components/BrandLogo";
import Heading from "../Components/Heading";

export default function Login() {
  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen md:flex-row">
      {/* <div className="bg-indigo-50 shadow-lg flex flex-col border-2 border-gray-700 rounded-2xl px-8 py-4 sm:px-12 md:px-24">
        <BrandLogo>Inventory</BrandLogo>
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
          </div> */}
      <div class="w-full max-w-xs">
        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <BrandLogo>Inventory</BrandLogo>
          <p className="text-center my-4 font-sans font-bold font-3xl">Login</p>
          <div class="mb-4">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="username"
            >
              Username
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Username"
            />
          </div>
          <div class="mb-6">
            <label
              class="block text-gray-700 text-sm font-bold mb-2"
              for="password"
            >
              Password
            </label>
            <input
              class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="**********"
            />
            {/* <p class="text-red-500 text-xs italic">Please choose a password.</p> */}
          </div>
          <div class="flex items-center justify-between">
            <button
              class="bg-blue-700 hover:bg-pano-blue text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
            >
              Sign In
            </button>
            <a
              class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
              href="#"
            >
              Forgot Password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
