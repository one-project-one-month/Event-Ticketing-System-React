import { apiGet, apiPost } from "@/types/apiClient";
import type {
  BusinessOwnerResponse,
  createBusinessOwnerData,
  BusinessOwnerByCode,
  updateBusinessOwnerData
} from "@/Admin/DataTypes/BusinessOwner";

export const getEventTypes = () =>
  apiGet<BusinessOwnerResponse["data"]>("api/BusinessOwner/List");

export const createEventType = (payload: createBusinessOwnerData) =>
  apiPost<{ businessOwner: BusinessOwnerResponse }>("api/BusinessOwner/Create", payload);

export const updateEventType = (payload: updateBusinessOwnerData) =>
  apiPost<{ businessOwner: BusinessOwnerResponse }>(`api/BusinessOwner/Update`, payload);

export const getEventTypeByCode = (ownerCode: string) =>
  apiGet<BusinessOwnerByCode["data"]>(`api/BusinessOwner/Edit/${ownerCode}`);

export const deleteEventType = (eventCategorycode: string) =>
  apiPost<{ businessOwner: BusinessOwnerResponse }>(`api/BusinessOwner/Delete/${eventCategorycode}`, {});
