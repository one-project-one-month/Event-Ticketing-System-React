import React, { useRef, useState, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ThankYouDialog from "./ThankYouDialog";
import { VerifyCode } from "@/services/VerifyCode";
import { makeTransaction } from "@/services/TransactionService";
import type { ProcessTransactionPayload } from "@/User/DataTypes/Transaction";

interface VerifyDialogProps {
  show: boolean;
  email: string;
  setShow: React.Dispatch<SetStateAction<boolean>>;
  transactionPayload: ProcessTransactionPayload; // added this
}

type Step =
  | "VERIFYING"       // entering OTP
  | "TICKETSENDING"   // transaction API is in progress
  | "SUCCESS"         // ticket sent success
  | "FAIL";           // ticket sending failed

const VerifyDialog = ({
  show,
  setShow,
  email,
  transactionPayload
}: VerifyDialogProps) => {
  const OTP_LENGTH = 6;
  const [otpCode, setOtpCode] = useState(Array(OTP_LENGTH).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [error, setError] = useState<string>("");
  const [step, setStep] = useState<Step>("VERIFYING");

  const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    const newOtp = [...otpCode];
    newOtp[index] = value;
    setOtpCode(newOtp);

    if (value && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    if (value === "" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    const paste = e.clipboardData
      .getData("text")
      .replace(/[^0-9]/g, "")
      .slice(0, OTP_LENGTH)
      .split("");

    const newOtp = [...otpCode];
    paste.forEach((val, i) => {
      newOtp[i] = val;
      if (inputRefs.current[i]) inputRefs.current[i].value = val;
    });
    setOtpCode(newOtp);

    const nextIndex = paste.length < OTP_LENGTH ? paste.length : OTP_LENGTH - 1;
    inputRefs.current[nextIndex]?.focus();
  };

  const handleVerify = async () => {
    setError("");
    // Step 1: Verify OTP
    const res = await VerifyCode({
      email,
      verificationCode: otpCode.join(""),
    });

    if (!res.isSuccess) {
      setError("Error while verifying");
      return;
    }

    // Step 2: Show "sending ticket" message
    setStep("TICKETSENDING");

    // Step 3: Call transaction API
    const tranRes = await makeTransaction(transactionPayload);
    if (tranRes.isSuccess) {
      setStep("SUCCESS");
    } else {
      setStep("FAIL");
    }
  };

  // Different UI based on step
  if (step === "TICKETSENDING") {
    return <ThankYouDialog message="Tickets are sending in your email..." />;
  }
  if (step === "SUCCESS") {
    return <ThankYouDialog message="Ticket Sent successfully. Check your email" />;
  }
  if (step === "FAIL") {
    return <ThankYouDialog message="Ticket sending failed, please check your inputs again" />;
  }

  // Default is VERIFYING
  return (
    <div
      className={`flex h-[80%] w-[50%] flex-col items-center justify-between rounded bg-gradient-to-t from-[#071739] to-[#103263] p-10 py-20 text-white shadow-sm transition-transform ${
        show ? "scale-100" : "scale-0"
      }`}
    >
      <Button
        className="absolute top-0 right-0 m-3 h-10 w-10 rounded-full"
        onClick={() => setShow(false)}
      >
        <X />
      </Button>

      <div className="flex w-[80%] flex-col items-center justify-center gap-6 text-center">
        <h2 className="w-fit border-b-2 pb-3 text-3xl font-semibold">Verify Email</h2>
        <p>
          An OTP code has been sent to your email address{" "}
          {email.replace(/(.{2})(.*)(@.*)/, "$1****$3")}.
          Please check your inbox and enter the {OTP_LENGTH}-digit code below.
        </p>
      </div>

      <div className="flex gap-2">
        {otpCode.map((code, index) => (
          <input
            key={index}
            value={code}
            type="text"
            maxLength={1}
            pattern="[0-9]"
            ref={(el) => {
              if (el) inputRefs.current[index] = el;
            }}
            onChange={(e) => handleOtpChange(e, index)}
            onPaste={handlePaste}
            className="no-spinner h-12 w-12 rounded-md bg-white p-2 text-center text-2xl font-semibold text-black focus:outline-blue-300"
          />
        ))}
      </div>

      <p>
        Didn’t get code?
        <Button className="bg-transparent text-white hover:bg-transparent">Resend Code</Button>
      </p>

      {error && <p className="text-red-500">{error}</p>}

      <Button
        onClick={handleVerify}
        className="w-fit cursor-pointer rounded-md bg-white px-12 py-5 text-black transition-colors duration-500 hover:bg-[#103263] hover:text-white"
      >
        Verify
      </Button>
    </div>
  );
};

export default VerifyDialog;
