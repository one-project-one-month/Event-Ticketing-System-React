import type { ApiResponse } from "@/types/ApiResponse";

export interface ProcessTransactionPayload {
  eventCode: string;
  fullName: string;
  phone: string;
  email: string;
  gender: string;
  ticketTypeCode: string;
  ticketQuantity: number;
}

export type TransactionResponse = ApiResponse<{
  response : ProcessTransactionPayload;
}>
