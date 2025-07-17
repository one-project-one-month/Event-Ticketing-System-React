import React, { useRef, useState, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import ThankYouDialog from "./ThankYouDialog";

const VerifyDialog = ({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<SetStateAction<boolean>>;
}) => {
  const [otpCode, setOtpCode] = useState(Array(5).fill(""));
  const inputRefs = useRef<HTMLInputElement[]>([]);
  const [isVerified, setVerified] = useState<boolean>(false);

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
  if (isVerified) return <ThankYouDialog />;
  return (
    <div
      className={`flex h-[80%] w-[50%] flex-col items-center justify-between rounded bg-gradient-to-t from-[#071739] to-[#103263] p-10 py-20 text-white shadow-sm transition-transform ${show ? "scale-100" : "scale-0"}`}
    >
      <Button
        className="absolute top-0 right-0 m-3 h-10 w-10 rounded-full"
        onClick={() => setShow(false)}
      >
        <X />
      </Button>
      <div className="flex w-[80%] flex-col items-center justify-center gap-5 text-center">
        <h2 className="w-fit border-b-2 pb-3 text-3xl font-semibold">
          Verify Email
        </h2>
        <p>
          An OTP code has been sent to your email address e******@gmail.com.
          Please check your inbox and enter the 5-digit code below to complete
          your request.
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
            className="no-spinner h-12 w-12 rounded-md bg-white p-2 text-center text-2xl font-semibold text-black focus:outline-blue-300"
          />
        ))}
      </div>

      <p>
        Didn’t get code?
        <Button className="bg-transparent text-white hover:bg-transparent">
          Resend Code
        </Button>
      </p>
      <Button
        onClick={() => {
          setVerified(true);
        }}
        className="w-fit cursor-pointer rounded-md bg-white px-12 py-5 text-black transition-colors duration-500 hover:bg-[#103263] hover:text-white"
      >
        Verify
      </Button>
    </div>
  );
};

export default VerifyDialog;
