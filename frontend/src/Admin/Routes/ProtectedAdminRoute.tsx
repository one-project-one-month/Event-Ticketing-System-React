import { Navigate, Outlet } from "react-router-dom";

export function ProtectedAdminRoute() {
  const accessToken = localStorage.getItem("admin_access_token");
  const isAuthenticated = !!accessToken;

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}
