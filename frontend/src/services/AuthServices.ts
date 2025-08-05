import { apiPost } from "@/types/apiClient";
import type {
  LoginResponseData,
  LoginRequestData,
  RefreshTokenResponseData
} from '@/Admin/DataTypes/Auth';

export const Login = (payload: LoginRequestData) =>
  apiPost<LoginResponseData>(`api/Auth/Login`, payload);

export const RefreshToken = (payload: { refreshToken: string }) =>
  apiPost<RefreshTokenResponseData>(`api/Auth/RefreshToken`, payload);
