import { apiGet } from "@/types/apiClient";
import type {
    QrInfoByQrCode
} from "@/User/DataTypes/QrCheck";

export const getQrinfoByQrCode = (qrCode: string) =>
  apiGet<QrInfoByQrCode["data"]>(`api/QrCode/${qrCode}`);