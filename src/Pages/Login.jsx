import { Link, useNavigate } from "react-router-dom";
import BrandLogo from "../Components/BrandLogo";
import Heading from "../Components/Heading";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../App";
import LoaderMain from "../Components/LoaderMain";

export default function Login() {
  const [error, setError] = useState(false);
  const [details, setDetails] = useState({ email: "", password: "" });
  const [loginLoading, setLoginLoading] = useState(false);
  const { isLoading } = useContext(AppContext);

  const navigate = useNavigate();

  function handleChange(e) {
    const { value, name } = e.target;
    setDetails({ ...details, [name]: value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (details.email === "" && details.password === "") return;

    try {
      setLoginLoading(true);
      const res = await fetch(
        "https://panorama-server-i79k.onrender.com/api/v1/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(details),
        }
      );
      if (!res.ok) {
        setError(true);
        setDetails({ email: "", password: "" });
        throw new Error("Invalid credentials");
      }
      const data = await res.json();
      localStorage.setItem("token", `Bearer ${data.token}`);
      setError(false);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setLoginLoading(false);
    }
  }

  return (
    <div className="bg-gray-50 flex flex-col justify-center items-center min-h-screen md:flex-row">
      {isLoading && loginLoading ? (
        <LoaderMain />
      ) : (
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <BrandLogo>Inventory</BrandLogo>
            <p className="text-center my-4 font-sans font-bold text-2xl">
              Login
            </p>
            {error ? (
              <p className="text-sm text-center text-red-400">
                Invalid Email or Password!
              </p>
            ) : null}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                name="email"
                type="text"
                placeholder="Email"
                value={details.email}
                onChange={handleChange}
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="password"
                name="password"
                type="password"
                placeholder="**********"
                value={details.password}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center justify-between w-full">
              <button
                className="bg-blue-700 w-full hover:bg-blue-800 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
                disabled={loginLoading}
              >
                Login
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
