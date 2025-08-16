import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, ChevronUp, Settings, LogOutIcon } from "lucide-react";

import { adminSiteConfig } from "@/Admin/config/site.ts";
import type { AdminNavItem } from "@/types";
import LogoutConfirmation from "@/Admin/pages/Auth/LogoutConfirm";
import {clearTokens} from '@/Admin/utils/authTokenUtils';

export default function AdminSidebar() {
  const navigate = useNavigate();
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (title: string) => {
    setOpenDropdowns((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  const handleLogout = () => {
    clearTokens();
    navigate("/admin/login");
  };

  const handleSetting = () => {
    navigate("/admin/setting");
  };

  // Check if item or any child is active
  const isActive = (item: AdminNavItem) => {
    return (
      location.pathname === item.href ||
      item.children?.some((child) => location.pathname === child.href)
    );
  };

  return (
    <div className="mt-2 flex h-auto w-[260px] flex-col items-center justify-start rounded-tr-[80px] bg-gradient-to-b from-[#3F2B96E5] to-[#A8C0FF] text-white dark:bg-gradient-to-b dark:from-[#1E0B4D] dark:to-[#2A3A6B]">
      <div className="mt-[60px] ml-[46px] h-[715px] w-[214px]">
        <ul>
          {adminSiteConfig.sidebarNav.map((item) =>
            item.children ? (
              <li key={item.title}>
                <div
                  className="my-3 flex cursor-pointer items-center justify-start gap-x-6 rounded-s-3xl px-3 py-1 text-[18px] transition-all duration-200 ease-in-out hover:bg-[#F8F8FF] hover:text-[#030812]"
                  onClick={() => toggleDropdown(item.title)}
                >
                  {item.icon && <item.icon className="size-5" />}
                  <span>{item.title}</span>
                  {openDropdowns[item.title] ? (
                    <ChevronUp size={16} />
                  ) : (
                    <ChevronDown size={16} />
                  )}
                </div>
                {openDropdowns[item.title] && (
                  <ul>
                    {item.children?.map((child) => (
                      <li
                        key={child.title}
                        onClick={() => navigate(child.href)}
                      >
                        <div
                          className={`my-3 ml-3 flex cursor-pointer gap-x-6 rounded-s-3xl px-3 py-1 transition-all duration-200 ease-in-out hover:bg-[#F8F8FF] hover:text-[#030812] ${location.pathname === child.href ? "bg-[#F8F8FF] text-[#030812]" : ""} `}
                        >
                          {child.icon && <child.icon className="size-5" />}
                          {child.title}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ) : (
              <li
                key={item.title}
                className={`my-3 flex cursor-pointer gap-x-6 rounded-s-3xl px-3 py-1 text-[18px] transition-all duration-200 ease-in-out hover:bg-[#F8F8FF] hover:text-[#030812] ${
                  isActive(item) ? "bg-[#F8F8FF] text-[#030812]" : ""
                }`}
                onClick={() => navigate(item.href)}
              >
                {item.icon && <item.icon className="mt-1 size-5" />}
                {item.title}
              </li>
            ),
          )}

          <li className="mt-[60px]">
            <button
              onClick={handleSetting}
              className="flex w-full cursor-pointer items-center justify-start gap-x-6 rounded-s-3xl px-3 py-1 text-[18px] transition-all duration-200 ease-in-out hover:bg-[#F8F8FF] hover:text-[#030812]"
            >
              <Settings className="size-5" />
              Setting
            </button>
          </li>
          <li>
            <LogoutConfirmation onConfirm={handleLogout}>
              <button className="my-3 flex w-full cursor-pointer items-center justify-start gap-x-6 rounded-s-3xl px-3 py-1 text-[18px] transition-all duration-200 ease-in-out hover:bg-[#F8F8FF] hover:text-[#030812]">
                <LogOutIcon className="size-5" />
                Logout
              </button>
            </LogoutConfirmation>
          </li>
        </ul>
      </div>
    </div>
  );
}
