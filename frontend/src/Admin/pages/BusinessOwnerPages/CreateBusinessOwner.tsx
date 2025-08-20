import { useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import type { createBusinessOwnerData } from "@/Admin/DataTypes/BusinessOwner";
import { createBusinessOwner } from "@/services/BusinessOwnerServices";

export default function CreateBusinessOwner() {
  const navigate = useNavigate();

  const [form, setForm] = useState<createBusinessOwnerData>({
    fullName: "",
    email: "",
    phone: "",
  });

  const [error, setError] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof createBusinessOwnerData, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setError("");

    if (!form.fullName || !form.email || !form.phone) {
      setError("Please fill in all required fields.");
      return;
    }

    try {
      const res = await createBusinessOwner(form);
      if (res?.isSuccess) {
        setShowSuccess(true);
      } else {
        setError(res?.message || "Failed to create business owner.");
      }
    } catch (err) {
      console.error(err);
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#6C2BD9]">Business Owner Information</h1>
      <h2 className="text-xl mb-6 text-[#6C2BD9]">
        Please fill in all required fields to create a new business owner.
      </h2>

      <div className="grid grid-cols-2 mt-10 gap-x-24 gap-y-10">
        <div>
          <Label label="Full Name" required />
          <TextInput
            placeholder="Enter full name"
            value={form.fullName}
            onChange={(e) => handleChange("fullName", e.target.value)}
          />
        </div>

        <div>
          <Label label="Email" required />
          <TextInput
            placeholder="Enter email"
            type="email"
            value={form.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </div>

        <div>
          <Label label="Phone Number" required />
          <TextInput
            placeholder="09-xxxxxxxxx"
            value={form.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
          />
        </div>
      </div>

      {error && (
        <div className="mt-6 text-red-600 text-sm font-semibold">{error}</div>
      )}

      <div className="mt-8 flex justify-end gap-5">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Create" onClick={handleSave} />
      </div>

      <SaveSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onConfirm={() => {
          setShowSuccess(false);
          navigate("/admin/business/owner");
        }}
      />
    </div>
  );
}
