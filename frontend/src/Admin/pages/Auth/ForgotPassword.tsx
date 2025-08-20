// src/Admin/pages/ForgotPassword.tsx
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/User/components/ui/button";
import { Input } from "@/User/components/ui/input";
import forgotpassword from "@/Admin/data/Icons/ForgotPassword.png";

export default function AdminForgotPasswordPage() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add your password reset logic here
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8DFEC]">
      <div className="w-full max-w-md space-y-5 rounded-lg bg-gradient-to-b from-[#3F2B96] to-[#A8C0FF] p-8 shadow-md">
        <div className="flex items-center justify-center">
          <img
            src={forgotpassword}
            alt="forgetpasswordlogo"
            className="size-[164px]"
          />
        </div>
        <h3 className="text-center text-2xl font-medium text-white">
          Forgot your password?
        </h3>
        <p>
          Enter the email address, and we’ll send you a link to reset your
          password.
        </p>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium">
              Email address
              <span className="ml-1 text-red-600">*</span>
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              required
              className="mt-1"
            />
          </div>
          <div className="flex items-center justify-between">
            <Button
              type="button"
              variant="link"
              onClick={() => navigate("/admin/login")}
            >
              Back to login
            </Button>
            <Link to="/admin/reset-password">
              <Button type="submit" className="bg-[#43319A] text-white">
                Send Reset Link
              </Button>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
