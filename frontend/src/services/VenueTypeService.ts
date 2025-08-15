import { apiGet } from "@/types/apiClient.ts";
import type {
  VenueTypeByCode,
  VenueTypeResponse,
} from "@/Admin/DataTypes/VenueType.ts";

export const getVenueTypes = () =>
  apiGet<VenueTypeResponse["data"]>("api/VenueType/List");

export const getVenueTypeByCode = (venueTypeCode: string) =>
  apiGet<VenueTypeByCode["data"]>(`api/VenueType/Edit/${venueTypeCode}`);
