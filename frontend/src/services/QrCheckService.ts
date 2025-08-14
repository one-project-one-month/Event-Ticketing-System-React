import { apiGet } from "@/types/apiClient";
import type {
    QRInfo
} from "@/User/DataTypes/QrCheck";

export const getQrinfoByQrCode = (qrCode: string) =>
  apiGet<QRInfo>(`api/QrCode/${qrCode}`);