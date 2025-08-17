import { type ApiResponse } from "@/types/ApiResponse";

export interface UserEventData {
  eventcode: string;
  eventname: string;
  address: string;
  venueimage: string[];
}

export interface UserEventDataByCode {
  eventcode: string;
  eventname: string;
  startdate: string;
  enddate: string;
  venuename: string;
  description: string;
  address: string;
  capacity: number;
  facilities: string;
  addons: string;
  venueimage: string[];
  ticketTypes: TicketType[];
}

export interface TicketType {
  tickettypecode: string;
  tickettypename: string;
  ticketprice: string;
}

export type UserEventResponse = ApiResponse<{
  eventList: UserEventData[];
  top3Events: UserEventData[];
  totalRowCount: number;
  pageNo: number;
  pageSize: number;
  totalPages: number;
}>;
export type UserEventByCodeResponse = ApiResponse<UserEventDataByCode>;
