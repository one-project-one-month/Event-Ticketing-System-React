import type { ApiResponse } from "@/types/ApiResponse.ts";

export interface VerificationCodeData {
  verificationId: string;
  verificationCode: string;
  email: string;
  expiredTime: string;
  isused: boolean;
  createdby: string;
  createdat: string;
  modifiedby?: string;
  modifiedat?: string;
  deleteflag: boolean;
}

export type VerificationCodeResponse = ApiResponse<{ verificationCodes: VerificationCodeData[] }>

export type VerificationCodeByCode = ApiResponse<{ verificationCode: VerificationCodeData }>