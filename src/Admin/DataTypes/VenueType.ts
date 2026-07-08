import type { ApiResponse } from "@/types/ApiResponse.ts";

export interface VenueTypeData {
  venueTypeCode: string;
  venueTypename: string;
  createdAt?: string;
}

export type VenueTypeResponse = ApiResponse<{
  venueTypeList: VenueTypeData[];
}>;

export type VenueTypeByCode = ApiResponse<{
  venueTypeEdit: VenueTypeData;
}>;

export interface CreateVenueType {
  venueTypeName: string;
}

export interface EditVenueType {
  venueTypeName: string;
  venueTypeCode: string;
}
