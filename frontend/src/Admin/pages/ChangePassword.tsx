import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { Button } from "@/User/components/ui/button";
import { SettingChangePassword } from "@/services/AuthServices";

export default function ResetPasswordPage() {
  const navigate = useNavigate();

  const { adminCode } = useParams<{
    adminCode: string;
  }>();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

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
      passwordsMatch: newPassword === confirmNewPassword && newPassword !== "",
    });
  }, [newPassword, confirmNewPassword]);

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!adminCode) {
      alert("Missing adminCode");
      return;
    }

    try {
      const payload = {
        adminCode,
        userName: adminCode,
        oldPassword,
        newPassword,
        confirmNewPassword,
      };
      console.log("Payload ->", { adminCode, oldPassword });

      const response = await SettingChangePassword(payload);

      if (response?.isSuccess) {
        navigate("/admin/reset-success");
      } else {
        alert(response?.message || "Password reset failed");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8DFEC]">
      <div className="w-full max-w-md space-y-5 rounded-lg bg-gradient-to-b from-[#3F2B96] to-[#A8C0FF] p-8 shadow-md">
        <h2 className="text-left text-2xl font-medium text-white">
          Update your password
        </h2>
        <div>Enter your current password and new password.</div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Current Password
            </label>
            <input
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              placeholder="Enter current password"
              className="w-full rounded border p-2"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              New Password
            </label>
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

          <div>
            <label className="mb-1 block text-sm font-medium text-white">
              Confirm New Password
            </label>
            <input
              type="password"
              value={confirmNewPassword}
              onChange={(e) => setConfirmNewPassword(e.target.value)}
              className={`w-full rounded border p-2 ${
                confirmNewPassword.length > 0 && !validation.passwordsMatch
                  ? "border-red-500"
                  : "border-gray-300"
              }`}
              placeholder="Confirm new password"
            />
          </div>

          <div>
            <Button type="button" onClick={() => navigate('/admin/setting')} variant="ghost" size="lg">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={!Object.values(validation).every((v) => v)}
              className={`mt-3 w-full rounded px-4 py-2 ${
                Object.values(validation).every((v) => v)
                  ? "bg-[#43319A] text-white hover:bg-[#030812]/90"
                  : "cursor-not-allowed bg-gray-300 text-gray-500"
              }`}
            >
              Done
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
