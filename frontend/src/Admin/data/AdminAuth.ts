import { useEffect, useState } from "react";

export function useAdminAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const accessToken = document.cookie
      .split('; ')
      .find(row => row.startsWith('access_token='))?.split('=')[1];

    setToken(accessToken ?? null);
    setIsAuthenticated(!!accessToken);
  }, []);

  const login = (accessToken: string, refreshToken: string) => {
    document.cookie = `access_token=${accessToken}; path=/; SameSite=Strict`;

    document.cookie = `refresh_token=${refreshToken}; path=/; HttpOnly; Secure; SameSite=Strict`;

    setToken(accessToken);
    setIsAuthenticated(true);
  };

  const logout = () => {
    document.cookie = "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
    document.cookie = "refresh_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    setToken(null);
    setIsAuthenticated(false);
  };

  return { isAuthenticated, token, login, logout };
}
