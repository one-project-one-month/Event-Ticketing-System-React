import { useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { getQrinfoByQrCode } from "@/services/QrCheckService";
import type { QRInfo } from "@/User/DataTypes/QrCheck";

export function useQRValidator() {
  const [loading, setLoading] = useState(false);

  const validateQR = (
    file: File
  ): Promise<{ valid: boolean; data?: QRInfo; error?: string }> => {
    setLoading(true);

    const reader = new BrowserQRCodeReader();

    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      img.onload = async () => {
        try {
          const result = await reader.decodeFromImageElement(img);
          const qrCode = result.getText().trim();

          const res = await getQrinfoByQrCode(qrCode);

          if (res && res.isSuccess && res.data) {
            resolve({ valid: true, data: res.data});
          } else {
            resolve({
              valid: false,
              error: res.message || `No ticket found for QR "${qrCode}"`,
            });
          }
        } catch (error) {
          console.error("❌ QR decoding failed:", error);
          resolve({
            valid: false,
            error: "Unable to scan QR. Try a clearer image.",
          });
        } finally {
          setLoading(false);
          URL.revokeObjectURL(objectUrl);
        }
      };

      img.onerror = () => {
        resolve({ valid: false, error: "Could not load image for scanning" });
        setLoading(false);
      };
    });
  };

  return { validateQR, loading };
}
