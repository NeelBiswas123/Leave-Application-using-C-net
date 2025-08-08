// src/components/PrivateRoute.jsx
import { useContext }      from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext }     from "../context/AuthContext";

export default function PrivateRoute() {
  const { token } = useContext(AuthContext);

  // If we have a token, allow access. Otherwise send to /login.
  return token
    ? <Outlet />
    : <Navigate to="/login" replace />;
}
