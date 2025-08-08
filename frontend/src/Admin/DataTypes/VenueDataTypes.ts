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
