import { apiGet, apiPost } from "@/types/apiClient.ts";
import type {
  CreateVenueType,
  VenueTypeByCode,
  VenueTypeResponse,
} from "@/Admin/DataTypes/VenueType.ts";

export const getVenueTypes = () =>
  apiGet<VenueTypeResponse["data"]>("api/VenueType/List");

export const getVenueTypeByCode = (venueTypeCode: string) =>
  apiGet<VenueTypeByCode["data"]>(`api/VenueType/Edit/${venueTypeCode}`);

export const createVenueType = (payload: CreateVenueType) => {
  return apiPost<{ venueType: VenueTypeResponse }>(
    "api/VenueType/Create",
    payload,
  );
};
