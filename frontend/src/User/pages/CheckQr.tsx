import { useState } from "react";
import { useQRValidator } from "@/User/hooks/useQrValidator";
import type { QRInfo } from "@/User/DataTypes/QrCheck";
import QrResult from "@/User/components/QR/QrResult";
import Dropzone from "@/User/components/QR/DropZone";
import { LoadingStep } from "@/User/components/QR/LoadingStep";
import { CompleteStep } from "@/User/components/QR/CompleteStep";

const CheckQr = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<"initial" | "loading" | "complete" | "show">(
    "initial",
  );
  const [qrInfo, setQrInfo] = useState<QRInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { validateQR } = useQRValidator();

  const reset = () => {
    setFile(null);
    setProgress(0);
    setStep("initial");
    setQrInfo(null);
    setError(null);
  };

  const simulateUpload = async () => {
    if (!file) {
      setError("Please select a QR image file");
      return;
    }
    setStep("loading");
    let progressVal = 0;
    const interval = setInterval(() => {
      progressVal += 5;
      setProgress(progressVal);
      if (progressVal >= 100) clearInterval(interval);
    }, 100);

    await new Promise((res) => setTimeout(res, 2000));

    const result = await validateQR(file);
    if (result.valid && result.data) {
      const decodedData: QRInfo = Object.fromEntries(
        Object.entries(result.data).map(([key, value]) => [
          key,
          typeof value === "string" ? decodeURIComponent(value) : value,
        ]),
      ) as QRInfo;

      setQrInfo(decodedData);
      setStep("complete");
      setTimeout(() => setStep("show"), 1000);
    } else {
      setError(result.error || "Unknown error");
      setStep("initial");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between bg-[#e6e6e6] px-0 py-0">
      <div className="w-full max-w-3xl space-y-6 text-center">
        {step === "initial" && (
          <Dropzone
            onFileSelect={setFile}
            onUpload={simulateUpload}
            onCancel={reset}
            file={file}
            error={error}
          />
        )}
        {step === "loading" && (
          <LoadingStep progress={progress} onCancel={reset} />
        )}
        {step === "complete" && <CompleteStep fileName={file?.name} />}
        {step === "show" && qrInfo && (
          <QrResult info={qrInfo} onClose={reset} />
        )}
      </div>
    </div>
  );
};

export default CheckQr;
