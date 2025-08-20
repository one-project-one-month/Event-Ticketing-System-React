import { type ApiResponse } from "@/types/ApiResponse";

export interface VenueData {
  venueCode: string;
  venueTypeCode: string;
  venueName: string;
  capacity: number;
}

export type VenueResponse = ApiResponse<{
  venueList: VenueData[];
}>;

export interface CreateVenueParams
  extends Record<string, string | number | boolean | string[]> {
  VenueName: string;
  VenueTypeCode: string;
  Capacity: number;
  Address: string;
  Description: string;
  Facilities: string;
  Addons: string[];
}

export interface CreateVenueFormData {
  VenueImage: File[];
}

export interface CreateVenueRequest {
  query: CreateVenueParams;
  formData: FormData;
}

export interface FullVenueData {
  venueCode: string;
  venueTypeCode: string;
  venueName: string;
  capacity: number;
  address: string;
  description: string;
  addons: string[];
  facilities: string;
  venueImage: string;
}

export type VenueDataByCode = ApiResponse<{
  venue: FullVenueData;
}>;
