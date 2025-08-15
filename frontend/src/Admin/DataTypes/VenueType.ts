import type { ApiResponse } from "@/types/ApiResponse.ts";

export interface VenueTypeData {
  venueTypeCode: string;
  venueTypename: string;
  createdAt: string;
}

export type VenueTypeResponse = ApiResponse<{
  venueTypeList: VenueTypeData[];
}>;
