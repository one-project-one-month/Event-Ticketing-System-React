import {type ApiResponse } from "@/types/ApiResponse";
export interface TicketTypeData {
  ticketTypeId: string;
  ticketTypeCode: string;
  ticketTypeName: string;
  ticketprice: string;
  eventCode: string;
  eventName: string;
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
    eventName:string;
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
    ticketQuantity: string,
}

export interface updateTicketTypeData {
    ticketTypeCode: string,
    ticketTypeName: string
}