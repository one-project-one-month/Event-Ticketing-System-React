import { useState, useEffect } from "react";
import { Button } from "@/User/components/ui/button";
import { useQRValidator } from "@/User/hooks/useQrValidator";
import QrResult from "@/User/components/QR/QrResult";
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
    <div className="flex w-full max-w-md flex-col items-center justify-center gap-4 rounded-2xl border-0 border-purple-500 bg-gradient-to-br from-pink-100 via-purple-100 to-teal-100 p-0 shadow-2xl transition-all">
      {!qrInfo && (
        <>
          {!previewUrl ? (
            <label
              htmlFor="qr-upload"
              className="flex h-60 w-60 cursor-pointer flex-col items-center justify-center rounded-2xl border-4 border-dashed border-pink-400 text-center shadow-inner transition duration-300 hover:bg-pink-50"
            >
              <UploadIcon className="mb-2 h-10 w-10 animate-pulse text-pink-500" />
              <span className="font-semibold text-pink-600">
                Click to upload QR code
              </span>
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
            <div className="flex w-full flex-col items-center gap-2">
              <img
                src={previewUrl}
                alt="Uploaded QR"
                className="h-60 w-60 rounded-2xl border-4 border-purple-400 object-contain shadow-lg"
              />
              <Button variant="ghost" onClick={reset}>
                Change QR
              </Button>
            </div>
          )}

          {error && <p className="text-center text-sm text-red-500">{error}</p>}

          {file && (
            <div className="mt-2 flex gap-4">
              <Button variant="outline" onClick={reset}>
                Cancel
              </Button>
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
