import { useState } from "react";
import { type QRInfo } from "@/types";
import { BrowserQRCodeReader } from "@zxing/browser";
import { demoQrDataList } from "@/data/DemoQrData"; 

export function useQRValidator() {
  const [loading, setLoading] = useState(false);

  const validateQR = (file: File): Promise<{ valid: boolean; data?: QRInfo; error?: string }> => {
    setLoading(true);

    const reader = new BrowserQRCodeReader();

    return new Promise((resolve) => {
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);

      img.src = objectUrl;

      img.onload = async () => {
        try {
          const result = await reader.decodeFromImageElement(img);
          const qrText = result.getText().trim();

          const match = demoQrDataList.find((ticket) => ticket.QrString === qrText); 

          if (match) {
            resolve({ valid: true, data: match });
          } else {
            resolve({ valid: false, error: `No ticket found for QR "${qrText}"` });
          }
        } catch (error) {
          console.error("❌ QR decoding failed:", error);
          resolve({ valid: false, error: "Unable to scan QR. Try a clearer image." });
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
