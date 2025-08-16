import { apiGet } from "@/types/apiClient";
import type {
  BusinessEmailByCode,
  BusinessEmailResponse,
} from "@/Admin/DataTypes/BusinessEmail.ts";

export const getBusinessEmailList = () =>
  apiGet<BusinessEmailResponse["data"]>("api/BusinessEmail/List");

export const getBusinessEmailByCode = (ownerCode: string) =>
  apiGet<BusinessEmailByCode["data"]>(`api/BusinessEmail/Edit/${ownerCode}`);
