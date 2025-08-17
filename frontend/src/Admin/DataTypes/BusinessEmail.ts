import type { ApiResponse } from "@/types/ApiResponse.ts";

export interface BusinessEmailData {
  businessEmailId: string;
  businessEmailCode: string;
  fullName: string;
  phone: string;
  email: string;
  createdby: string;
  createdat: string;
}

export type BusinessEmailResponse = ApiResponse<{
  businessEmailList: BusinessEmailData[];
}>;

export type BusinessEmailByCode = ApiResponse<{
  businessEmail: BusinessEmailData;
}>;
