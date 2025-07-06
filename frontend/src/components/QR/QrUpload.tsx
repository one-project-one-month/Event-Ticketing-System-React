import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useQRValidator } from "@/hooks/useQrValidator";
import QrResult from "@/components/QR/QrResult";
import { type QRInfo } from "@/types/index";
import { UploadIcon } from "lucide-react";

const QRUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [qrInfo, setQrInfo] = useState<QRInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { validateQR, loading } = useQRValidator();

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);

      return () => URL.revokeObjectURL(url);
    }
  }, [file]);

  const handleUpload = async () => {
    if (!file) return;
    const result = await validateQR(file);
    if (result.valid && result.data) {
      setQrInfo(result.data);
      setError(null);
    } else {
      setQrInfo(null);
      setError(result.error || "Unknown error");
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewUrl(null);
    setQrInfo(null);
    setError(null);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 border-4 border-purple-500 rounded-2xl shadow-2xl gap-4 w-full max-w-md bg-gradient-to-br from-pink-100 via-purple-100 to-teal-100 transition-all">
      {!qrInfo && (
        <>
          {!previewUrl ? (
            <label
              htmlFor="qr-upload"
              className="flex flex-col items-center justify-center w-60 h-60 border-4 border-dashed border-pink-400 rounded-2xl cursor-pointer hover:bg-pink-50 transition duration-300 shadow-inner text-center"
            >
              <UploadIcon className="h-10 w-10 text-pink-500 mb-2 animate-pulse" />
              <span className="text-pink-600 font-semibold">Click to upload QR code</span>
              <input
                id="qr-upload"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const selected = e.target.files?.[0];
                  if (selected) setFile(selected);
                }}
              />
            </label>
          ) : (
            <div className="w-full flex flex-col items-center gap-2">
              <img
                src={previewUrl}
                alt="Uploaded QR"
                className="w-60 h-60 object-contain border-4 border-purple-400 rounded-2xl shadow-lg"
              />
              <Button variant="ghost" onClick={reset}>Change QR</Button>
            </div>
          )}

          {error && <p className="text-sm text-red-500 text-center">{error}</p>}

          {file && (
            <div className="flex gap-4 mt-2">
              <Button variant="outline" onClick={reset}>Cancel</Button>
              <Button onClick={handleUpload} disabled={loading}>
                {loading ? "Checking..." : "Confirm QR"}
              </Button>
            </div>
          )}
        </>
      )}

      {qrInfo && <QrResult info={qrInfo} onClose={reset} />}
    </div>
  );
};

export default QRUpload;
