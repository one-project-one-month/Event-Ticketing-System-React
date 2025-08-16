import { apiPost } from "@/types/apiClient";
import type {
  LoginResponseData,
  LoginRequestData,
  RefreshTokenResponseData,
  ChangePasword,
  ChangePasswordResponse,
  LogoutRequestData,
  LogoutResponseData,
  SettingChangePasswordResponse,
  SettingChangePasswordPayload,
} from "@/Admin/DataTypes/Auth";

export const Login = (payload: LoginRequestData) =>
  apiPost<LoginResponseData>(`api/Auth/Login`, payload);

export const RefreshToken = (payload: { refreshToken: string }) =>
  apiPost<RefreshTokenResponseData>(`api/Auth/RefreshToken`, payload);

export const FirstTimeChangePassword = (payload: ChangePasword) =>
  apiPost<ChangePasswordResponse>(`api/Auth/ChangePasswordFirstLogin`, payload);

export const SettingChangePassword = (payload: SettingChangePasswordPayload) =>
  apiPost<SettingChangePasswordResponse>(`api/Admin/ChangePassword`, payload);

export const Logout = (payload: LogoutRequestData) =>
  apiPost<LogoutResponseData>(`api/Auth/Logout`, payload);
