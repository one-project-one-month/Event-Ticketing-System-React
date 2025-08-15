import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import type { CreateVenueType } from "@/Admin/DataTypes/VenueType";
import { createVenueType } from "@/services/VenueTypeService.ts";

export default function CreateVenueTypePage() {
  const navigate = useNavigate();
  const [venueTypeName, setVenueTypeName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!venueTypeName.trim()) {
      setError("Venue type name is required.");
      return;
    }

    const payload: CreateVenueType = {
      venueTypeName: venueTypeName.trim(),
    };

    try {
      const response = await createVenueType(payload);

      if (response.isSuccess) {
        setShowSuccess(true);
      } else {
        setError(response.message || "Failed to create venue type.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <section
      className={`relative mt-10 ml-12 h-[45rem] w-[65rem] rounded-md bg-white px-20 py-14`}
    >
      {/* Title */}
      <div className={`flex flex-col justify-start gap-3`}>
        <AdminTitle>Venue Type Information</AdminTitle>
        <p className={`text-[#43319A]`}>
          Please fill in all required fields to create a new venue type.
        </p>
      </div>

      {/* Form */}
      <div className={`mt-8`}>
        <AdminInputLabel
          label={`Venue Type Name`}
          value={venueTypeName}
          name={`venueTypeName`}
          type={`text`}
          onChange={(v) => setVenueTypeName(v)}
          placeholder={"Enter Venue Name"}
          required={true}
        />
        {error && <p className="mt-2 text-red-500">{error}</p>}
      </div>

      {/* Buttons */}
      <div className={`absolute right-20 bottom-14 flex flex-row gap-6`}>
        <button
          onClick={() => navigate(-1)}
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300`}
        >
          Cancel
        </button>
        <button
          onClick={handleSave}
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#FC9B51] text-white hover:text-purple-300`}
        >
          Save
        </button>
      </div>

      {/* Success Dialog */}
      <SaveSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        onConfirm={() => {
          setShowSuccess(false);
          navigate(-1); // Go back to previous route
        }}
      />
    </section>
  );
}
