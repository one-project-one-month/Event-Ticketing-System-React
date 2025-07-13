import { useState } from "react";
import { useQRValidator } from "@/hooks/useQrValidator";
import { type QRInfo } from "@/types/index";
import QrResult from "@/components/QR/QrResult";
import Dropzone from "@/components/QR/DropZone";
import { LoadingStep } from "@/components/QR/LoadingStep";
import { CompleteStep } from "@/components/QR/CompleteStep";

const CheckQr = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [step, setStep] = useState<"initial" | "loading" | "complete" | "show">("initial");
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

    await new Promise(res => setTimeout(res, 2000));

    const result = await validateQR(file);
    if (result.valid && result.data) {
      setQrInfo(result.data);
      setStep("complete");
      setTimeout(() => setStep("show"), 1000);
    } else {
      setError(result.error || "Unknown error");
      setStep("initial");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between px-4 py-10 bg-[#e6e6e6]">
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
        {step === "loading" && <LoadingStep progress={progress} onCancel={reset} />}
        {step === "complete" && <CompleteStep fileName={file?.name} />}
        {step === "show" && qrInfo && <QrResult info={qrInfo} onClose={reset} />}
      </div>
    </div>
  );
};

export default CheckQr;
