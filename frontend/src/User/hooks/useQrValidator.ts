import { useState } from "react";
import { BrowserQRCodeReader } from "@zxing/browser";
import { getQrinfoByQrCode } from "@/services/QrCheckService";
import type { QRInfo } from "@/User/DataTypes/QrCheck";

export function useQRValidator() {
  const [loading, setLoading] = useState(false);

  const validateQR = (
    file: File,
  ): Promise<{ valid: boolean; data?: QRInfo; error?: string }> => {
    console.log("📂 File received:", file); // Debug file
    setLoading(true);

    return new Promise((resolve) => {
      const reader = new BrowserQRCodeReader();
      const img = new Image();
      const objectUrl = URL.createObjectURL(file);
      img.src = objectUrl;

      console.log("🔗 Object URL created:", objectUrl);

      img.onload = async () => {
        console.log("✅ img.onload fired");

        try {
          const canvas = document.createElement("canvas");
          canvas.width = img.naturalWidth;
          canvas.height = img.naturalHeight;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0);
          const result = await reader.decodeFromCanvas(canvas);
          console.log("🔍 QR decode result:", result);

          const qrCode = result.getText().trim();
          console.log("📝 QR Text:", qrCode);

          // double decode (sometimes needed)
          const decodedQr = decodeURIComponent(qrCode);
          const decodedQr2 = decodeURIComponent(decodedQr);
          console.log("🛠 Decoded QR:", decodedQr2);

          // Call backend API
          const res = await getQrinfoByQrCode(decodedQr2);
          console.log("📡 Backend response:", res);

          if (res?.isSuccess && res.data) {
            resolve({ valid: true, data: res.data });
          } else {
            resolve({
              valid: false,
              error: res?.message || "Ticket not found",
            });
          }
        } catch (err) {
          console.error("❌ QR decoding failed:", err);
          resolve({
            valid: false,
            error: "Unable to scan QR. Try a clearer image.",
          });
        } finally {
          setLoading(false);
          URL.revokeObjectURL(objectUrl);
          console.log("♻️ Object URL revoked");
        }
      };

      img.onerror = () => {
        console.error("❌ img.onerror fired – could not load image");
        setLoading(false);
        URL.revokeObjectURL(objectUrl);
        resolve({ valid: false, error: "Could not load image for scanning" });
      };
    });
  };

  return { validateQR, loading };
}
