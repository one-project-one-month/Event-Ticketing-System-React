// src/Admin/components/Layouts/AdminTopBar.tsx
import { BellIcon } from "lucide-react"; 

export default function AdminNavBar() {
  // Demo user data (you can replace with real user data from context/auth)
  const admin = {
    name: "Admin User",
    email: "admin@example.com",
    avatarUrl: "https://i.pravatar.cc/40?img=12", 
  };

  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white shadow-sm border-b">
      {/* Left: Logo or Title */}
      <div className="text-lg font-bold text-[#233b75]">Admin Panel</div>

      {/* Right: Notification + Profile */}
      <div className="flex items-center gap-4">
        <button className="relative text-gray-600 hover:text-black">
          <BellIcon className="w-6 h-6" />
          {/* Optional red dot */}
          <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        <div className="flex items-center gap-2">
          <img
            src={admin.avatarUrl}
            alt="avatar"
            className="w-9 h-9 rounded-full border"
          />
          <div className="text-sm text-right leading-tight">
            <div className="font-medium">{admin.name}</div>
            <div className="text-gray-500 text-xs">{admin.email}</div>
          </div>
        </div>
      </div>
    </header>
  );
}
