import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/User/components/ui/button";
import { FirstTimeChangePassword } from "@/services/AuthServices";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUppercase: false,
    hasLowercase: false,
    passwordsMatch: false,
  });

  useEffect(() => {
    setValidation({
      minLength: newPassword.length >= 8,
      hasUppercase: /[A-Z]/.test(newPassword),
      hasLowercase: /[a-z]/.test(newPassword),
      hasNumber: /\d/.test(newPassword),
      hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/.test(newPassword),
      passwordsMatch: newPassword === confirmPassword && newPassword !== "",
    });
  }, [newPassword, confirmPassword]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (Object.values(validation).every((v) => v)) {
      try {
        const payload = {
          username: username,
          currentPassword: oldPassword,
          newPassword: newPassword,
        };
        const response = await FirstTimeChangePassword(payload);

        if (response?.isSuccess) {
          navigate("/admin/reset-success");
        } else {
          alert(response?.message || "Password reset failed");
        }
      } catch (err) {
        console.error(err);
        alert("Something went wrong.");
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8DFEC]">
      <div className="w-full max-w-md space-y-5 rounded-lg bg-gradient-to-b from-[#3F2B96] to-[#A8C0FF] p-8 shadow-md">
        <h2 className="text-left text-2xl font-medium text-white">
          Reset Password for the First Time
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              className="w-full rounded border p-2"
            />
          </div>

          {/* Current Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white">Old Password</label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded border p-2"
            />
          </div>

          {/* New Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={`w-full rounded border p-2 ${
                newPassword.length > 0 && !validation.minLength
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Enter new password"
            />
          </div>

          {/* Password Requirements */}
          <div className="space-y-2 text-sm">
            <PasswordRequirement valid={validation.minLength} text="At least 8 characters" />
            <PasswordRequirement valid={validation.hasUppercase} text="At least one uppercase letter (A-Z)" />
            <PasswordRequirement valid={validation.hasLowercase} text="At least one lowercase letter (a-z)" />
            <PasswordRequirement valid={validation.hasNumber} text="At least one number" />
            <PasswordRequirement valid={validation.hasSpecialChar} text="At least one special character" />
          </div>

          {/* Confirm Password */}
          <div>
            <label className="mb-1 block text-sm font-medium text-white">Confirm New Password</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full rounded border p-2 ${
                confirmPassword.length > 0 && !validation.passwordsMatch
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Confirm new password"
            />
          </div>

          <Button
            type="submit"
            disabled={!Object.values(validation).every((v) => v)}
            className={`mt-3 w-full rounded px-4 py-2 ${
              Object.values(validation).every((v) => v)
                ? "bg-[#43319A] text-white hover:bg-[#030812]/90"
                : "cursor-not-allowed bg-gray-300 text-gray-500"
            }`}
          >
            Reset Password
          </Button>
        </form>
      </div>
    </div>
  );
}

function PasswordRequirement({ valid, text }: { valid: boolean; text: string }) {
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
