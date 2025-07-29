import { Outlet } from "react-router-dom";
import AdminSidebar from "@/Admin/components/Layouts/AdminSidebar";
import AdminNavBar from "@/Admin/components/Layouts/AdminNavBar";

export default function AdminLayout() {
  return (
    <div className="flex flex-col h-screen">
      <AdminNavBar />

      <div className="flex flex-1 overflow-hidden">
        <AdminSidebar />
        <main className="flex-1 bg-[#D8DFEC] p-4 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
