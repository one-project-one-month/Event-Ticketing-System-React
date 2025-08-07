import { apiPost } from "@/types/apiClient";
import type {
  LoginResponseData,
  LoginRequestData,
  RefreshTokenResponseData,
  LogoutRequestData,
  LogoutResponseData,
} from "@/Admin/DataTypes/Auth";

export const Login = (payload: LoginRequestData) =>
  apiPost<LoginResponseData>(`api/Auth/Login`, payload);

export const RefreshToken = (payload: { refreshToken: string }) =>
  apiPost<RefreshTokenResponseData>(`api/Auth/RefreshToken`, payload);

export const Logout = (payload: LogoutRequestData) =>
  apiPost<LogoutResponseData>(`api/Auth/Logout`, payload);
