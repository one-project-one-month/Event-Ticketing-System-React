import { useState, useEffect } from "react";
import { useAdminAuth } from "@/Admin/data/AdminAuth";
import { Login } from "@/services/AuthServices";
import { Card, CardContent } from "@/User/components/ui/card";
import { User, Lock, CheckCircle } from "lucide-react";
import { Button } from "@/User/components/ui/button";
import { Input } from "@/User/components/ui/input";
import { useNavigate } from "react-router-dom";

export default function AdminLoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const { login } = useAdminAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await Login({ userName: username, password });

      if (response.isSuccess && response.data) {
        login(
          response.data.token,
          response.data.tokenExpiresAt,
          response.data.refreshToken,
          response.data.refreshTokenExpiresAt,
        );
        if(response.data.requirePasswordChange == true){
          navigate("/admin/reset-password")
        }
        else{
        setShowSuccess(true);
        setError("");
        }
      } else {
        setError(response.message || "Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  return (
    <div className="flex min-h-screen items-center justify-center gap-3 bg-[#444444] p-8">
      {!showSuccess ? (
        <Card className="w-[400px] border-none bg-[linear-gradient(180deg,#3f2b96_50%,#a8c0ff_100%)] shadow-xl">
          <CardContent className="p-14">
            <form onSubmit={handleSubmit}>
              <div className="mb-8 text-center">
                <h1 className="mb-4 text-sm font-medium text-white">
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
                  <button
                    type="button"
                    className="text-sm text-white/80 hover:text-white"
                  >
                    Forgot Password?
                  </button>
                </div>
                <Button
                  type="submit"
                  className="h-12 w-full bg-[#030812] font-medium text-white hover:bg-[#030812]/90"
                >
                  Log In
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-[350px] border-none bg-gradient-to-b from-[#43319a] to-[#43319a]/80 shadow-xl">
          <CardContent className="p-8 text-center">
            <div className="mb-6">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-white/20">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-white">
                Login Successful!
              </h2>
              <p className="mb-1 text-sm text-white/80">
                Welcome back, Admin! You have successfully logged in.
              </p>
              <p className="text-xs text-white/60">
                Redirecting to dashboard...
              </p>
            </div>

            <Button
              className="bg-primary h-10 w-full font-medium text-white hover:bg-[#030812]/90"
              onClick={() => (window.location.href = "/admin/dashboard")}
            >
              Go to Dashboard
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
