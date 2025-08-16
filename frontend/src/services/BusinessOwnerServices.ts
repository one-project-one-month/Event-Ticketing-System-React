import { apiGet, apiPost } from "@/types/apiClient";
import type {
  BusinessOwnerResponse,
  createBusinessOwnerData,
  BusinessOwnerByCode,
  updateBusinessOwnerData
} from "@/Admin/DataTypes/BusinessOwner";

export const getBusinessOwners = () =>
  apiGet<BusinessOwnerResponse["data"]>("api/BusinessOwner/List");

export const createBusinessOwner = (payload: createBusinessOwnerData) =>
  apiPost<{ businessOwner: BusinessOwnerResponse }>("api/BusinessOwner/Create", payload);

export const updateBusinessOwner = (payload: updateBusinessOwnerData) =>
  apiPost<{ businessOwner: BusinessOwnerResponse }>(`api/BusinessOwner/Update`, payload);

export const getBusinessOwnerByCode = (ownerCode: string) =>
  apiGet<BusinessOwnerByCode["data"]>(`api/BusinessOwner/Edit/${ownerCode}`);

export const deleteBusnisssOwner = (ownerCode: string) =>
  apiPost<{ businessOwner: BusinessOwnerResponse }>(`api/BusinessOwner/Delete/${ownerCode}`, {});
