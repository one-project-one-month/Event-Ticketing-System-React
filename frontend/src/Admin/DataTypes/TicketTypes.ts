import {type ApiResponse } from "@/types/ApiResponse";
export interface TicketTypeData {
  ticketTypeId: string;
  tickettypecode: string;
  tickettypename: string;
  ticketprice: string;
  eventCode: string;
  eventname: string;
  ticketQuantity: number;
}

export interface OneTicketTypeResponse {
    ticketTypeId: string;
    ticketTypeCode: string;
    eventCode: string;
    ticketTypeName: string;
    createdBy: string;
    createdAt: string;
    modifiedBy: string;
    modifiedAt: string;
    ticketprice: string;
    ticketQuantity: number;
}

export type TicketTypeResponse = ApiResponse<{
  ticketTypeList: TicketTypeData[];
}>;

export type TicketTypeByCode = ApiResponse<{
  ticketType: OneTicketTypeResponse;
}>;

export interface createTicketTypeData {
    eventCode: string,
    ticketTypeName: string,
    ticketprice: string,
    ticketQuantity: number,
}

export interface updateTicketTypeData {
    ticketTypeCode: string,
    ticketTypeName: string
}