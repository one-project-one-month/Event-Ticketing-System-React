import { apiPost } from "@/types/apiClient";
import type {
  CreateVerifyCodePayload,
  VerifyCodePayload,
} from "@/User/DataTypes/VerifyCode";

export const GetVerifyCode = (payload: CreateVerifyCodePayload) =>
  apiPost<boolean>("/api/VerificationCode/VerifyCode", payload);

export const VerifyCode = (payload: VerifyCodePayload) =>
  apiPost<boolean>("/api/VerificationCode/VerifyCode", payload);
