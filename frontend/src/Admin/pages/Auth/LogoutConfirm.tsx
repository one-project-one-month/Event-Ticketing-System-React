import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/User/components/ui/dialog";
import { Button } from "@/User/components/ui/button";
import { useAdminAuth } from "@/Admin/data/AdminAuth";
import LogoutIcon from "@/Admin/data/Icons/logout.svg";
export default function LogoutConfirmation({
  onConfirm,
  children,
}: {
  onConfirm?: () => void;
  children: React.ReactNode;
}) {
  const { logout } = useAdminAuth();

  const handleLogout = () => {
    logout();
    if (onConfirm) onConfirm();
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

        <DialogTitle asChild>
          <h2 className="text-2xl font-medium text-white">
            Are you sure you want to log out?
          </h2>
        </DialogTitle>

        <DialogDescription asChild>
          <p className="mt-2 text-gray-200">
            You can always log back in at any time.
          </p>
        </DialogDescription>

        <div className="mt-6 flex justify-between gap-5">
          <DialogClose asChild>
            <Button variant="outline" size="lg" className="dark:bg-gray-700">
              Cancel
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button
              variant="destructive"
              size="lg"
              onClick={handleLogout}
              className="dark:bg-red-500"
            >
              Logout
            </Button>
          </DialogClose>
        </div>
      </DialogContent>
    </Dialog>
  );
}
