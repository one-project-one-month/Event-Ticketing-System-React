import {type ApiResponse } from "@/types/ApiResponse";

export interface SearchEventData{
    eventid: string,
    eventcode: string,
    eventname: string,
    address : string,
    venueimage : string
}

export interface SearchVenueData{
    venueid: string,
    venuecode: string,
    venuename: string,
    venuetypename: string,
    capacity : number,
    venueimage : string[],
    address : string
}

export type SearchDataResponse = ApiResponse<{
    events : SearchEventData[],
    venues : SearchVenueData[]
}>

export interface EventAndVenueSearchRequest {
    searchTerm : string;
}

export interface SearchByDateRequest {
    StartDate : Date;
    EndDate : Date;
}

export interface SearchByAmountRequest{
    FromAmount : number;
    ToAmount : number;
}