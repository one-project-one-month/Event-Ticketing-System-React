import {type ApiResponse } from "@/types/ApiResponse";

export interface UserVenueData{
    venueCode: string;
    venueTypeCode: string;
    venuetypename: string;
    venueName: string;
    capacity: number;
    address: string;
    venueimage: string[];
}

export type UserVenueDataResponse = ApiResponse<{
    venueList : UserVenueData[],
    totalRowCount: number,
    pageNo: number,
    pageSize: number,
    totalPages: number
}>

export interface UserVenueDataByCode {
    venueCode: string;
    venueTypeCode: string;
    venueName: string;
    capacity: number;
    address: string;
    description: string;
    addons: string[];
    facilities: string;
    venueImage: string[];
}

export type UserVenueDataByCodeResponse = ApiResponse<{
    venue : UserVenueDataByCode;
}>
