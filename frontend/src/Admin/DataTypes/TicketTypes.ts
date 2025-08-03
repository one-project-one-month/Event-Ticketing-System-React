import {type ApiResponse } from "@/types/ApiResponse";
export interface TicketTypeData {
    tickettypecode: string;
    tickettypename: string;
    ticketprice: string;
    eventcode: string;
    eventname: string;
    ticketquantity: number;
}

export type TicketTypeResponse = ApiResponse<{
  ticketTypeList: TicketTypeData[];
}>;

export type TicketTypeByCode = ApiResponse<{
  TicketType: TicketTypeData;
}>;

export interface createTicketTypeData {
    eventCode: string,
    ticketTypeName: string,
    ticketprice: string,
    ticketQuantity: number,
}

export interface updateTicketTypeData {
    tickettypecode: string,
    tickettypename: string
}