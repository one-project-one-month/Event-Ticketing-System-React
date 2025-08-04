import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useAdminAuth } from "@/Admin/data/AdminAuth";
import { Card, CardContent } from "@/User/components/ui/card";
import { User, Lock } from "lucide-react";
import { Button } from "@/User/components/ui/button";
import { Input } from "@/User/components/ui/input";
import { Login } from "@/services/Auth";
import loginSuccess from "@/Admin/data/Icons/loginSuccess.svg";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Login({ userName: username, password });

      if (response.isSuccess && response.data) {
        login(response.data.token);
        setShowSuccess(true);
        setError("");
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      setError("Something went wrong.");
      console.error(err);
    }
  };

  // ✅ Reload the page to re-evaluate ProtectedAdminRoute after success
  const handleGoToDashboard = () => {
    window.location.href = "/admin/dashboard";
  };

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 bg-[#D8DFEC]">
      {/* Login Form */}
      {!showSuccess && (
        <Card className="w-[400px] border-none bg-[linear-gradient(180deg,#3f2b96_50%,#a8c0ff_100%)] shadow-xl">
          <CardContent className="p-14">
            <form onSubmit={handleSubmit}>
              <div className="mb-8 text-center">
                <h1 className="mb-6 text-[20px] font-medium text-white">
                  Event Ticket System
                </h1>
                <h2 className="mb-2 text-start text-xl font-semibold text-white">
                  Welcome, Admin
                </h2>
                <p className="text-start text-sm text-white/80">
                  Please log in to access the dashboard
                </p>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <User className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-white/60" />
                  <Input
                    placeholder="Username"
                    className="h-12 border-0 border-b-white/20 bg-white/10 pl-10 text-white placeholder:text-white/60"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>

                <div className="relative">
                  <Lock className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-white/60" />
                  <Input
                    type="password"
                    placeholder="Password"
                    className="h-12 border-0 border-white/20 bg-white/10 pl-10 text-white placeholder:text-white/60"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                {error && <p className="text-sm text-red-500">{error}</p>}

                <div className="text-right">
                  <Link
                    to="/admin/forgot-password"
                    className="text-sm text-white/80 hover:underline"
                  >
                    Forgot Password?
                  </Link>
                </div>

                <Button
                  type="submit"
                  className="h-12 w-full bg-[#43319A] font-medium text-white hover:bg-[#030812]/90"
                >
                  Log In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <Card className="min-h-md w-full max-w-md border-none bg-gradient-to-b from-[#43319a] to-[#A8C0FF]/80 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="flex items-center justify-center">
                <img
                  src={loginSuccess}
                  alt="loginSuccess"
                  className="size-[164px]"
                />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white">
                Login Successful!
              </h2>
              <p className="mb-1 text-sm text-white/80">
                Welcome back, Admin! You have successfully logged in.
              </p>
              <p className="dark:text-accent-foreground text-xs text-white/60">
                Remember to log out if you're done.
              </p>
            </div>

            <Button
              className="h-10 w-full bg-[#43319A] font-medium text-white hover:bg-[#030812]/90"
              onClick={handleGoToDashboard}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
