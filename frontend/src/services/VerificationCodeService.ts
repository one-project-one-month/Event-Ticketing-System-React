import { apiGet } from "@/types/apiClient";
import type {
  VerificationCodeByCode,
  VerificationCodeResponse,
} from "@/Admin/DataTypes/VerificationCode.ts";

export const getVerificationCodeList = () =>
  apiGet<VerificationCodeResponse["data"]>("api/VerificationCode/List");

export const getVerificationCodeByCode = (verificationCode: string) =>
  apiGet<VerificationCodeByCode["data"]>(
    `api/VerificationCode/Get/${verificationCode}`,
  );
