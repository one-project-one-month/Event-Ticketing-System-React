import { BellIcon } from "lucide-react";
import { Button } from "@/User/components/ui/button";
import { ModeToggle } from "@/User/components/mode-toggle";

export default function AdminNavBar() {
  const admin = {
    name: "Brian",
    email: "brian@example.com",
    avatarUrl: "https://i.pravatar.cc/40?img=12",
  };

  return (
    <header className="mb-1.5 flex h-[90px] w-full items-center justify-between px-6 py-3">
      <div className="ml-10 text-3xl font-bold text-[#43319A] dark:text-[#E6E0FF]">
        Event Ticket System
      </div>

      <div className="mr-10 flex gap-x-4">
        <div className="mt-2">
          <ModeToggle />
        </div>
        <Button className="relative mt-2 bg-transparent text-[#43319A] shadow-none hover:cursor-pointer hover:bg-transparent dark:text-[#E6E0FF]">
          <BellIcon className="size-7" />
        </Button>
        <div className="flex items-center gap-x-4 hover:cursor-pointer">
          <img
            src={admin.avatarUrl}
            alt="avatar"
            className="h-[50px] w-[50px] rounded-full border"
          />
          <div className="text-[16px] text-[#43319A] hover:cursor-pointer dark:text-[#E6E0FF]">
            <div>{admin.name}</div>
            <div>{admin.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
