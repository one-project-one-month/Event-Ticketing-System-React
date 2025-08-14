import {type ApiResponse } from "@/types/ApiResponse";

export interface SearchEventData{
    eventid: string,
    eventcode: string,
    eventname: string,
    categorycode: string,
    startdate: string,
    enddate: Date,
    isactive: boolean,
    eventstatus: string,
    businessownercode: string,
    totalticketquantity: number,
    soldoutcount: number,
    createdby: string,
    createdat: Date,
    modifiedby: string,
    modifiedat: string,
    eventimage : string
}

export interface SearchVenueData{
    venueid: string,
    venuecode: string,
    venuename: string,
    venuetypecode: string,
    venuedescription: string,
    venueaddress: string,
    venuecapacity: number,
    venuefacilities: string,
    venueaddons: string,
    createdby: string,
    createdat: Date,
    modifiedby: string,
    modifiedat: string,
    venueimage : string[],
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