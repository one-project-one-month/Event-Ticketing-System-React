import { apiGet } from "@/types/apiClient.ts";
import type { VenueTypeResponse } from "@/Admin/DataTypes/VenueType.ts";

export const getVenueTypes = () =>
  apiGet<VenueTypeResponse["data"]>("api/VenueType/List");
