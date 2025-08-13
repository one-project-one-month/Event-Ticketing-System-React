import { Navigate, Outlet } from "react-router-dom";
import { getAuthToken } from "@/Admin/utils/authTokenUtils";

export function ProtectedAdminRoute() {
  const { token, tokenExpireAt } = getAuthToken();

  const isAuthenticated =
    !!token && tokenExpireAt && new Date() < new Date(tokenExpireAt);

  return isAuthenticated ? <Outlet /> : <Navigate to="/admin/login" />;
}
