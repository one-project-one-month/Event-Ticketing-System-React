import { useParams, useNavigate } from "react-router-dom";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { useEffect, useState } from "react";
import { Label } from "@/Admin/components/ui/Label";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { getAdminDataByCode } from "@/services/AdminServices";
import type { AdminData } from "@/Admin/DataTypes/Admin";

export default function AdminDetailPage() {
  const { adminCode } = useParams<{ adminCode: string }>();
  const navigate = useNavigate();
  const [adminData, setAdminData] = useState<AdminData | null>(null);
  const [loading, setLoading] = useState(true);
  const baseURL = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchTicketType = async () => {
      if (!adminCode) {
        setLoading(false);
        return;
      }
      const res = await getAdminDataByCode(adminCode);
      console.log("API response:", res);
      if (res.isSuccess && res.data?.admin) {
        console.log("Admin fetched successfully:", res.data.admin);
        setAdminData(res.data.admin);
      } else {
        console.error("Failed to fetch event:", res.message);
        setAdminData(null);
      }
      setLoading(false);
    };
    fetchTicketType();
  }, [adminCode]);

  if (loading) return <p className="mt-20 text-center">Loading...</p>;
  if (!adminData) return <p className="mt-20 text-center">Admin not found.</p>;

  return (
    <div className="mx-auto max-w-6xl rounded-md bg-white p-10">
      <h1 className="mb-6 text-3xl font-bold text-[#233B75]">
        Event Information
      </h1>

      <div className="grid grid-cols-2 gap-x-8 gap-y-5">
        <div>
          <Label label="Event Code" required />
          <TextInput value={adminData.adminCode} readOnly />
        </div>
        <div>
          <Label label="Event Category Code" required />
          <TextInput value={adminData.username} readOnly />
        </div>
        <div>
          <Label label="Event Name" required />
          <TextInput value={adminData.fullName} readOnly />
        </div>
        <div>
          <Label label="Unique Name" required />
          <TextInput value={adminData.phoneNo} readOnly />
        </div>
        <div>
          <Label label="Business Owner Name" required />
          <TextInput value={adminData.email} readOnly />
        </div>
        <div>
          <Label label="Venue Name" required />
          <img
            src={`${baseURL}/${adminData.profileImageUrl}`}
            alt="profile"
            className="h-20 w-32 rounded-md border object-cover"
          />
        </div>
      </div>

      <div className="mt-8 text-right">
        <PurpleOutlineButton text="Back" onClick={() => navigate(-1)} />
      </div>
    </div>
  );
}
