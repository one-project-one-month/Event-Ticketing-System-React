import { apiGet } from "@/types/apiClient";
import type { TransactionHistoryListResponse } from "@/Admin/DataTypes/PurchasedHistory.ts";

export const getPurchasedHistoryList = () =>
  apiGet<TransactionHistoryListResponse["data"]>(
    "api/Transaction/GetTransactionHistoryList",
  );

// export const getBusinessEmailByCode = (ownerCode: string) =>
//   apiGet<BusinessEmailByCode["data"]>(`api/BusinessEmail/Edit/${ownerCode}`);
