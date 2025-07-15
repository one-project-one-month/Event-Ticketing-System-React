// src/Admin/components/ProtectedAdminRoute.tsx
import { Navigate, Outlet } from "react-router-dom";

export function ProtectedAdminRoute() {
  const isAuthenticated = !!localStorage.getItem("admin-token"); // change to real logic

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}
