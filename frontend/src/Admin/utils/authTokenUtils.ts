export const getAuthToken = () => {
  const token = sessionStorage.getItem("accessToken");
  const tokenExpireAt = sessionStorage.getItem("accessTokenExpireAt");
  const parsedTokenExpireAt = tokenExpireAt ? new Date(tokenExpireAt) : null;

  return {
    token,
    tokenExpireAt: parsedTokenExpireAt,
  };
};

export const getRefreshToken = () => {
  const refreshToken = sessionStorage.getItem("refreshToken");
  const refreshTokenExpireAt = sessionStorage.getItem("refreshTokenExpireAt");

  return {
    refreshToken,
    refreshTokenExpireAt: refreshTokenExpireAt ? new Date(refreshTokenExpireAt) : null,
  };
};

export const saveTokens = (
  token: string,
  tokenExpiredAt: string,
  refreshToken: string,
  refreshTokenExpireAt: string
) => {

  sessionStorage.setItem("accessToken", token);
  sessionStorage.setItem("accessTokenExpireAt", tokenExpiredAt);
  sessionStorage.setItem("refreshToken", refreshToken);
  sessionStorage.setItem("refreshTokenExpireAt", refreshTokenExpireAt);
};

export const clearTokens = () => {
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("accessTokenExpireAt");
  sessionStorage.removeItem("refreshToken");
  sessionStorage.removeItem("refreshTokenExpireAt");
};
