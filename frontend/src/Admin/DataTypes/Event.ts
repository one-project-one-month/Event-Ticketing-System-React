import {type ApiResponse } from "@/types/ApiResponse";

export interface EventData {
    eventid: string;
    eventcode: string;
    eventname: string;
    eventtypecode: string;
    eventtypeid: string;
    eventtypename: string;
    businessownerid: string;
    businessownercode: string;
    businessownername: string;
    eventstartdate: Date;
    eventenddate: Date;
    createdby: string;
    createdat: Date;
    modifiedby: string;
    modifiedat: Date;
    deleteflag: boolean;
}

export type EventResponse = ApiResponse<{
  events: EventData[];
}>;

export type EventByCode = ApiResponse<{
  event: EventData;
}>;

export interface createEventData {
    eventname: string;
    description: string;
    address: string;
    startdate: Date;
    enddate: Date;
    isactive: boolean;
    eventstatus: string;
    totalticketquantity: number;
}

export interface updateEventData {
    eventCode: string;
    eventName: string;
    description: string;
    address: string;
    startdate: Date;
    enddate: Date;
    eventimage: string;
    isactive: boolean;
    eventstatus: string;
    totalticketquantity: number;
}