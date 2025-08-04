import { apiPost } from "@/types/apiClient";
import type {
    LoginResponseData,
    LoginRequestData
} from '@/Admin/DataTypes/Login';

export const Login = (payload: LoginRequestData) =>
  apiPost<LoginResponseData>(`api/Auth/Login`, payload);


