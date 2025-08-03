import { Outlet } from "react-router-dom";
import AdminSidebar from "@/Admin/components/Layouts/AdminSidebar";
import AdminNavBar from "@/Admin/components/Layouts/AdminNavBar";

export default function AdminLayout() {
  return (
    <div className="flex h-screen flex-col bg-[#D8DFEC] dark:bg-[#1E293B]">
      <AdminNavBar />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 overflow-y-auto p-4">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
