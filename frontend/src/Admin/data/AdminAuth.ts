import { useEffect, useState } from "react";
import {
  getAuthToken,
  saveTokens,
  clearTokens,
  getRefreshToken,
} from "@/Admin/utils/authTokenUtils";
import { Logout } from "@/services/AuthServices";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const { token, tokenExpireAt } = getAuthToken();
    return !!token && tokenExpireAt && new Date() < tokenExpireAt;
  });

  const login = (
    token: string,
    tokenExpiresAt: string,
    refreshToken: string,
    refreshTokenExpiresAt: string,
    _requirePasswordChange: boolean,
  ) => {
    saveTokens(
      token,
      tokenExpiresAt,
      refreshToken,
      refreshTokenExpiresAt
    );
    setIsAuthenticated(true);
  };

  const logout = async () => {
    try {
      const { refreshToken } = getRefreshToken();
      if (refreshToken) {
        await Logout({ refreshToken });
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      clearTokens();
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    const { token, tokenExpireAt } = getAuthToken();
    if (!token || (tokenExpireAt && new Date() > tokenExpireAt)) {
      logout();
    }
  }, []);

  return { isAuthenticated, login, logout };
}
