import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoutes() {
  const getToken = () => {
    return localStorage.getItem("token");
  };
  let auth = getToken();
  return auth ? <Outlet /> : <Navigate to="/login" />;
}
