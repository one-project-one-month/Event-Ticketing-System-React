import { apiGet } from "@/types/apiClient";
import type {
    UserVenueDataResponse,
    UserVenueDataByCodeResponse
} from "@/User/DataTypes/Venue";

export const getEvents = (pageNo : number) => 
  apiGet<UserVenueDataResponse["data"]>(`api/Venue/UserVenueList/${pageNo}`);

export const getEventByCode = (venueCode: string) =>
  apiGet<UserVenueDataByCodeResponse["data"]>(`api/Venue/UserVenueDetail/${venueCode}`);