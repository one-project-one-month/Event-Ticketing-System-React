import { useState, useEffect } from "react";
import type { AdminDataByCodeData } from "@/Admin/DataTypes/Admin";
import { getAdminDataByCode, updateAdminInfo } from "@/services/AdminServices";
import { AxiosError } from "axios";
import { Label } from "@/Admin/components/ui/Label";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import { useNavigate, useParams } from "react-router-dom";

const UpdateAdminPage = () => {
  const { adminCode } = useParams<{ adminCode: string }>();
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [adminData, setAdminData] = useState<AdminDataByCodeData>({
    adminCode: "",
    username: "",
    fullName: "",
    email: "",
    phoneNo: "",
    profileImage: "",
  });

  useEffect(() => {
    if (!adminCode) return;
    const fetchAdminData = async () => {
      try {
        setIsLoading(true);
        const res = await getAdminDataByCode(adminCode);

        if (res.isSuccess && res.data?.admin) {
          const admin = res.data.admin;
          setAdminData({
            adminCode: admin.adminCode,
            username: admin.username || "",
            fullName: admin.fullName,
            email: admin.email || "",
            phoneNo: admin.phoneNo || "",
            profileImage: admin.profileImage || "",
          });
        } else {
          console.error("Failed to fetch admin data:", res.message);
          setError(res.message);
        }
      } catch (err) {
        const error = err as AxiosError | Error;
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAdminData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAdminData((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdate = async () => {
    if (!adminData) return;

    try {
      const res = await updateAdminInfo({
        adminCode: adminData.adminCode,
        fullName: adminData.fullName,
        phoneNo: adminData.phoneNo,
      });

      if (res.isSuccess) {
        setShowSuccess(true);
      }
    } catch (err) {
      const error = err as AxiosError | Error;
      setError(error.message);
    }
  };

  if (error) {
    return (
      <div className="mx-[210px] max-w-lg p-6">
        <div className="rounded-lg bg-red-100 p-4 text-red-500">
          <strong>Error:</strong> {error}
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="mx-[210px] max-w-lg p-6">
        <div className="flex h-64 items-center justify-center">
          <div className="h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl rounded-md bg-white p-20">
      <h1 className="mb-6 text-3xl font-bold text-[#6C2BD9]">
        Admin Information
      </h1>
      <h2 className="mb-6 text-xl text-[#6C2BD9]">
        Please fill in all required fields to create a new admin account.
      </h2>
      <div className="mt-10 grid grid-cols-2 gap-x-25 gap-y-10">
        <div>
          <Label label="Full Name" required />
          <TextInput
            type="text"
            name="fullName"
            value={adminData.fullName}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label label="Username" required />
          <TextInput
            type="text"
            name="username"
            value={adminData.username}
            disabled
          />
        </div>
      </div>
      <div className="mt-10">
        <Label label="Email Address" required />
        <TextInput type="email" name="email" value={adminData.email} disabled />
      </div>
      <div className="mt-10">
        <Label label="Mobile Number" required />
        <TextInput
          type="text"
          name="phoneNo"
          value={adminData.phoneNo}
          onChange={handleChange}
          required
        />
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-8 flex justify-end gap-[20px]">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Save" type="submit" onClick={handleUpdate} />
        <SaveSuccessModal
          open={showSuccess}
          onClose={() => setShowSuccess(false)}
          onConfirm={() => {
            setShowSuccess(false);
            navigate("/admin/admin");
          }}
        />
      </div>
    </div>
  );
};

export default UpdateAdminPage;
