import { Button } from "@/User/components/ui/button";
import { Card, CardContent } from "@/User/components/ui/card";
import { useNavigate } from "react-router-dom";

import resetSuccess from "@/Admin/data/Icons/resetSuccess.svg";
export default function ResetSuccess() {
  const navigate = useNavigate();

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#D8DFEC]">
      <Card className="min-h-md w-full max-w-md border-none bg-gradient-to-b from-[#43319a] to-[#A8C0FF]/80 shadow-xl">
        <CardContent className="p-8 text-center">
          <div className="mb-6">
            <div className="flex items-center justify-center">
              <img
                src={resetSuccess}
                alt="resetSuccess"
                className="size-[164px]"
              />
            </div>
            <h2 className="mb-2 text-xl font-semibold text-white">
              Password changed successfully!
            </h2>
            <p className="mb-1 text-sm text-white/80">
              Your password has been updated. You can now sign in with your new
              credentials.
            </p>
          </div>

          <Button
            className="h-10 w-full bg-[#43319A] font-medium text-white hover:bg-[#030812]/90"
            onClick={() => {
              navigate("/admin/dashboard");
            }}
          >
            LOGIN
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
