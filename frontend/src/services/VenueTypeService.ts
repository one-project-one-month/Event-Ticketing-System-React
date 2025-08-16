import { apiGet, apiPost } from "@/types/apiClient.ts";
import type {
  CreateVenueType,
  EditVenueType,
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

export const updateVenueType = (payload: EditVenueType) => {
  return apiPost<{ venueType: VenueTypeResponse }>(
    "api/VenueType/Update",
    payload,
  );
};

export const deleteVenueType = (venueTypeCode: string) =>
  apiPost<{ venueType: VenueTypeResponse }>(
    `api/VenueType/Delete/${venueTypeCode}`,
    {},
  );
