import { useState } from "react";
import { TextInput } from "@/Admin/components/ui/TextInput";
import { Label } from "@/Admin/components/ui/Label";
import { YellowButton } from "@/Admin/components/ui/YellowButton";
import { PurpleOutlineButton } from "@/Admin/components/ui/PurpleOutlineButton";
import { useNavigate } from "react-router-dom";
import SaveSuccessModal from "@/Admin/components/ui/SaveSuccessModal";
import { createEventType } from "@/services/EventTypeServices";
import type { createEventTypeData } from "@/Admin/DataTypes/EventTypes";

export default function CreateEventType() {
  const navigate = useNavigate();
  const [categoryName, setCategoryName] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");

    if (!categoryName.trim()) {
      setError("Category name is required.");
      return;
    }

    const payload: createEventTypeData = {
      categoryName: categoryName.trim(),
    };

    try {
      const response = await createEventType(payload);

      if (response.isSuccess) {
        setShowSuccess(true);
      } else {
        setError("Failed to create category.");
      }
    } catch (err) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <div className="p-20 bg-white rounded-md max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-[#6C2BD9]">Event Category Information</h1>
      <h2 className="text-xl mb-6 text-[#6C2BD9]">Please fill in all required fields to create a new ticket type.</h2>

      <div className="grid grid-cols-2 mt-10 gap-x-25 gap-y-10">
        <div>
          <Label label="Category Name" required />
          <TextInput
            placeholder="Enter category name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
          />
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </div>
      </div>

      <div className="mt-8 flex justify-end gap-[20px]">
        <PurpleOutlineButton text="Cancel" onClick={() => navigate(-1)} />
        <YellowButton text="Create" type="button" onClick={handleSave} />
        <SaveSuccessModal open={showSuccess} onClose={() => {
          setShowSuccess(false);
          navigate(-1); 
        }} />
      </div>
    </div>
  );
}
