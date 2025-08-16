import {type ApiResponse } from "@/types/ApiResponse";

export interface TopThreeEventData{
    eventid: string,
    eventcode: string,
    eventname: string,
    address: string,
    venueimage: string[]
}

export interface TopThreeVenueData{
    venueid: string,
    venuecode: string,
    venuename: string,
    venuetypename:string,
    capacity: number,
    venueimage: string[],
    address: string
}

export interface HomeStatusData{
    completedEvents: number,
    activeEvents: number,
    totalVenues: number,
    ticketsSoldPercentage: number
}

export interface EventResponse {
    events : TopThreeEventData[]
}

export interface VenueResponse {
    venues : TopThreeVenueData[]
}
export type HomeResponseData = ApiResponse<{
    topThreeEvents: EventResponse,
    homeStatus: HomeStatusData,
    topThreeVenues: VenueResponse
}>