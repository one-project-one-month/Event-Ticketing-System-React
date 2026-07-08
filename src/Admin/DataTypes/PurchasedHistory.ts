import type { ApiResponse } from "@/types/ApiResponse.ts";

export type TransactionHistoryListResponse = ApiResponse<{
  transactionList: TransactionHistory[];
}>;

export interface TransactionHistory {
  transactionCode: string;
  email: string;
  transactionDate: string;
  eventName: string;
  ticketTypeName: string;
}

export interface TransactionDetailData {
  email: string;
  eventName: string;
  eventCode: string;
  eventStatus: string;
  ticketTypeName: string;
  ticketPrice: number;
  paymentType: string;
  transactionDate: string;
  isActive: boolean;
  qty: number;
}

export type TransactionDetailResponse = ApiResponse<{
  transactionDetail: TransactionDetailData;
}>;
