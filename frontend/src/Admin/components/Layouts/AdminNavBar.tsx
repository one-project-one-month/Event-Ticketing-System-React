import { BellIcon } from "lucide-react";
import { Button } from "@/User/components/ui/button";
import { ModeToggle } from "@/User/components/mode-toggle";
import { useEffect, useState } from "react";
import { getAuthToken } from "@/Admin/utils/authTokenUtils";
import { jwtDecode } from "jwt-decode";
import { getAdminDataByCode } from "@/services/AdminServices";
import type { AxiosError } from "axios";
import { Link } from "react-router-dom";
import avatar from "@/Admin/data/Icons/avatar.jpg";

interface JwtPayload {
  sub: string;
  unique_name: string;
}

const baseURL = import.meta.env.VITE_API_BASE_URL;

export default function AdminNavBar() {
  const [admin, setAdmin] = useState({
    username: "",
    email: "",
    profileImage: "",
  });

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const { token } = getAuthToken();
        if (!token) throw new Error("No authentication token found");

        const decoded = jwtDecode<JwtPayload>(token);
        console.log(decoded);
        const adminCode = decoded.sub;

        const res = await getAdminDataByCode(adminCode);

        if (res.isSuccess && res.data?.admin) {
          setAdmin(res.data.admin);
        }
      } catch (err) {
        const error = err as AxiosError | Error;
        console.error("Error fetching admin data:", error.message);
      }
    };

    fetchAdminData();
  }, []);

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
        </Button>{" "}
        <Link to="/admin/setting">
          <div className="flex items-center gap-x-4 hover:cursor-pointer">
            <img
              src={`${baseURL}/${admin?.profileImage}` || avatar}
              alt="avatar"
              className="h-[50px] w-[50px] rounded-full border"
            />
            <div className="text-[16px] text-[#43319A] hover:cursor-pointer dark:text-[#E6E0FF]">
              <div>{admin.username}</div>
              <div>{admin.email}</div>
            </div>
          </div>
        </Link>
      </div>
    </header>
  );
}
