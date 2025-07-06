import { useState } from "react";
import { type QRInfo } from "@/types/index";
import { BrowserQRCodeReader } from "@zxing/browser";

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
          const qrText = result.getText();

          console.log("Decoded QR Text:", qrText);

          if (qrText === "Demo Valid QR") {
            resolve({
              valid: true,
              data: {
                name: "Scanned User",
                ticketNumber: "SCAN123456",
                event: "Scanned Event",
              },
            });
          } else {
            resolve({ valid: false, error: "Invalid QR code content" });
          }
        } catch (error) {
          console.error("QR decoding failed", error);
          resolve({ valid: false, error: "Unable to scan QR. Try a clearer image." });
        } finally {
          setLoading(false);
          URL.revokeObjectURL(objectUrl); // cleanup
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
