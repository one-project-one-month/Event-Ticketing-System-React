import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp } from "lucide-react";
import { adminSiteConfig } from "@/Admin/config/site.ts";

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<{ [key: string]: boolean }>({});

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = () => {
    localStorage.removeItem("admin-token");
    navigate("/admin/login");
  };

  return (
    <aside className="w-64 bg-[#233b75] text-white h-full flex flex-col justify-between">
      <div className="p-4 pt-6">
        <ul className="space-y-1 text-sm">
          {adminSiteConfig.sidebarNav.map((item) =>
            item.children ? (
              <li key={item.title}>
                <div
                  className="flex justify-between items-center px-2 py-1 cursor-pointer hover:bg-gray-700 rounded"
                  onClick={() => toggleDropdown(item.title)}
                >
                  <span>{item.title}</span>
                  {openDropdowns[item.title] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </div>
                {openDropdowns[item.title] && (
                  <ul className="ml-4 mt-1 space-y-1 text-xs">
                    {item.children.map((child) => (
                      <li
                        key={child.title}
                        className="cursor-pointer px-2 py-1 hover:bg-gray-600 rounded"
                        onClick={() => navigate(child.href)}
                      >
                        {child.title}
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={item.title}
                className="cursor-pointer px-2 py-1 hover:bg-gray-700 rounded"
                onClick={() => navigate(item.href)}
              >
                {item.title}
              </li>
            )
          )}
        </ul>
      </div>

      <div className="p-4 border-t border-white/20">
        <button
          onClick={handleLogout}
          className="text-sm text-red-400 hover:text-red-200"
        >
          Logout
        </button>
      </div>
    </aside>
  );
}
