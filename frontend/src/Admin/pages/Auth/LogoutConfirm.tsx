import { Button } from "@/User/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
} from "@/User/components/ui/dialog";

import LogoutIcon from "@/Admin/data/Icons/logout.svg";
import { useAdminAuth } from "@/Admin/data/AdminAuth";
import { useNavigate } from "react-router-dom";

export default function LogoutConfirmation({
  children,
}: {
  children: React.ReactNode;
}) {
  const { logout } = useAdminAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/admin/login"); // Redirect to login page
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent
        showCloseButton={false}
        className="z-50 flex max-w-md flex-col items-center justify-center rounded-lg bg-gradient-to-b from-[#3F2B96E5] to-[#A8C0FF] p-8 shadow-lg backdrop-blur-sm dark:bg-gray-800"
      >
        <div className="flex items-center justify-center">
          <img src={LogoutIcon} alt="logouticon" />
        </div>
        <h2 className="text-2xl font-medium text-white">
          Are you sure you want to log out?
        </h2>
        <p className="mt-2 text-gray-200">
          You can always log back in at any time.
        </p>
        <div className="mt-6 flex justify-between gap-5">
          <DialogClose asChild>
            <Button variant="outline" size="lg" className="dark:bg-gray-700">
              Cancel
            </Button>
          </DialogClose>

          <Button
            variant="destructive"
            size="lg"
            onClick={handleLogout}
            className="dark:bg-red-500"
          >
            Logout
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
