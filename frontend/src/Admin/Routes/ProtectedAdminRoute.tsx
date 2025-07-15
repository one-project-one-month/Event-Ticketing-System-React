import { Navigate, Outlet } from "react-router-dom";

export function ProtectedAdminRoute() {
  const isAuthenticated = !!localStorage.getItem("admin-token"); 

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}
