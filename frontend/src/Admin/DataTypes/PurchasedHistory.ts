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
