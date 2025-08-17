import {type ApiResponse } from "@/types/ApiResponse";

export interface QRInfo {
  qrString: string;
  eventName: string;
  eventCode: string;
  eventDate: string;
  eventTimeFrom: string;
  eventTimeTo: string;
  gateOpenTime: string;
  ticketCode: string;
  ticketPrice: string;
  ticketType: string;
  fullName: string;
  email: string;
  location: string;
  address: string;
}

export type QrInfoByQrCode = ApiResponse<{
  qrinfo: QRInfo;
}>;
