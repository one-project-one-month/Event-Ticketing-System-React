import { apiGet } from "@/types/apiClient";
import type { VerificationCodeResponse } from "@/Admin/DataTypes/VerificationCode.ts";

export const getVerificationCodeList = () =>
  apiGet<VerificationCodeResponse["data"]>("api/VerificationCode/List");

// export const getBusinessEmailByCode = (ownerCode: string) =>
//   apiGet<BusinessEmailByCode["data"]>(`api/BusinessEmail/Edit/${ownerCode}`);
