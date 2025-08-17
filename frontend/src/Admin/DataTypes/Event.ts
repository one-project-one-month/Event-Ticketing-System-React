import {type ApiResponse } from "@/types/ApiResponse";

export interface EventData {
  eventcode:string;
  eventname: string;
  uniquename:string;
  isactive: boolean;
  businessownername:string;
}

export type EventResponse = ApiResponse<{
  eventList: EventData[];
}>;

export interface EventByCodeData{
  eventcode: string;
  eventcategory: string;
  eventname: string;
  uniquename: string;
  businessownername: string;
  venuename:string;
  venuetypename:string;
  capacity:number;
  description:string;
  facilities:string;
  addons:string[];
  venueImage:string[];
  address:string;
  startdate: string;
  enddate: string;
  totalticketquantity: number;
  soldoutcount:number;
  eventstatus: string;
  isactive: boolean;
}

export type EventByCode = ApiResponse<{
  event: EventByCodeData;
}>;

export interface createEventData {
    eventname: string;
    uniquename: string;
    eventcategorycode: string;
    businessownercode:string;
    venuecode:string;
    totalticketquantity: string;
    startdate: Date;
    enddate: Date;
    isactive: boolean;
}

export interface updateEventData {
    eventCode: string;
    eventStatus:string;
    isactive : boolean;
}

export interface eventStatusOptionsData{
  value: string;
  label: string;
}

export type eventStatusResponse = ApiResponse<{
  eventStatusOptions:eventStatusOptionsData;
}>

