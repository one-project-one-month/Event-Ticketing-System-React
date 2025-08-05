import { useEffect, useState } from "react";
import {
  getAuthToken,
  saveTokens,
  clearTokens,
} from "@/Admin/utils/authTokenUtils";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const { token, tokenExpireAt } = getAuthToken();
    return !!token && tokenExpireAt && new Date() < tokenExpireAt;
  });

  const login = (
    token: string,
    tokenExpiresAt: string,
    refreshToken: string,
    refreshTokenExpiresAt: string
  ) => {
  saveTokens(token, tokenExpiresAt, refreshToken, refreshTokenExpiresAt);
  setIsAuthenticated(true);
  };

  const logout = () => {
    clearTokens();
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const { token, tokenExpireAt } = getAuthToken();
    if (!token || (tokenExpireAt && new Date() > tokenExpireAt)) {
      logout();
    }
  }, []);

  return { isAuthenticated, login, logout };
}
