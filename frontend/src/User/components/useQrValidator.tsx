import { useState, useCallback } from "react";
import { getQrinfoByQrCode } from "@/services/QrCheckService";
import type { QRInfo } from "@/User/DataTypes/QrCheck";

export function useQRValidator() {
  const [loading, setLoading] = useState(false);

  const validateQR = useCallback(
    (
      file: File,
    ): Promise<{ valid: boolean; data?: QRInfo; error?: string }> => {
      setLoading(true);

      return new Promise((resolve) => {
        const reader = new FileReader();

        reader.onload = async () => {
          try {
            const img = new Image();
            img.src = reader.result as string;

            img.onload = async () => {
              try {
                // Use react-qr-reader compatible approach:
                // It expects a canvas or image element.
                const canvas = document.createElement("canvas");
                canvas.width = img.naturalWidth;
                canvas.height = img.naturalHeight;
                const ctx = canvas.getContext("2d");
                ctx?.drawImage(img, 0, 0);

                // Create a temporary QRReader instance from react-qr-reader
                // react-qr-reader exposes no direct decode, but we can use @zxing/library internally
                // Since react-qr-reader uses @zxing/browser under the hood, you could still decode here:
                const { BrowserQRCodeReader } = await import("@zxing/browser");
                const qrReader = new BrowserQRCodeReader();
                const result = await qrReader.decodeFromCanvas(canvas);
                const qrText = result.getText().trim();
                const decodedQr = decodeURIComponent(
                  decodeURIComponent(qrText),
                );

                const res = await getQrinfoByQrCode(decodedQr);
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
              }
            };

            img.onerror = () => {
              resolve({
                valid: false,
                error: "Could not load image for scanning",
              });
              setLoading(false);
            };
          } catch (err) {
            console.error(err);
            resolve({ valid: false, error: "Failed to process image." });
            setLoading(false);
          }
        };

        reader.onerror = () => {
          resolve({ valid: false, error: "File reading error" });
          setLoading(false);
        };

        reader.readAsDataURL(file);
      });
    },
    [],
  );

  return { validateQR, loading };
}
