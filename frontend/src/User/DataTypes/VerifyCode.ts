import {type ApiResponse } from "@/types/ApiResponse";

export interface CreateVerifyCodePayload {
  email: string;
}

export type VeryfyResponse = ApiResponse<{
  response : CreateVerifyCodePayload
}>

export interface VerifyCodePayload {
  verificationCode: string;
  email: string;
}
