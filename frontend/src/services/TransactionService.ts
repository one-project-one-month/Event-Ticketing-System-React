import { apiPost } from "@/types/apiClient";
import type {ProcessTransactionPayload, 
    TransactionResponse} from "@/User/DataTypes/Transaction";

export const makeTransaction = (payload: ProcessTransactionPayload) =>
  apiPost<{ response : TransactionResponse }>(`api/Transaction/ProcessTransaction`, payload);