import { type ApiResponse } from "@/types/ApiResponse";

export interface LoginRequestData {
  userName: string;
  password: string;
}

export interface LoginResponseData {
  token: string;
  tokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
  requirePasswordChange: boolean;
}

export type LoginResponse = ApiResponse<LoginResponseData>;

export interface RefreshTokenRequestData {
  refreshToken: string;
}

export interface RefreshTokenResponseData {
  token: string;
  tokenExpiresAt: string;
  refreshToken: string;
  refreshTokenExpiresAt: string;
}

//Logout
export interface LogoutRequestData {
  refreshToken: string;
}

export interface ChangePasword {
  username: string;
  currentPassword: string;
  newPassword: string;
}

export type ChangePasswordResponse = ApiResponse<ChangePasword>;

export type LogoutResponseData = ApiResponse<null>;

export interface LogoutRequestData {
  refreshToken: string;
}
