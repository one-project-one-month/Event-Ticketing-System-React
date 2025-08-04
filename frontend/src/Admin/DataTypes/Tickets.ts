import {type ApiResponse } from "@/types/ApiResponse";

export interface TicketData {
    ticketid : string,
    ticketcode: string,
    ticketpricecode:string,
    isused:boolean,
    createdby : string,
    createdat:string,
    modifiedby:string,
    modifiedat:string,
    deleteflag:boolean,
    ticketpriceid:string,
    eventcode: string,
    tickettypecode:string,
    ticketprice:string,
    ticketquantity:string,
    tickettypeid:string,
    tickettypename:string
}

export type TicketResponse = ApiResponse<{
  eventCategories: TicketData[];
}>;

export type TicketTypeByCode = ApiResponse<{
  Ticket: TicketData;
}>;

export interface createTicketData {
    categoryName: string;
}

export interface updateTicketData {
  eventCategoryCode: string;
  categoryName: string;
}