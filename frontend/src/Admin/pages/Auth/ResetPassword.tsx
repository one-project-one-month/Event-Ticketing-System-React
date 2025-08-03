// src/Admin/pages/ForgotPassword.tsx
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/User/components/ui/button";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
    hasLowercase: false,
    passwordsMatch: false,
  });

  // Validate password on change
  useEffect(() => {
    setValidation({
      minLength: password.length >= 8,
      hasUppercase: /[A-Z]/.test(password),
      hasLowercase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      passwordsMatch: password === confirmPassword && password !== "",
    });
  }, [password, confirmPassword]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(validation).every((v) => v)) {
      // alert("Password successfully set!");
      // Submit to backend here
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8DFEC]">
      <div className="w-full max-w-md space-y-5 rounded-lg bg-gradient-to-b from-[#3F2B96] to-[#A8C0FF] p-8 shadow-md">
        <h2 className="text-left text-2xl font-medium text-white">
          Reset Password
        </h2>
        <div className="flex h-[164px] w-[380px] flex-col rounded-[6px] bg-[#1C1D20CC] p-5">
          <h3 className="text-left text-[#FFFFFF]">
            Password Pattern Restrictions
          </h3>
          <div>
            <ol className="mt-2 ml-4 list-disc text-sm text-[#FFFFFF]">
              <li>Repeated digits (e.g., 1111) are allowed.</li>
              <li>Sequential letters (e.g., abc, def) are not allowed.</li>
              <li>
                Sequential numbers longer than 3 digits (e.g., 1234) are not
                allowed. Sequences up to 3 digits (e.g., 123) are acceptable.
              </li>
            </ol>
          </div>
        </div>
        <h2 className="mb-4 text-xl font-semibold">Create New Password</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">
              New Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full rounded border p-2 ${
                password.length > 0 && !validation.minLength
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="At least 8 characters"
            />
          </div>

          {/* Password Requirements */}
          <div className="space-y-2 text-sm">
            <PasswordRequirement
              valid={validation.minLength}
              text="At least 8 characters"
            />
            <PasswordRequirement
              valid={validation.hasUppercase}
              text="At least one uppercase letter(A-Z)"
            />
            <PasswordRequirement
              valid={validation.hasLowercase}
              text="At least one lowercase letter(a-z)"
            />

            <PasswordRequirement
              valid={validation.hasNumber}
              text="At least one number"
            />
            <PasswordRequirement
              valid={validation.hasSpecialChar}
              text="At least one special character"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium">
              Re-enter Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full rounded border p-2 ${
                confirmPassword.length > 0 && !validation.passwordsMatch
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Re-enter your password"
            />
            <p className="text-[14px]">both password must match</p>
          </div>

          <Button
            type="submit"
            disabled={!Object.values(validation).every((v) => v)}
            className={`mt-3 w-full rounded px-4 py-2 ${
              Object.values(validation).every((v) => v)
                ? "bg-[#43319A] text-white hover:bg-[#030812]/90"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
            onClick={() => navigate("/admin/reset-success")}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

function PasswordRequirement({
  valid,
  text,
}: {
  valid: boolean;
  text: string;
}) {
  return (
    <div className="flex items-center">
      {valid ? (
        <CheckCircle className="mr-2 h-4 w-4 text-green-800" />
      ) : (
        <XCircle className="mr-2 h-4 w-4 text-red-800" />
      )}
      <span className={valid ? "text-green-800" : "text-gray-800"}>{text}</span>
    </div>
  );
}
