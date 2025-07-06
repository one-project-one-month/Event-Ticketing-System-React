import React, { useRef, useState } from "react";
import { Button } from "../ui/button";

const VerifyDialog = ({ show }: { show: boolean }) => {
  const [otpCode, setOtpCode] = useState(Array(4).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);

  const handleOtpChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newOtp = [...otpCode];
    newOtp[index] = e.target.value;
    setOtpCode(newOtp);
    if (e.target.value && index < 3) {
      inputRefs.current[index + 1].focus();
    }
  };
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded border bg-white p-10 shadow-sm transition-transform ${show ? "scale-100" : "scale-0"}`}
    >
      <div className="text-center">
        <h2 className="font-semibold">We send verify code to your email </h2>
        <p>
          Resend in <span className="text-gray-700">49s</span>{" "}
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
              if (el) inputRefs.current[index] = el!;
            }}
            onChange={(e) => handleOtpChange(e, index)}
            className="no-spinner h-8 w-8 border p-2 focus:outline-blue-300"
          />
        ))}
      </div>
      <Button className="w-full cursor-pointer rounded-none border border-black bg-transparent text-black hover:bg-transparent">
        Verify
      </Button>
    </div>
  );
};

export default VerifyDialog;
