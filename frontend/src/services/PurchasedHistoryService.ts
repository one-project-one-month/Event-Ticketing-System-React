import { apiGet } from "@/types/apiClient";
import type {
  TransactionDetailResponse,
  TransactionHistoryListResponse,
} from "@/Admin/DataTypes/PurchasedHistory.ts";

export const getPurchasedHistoryList = () =>
  apiGet<TransactionHistoryListResponse["data"]>(
    "api/Transaction/GetTransactionHistoryList",
  );

export const getTransactionDetailByCode = (code: string) =>
  apiGet<TransactionDetailResponse["data"]>(
    `api/Transaction/GetTransactionHistoryDetail/${code}`,
  );
