import { useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import type { createAdminData } from "@/Admin/DataTypes/Admin";

import { createAdmin } from "@/services/AdminServices";

export default function CreateAdminPage() {
  const navigate = useNavigate();
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState<createAdminData>({
    username: "",
    email: "",
    phoneNo: "",
    password: "",
    fullName: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: keyof createAdminData,
  ) => {
    const value = e.target.value;
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setError("");
    try {
      const res = await createAdmin(form);
      if (res && res.isSuccess) {
        setShowSuccess(true);
      } else {
        setError(res.message || "Failed to create event.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong.");
    }
  };

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
            placeholder="Enter full name"
            value={form.fullName}
            onChange={(e) => handleChange(e, "fullName")}
          />
        </div>
        <div>
          <Label label="Enter Username" required />
          <TextInput
            type="text"
            placeholder="Enter username"
            value={form.username}
            onChange={(e) => handleChange(e, "username")}
          />
        </div>
      </div>
      <div className="mt-10">
        <Label label="Password" required />
        <TextInput
          type="password"
          placeholder="Enter password"
          value={form.password}
          onChange={(e) => handleChange(e, "password")}
        />
      </div>
      <div className="mt-10">
        <Label label="Email Address" required />
        <TextInput
          type="text"
          placeholder="Enter email address"
          value={form.email}
          onChange={(e) => handleChange(e, "email")}
        />
      </div>
      <div className="mt-10">
        <Label label="Mobile Number" required />
        <TextInput
          type="text"
          placeholder="Enter mobile number"
          value={form.phoneNo}
          onChange={(e) => handleChange(e, "phoneNo")}
        />
      </div>

      {error && <p className="mt-4 text-red-500">{error}</p>}

      <div className="mt-8 flex justify-end gap-[20px]">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Create" type="submit" onClick={handleSave} />
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
}
