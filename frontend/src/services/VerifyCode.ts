import { apiPost } from "@/types/apiClient";
import type {
  CreateVerifyCodePayload,
  VerifyCodePayload,
  VeryfyResponse
} from "@/User/DataTypes/VerifyCode";

export const GetVerifyCode = (payload: CreateVerifyCodePayload) =>
  apiPost<VeryfyResponse>("/api/VerificationCode/Create", payload);

export const VerifyCode = (payload: VerifyCodePayload) =>
  apiPost<VeryfyResponse>("/api/VerificationCode/VerifyCode", payload);
