import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import AdminActionDialog from "@/Admin/components/Layouts/AdminActionDialog.tsx";
import {
  getVenueTypeByCode,
  updateVenueType,
} from "@/services/VenueTypeService.ts";

export default function EditVenueTypePage() {
  const { venueTypeCode } = useParams();
  const navigate = useNavigate();

  const [venueTypeName, setVenueTypeName] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!venueTypeCode) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await getVenueTypeByCode(venueTypeCode);

      if (res.isSuccess && res.data?.venueTypeEdit) {
        setVenueTypeName(res.data.venueTypeEdit.venueTypename);
      } else {
        console.error("Failed to fetch venue type:", res.message);
      }

      setLoading(false);
    };

    fetchData();
  }, [venueTypeCode]);

  const handleUpdate = async () => {
    if (venueTypeCode) {
      const res = await updateVenueType({
        venueTypeCode,
        venueTypeName: venueTypeName.trim(),
      });

      if (res.isSuccess) {
        setIsOpen(true);
      } else {
        alert(res.message || "Update failed.");
      }
    } else {
      alert("Error: Venue Type Code is null!");
    }
  };

  return (
    <section className="relative mt-10 ml-12 h-[45rem] w-[65rem] rounded-md bg-white px-20 py-14">
      {/* Title */}
      <div className="flex flex-col justify-start gap-3">
        <AdminTitle>Venue Type Information</AdminTitle>
        <p className="text-[#43319A]">
          Please fill in all required fields to update venue type information.
        </p>
      </div>

      {loading ? (
        <p className="mt-8 text-gray-500">Loading...</p>
      ) : (
        <>
          {/* Form */}
          <div className="mt-8">
            <AdminInputLabel
              label="Venue Type Name"
              value={venueTypeName}
              name="venueTypeName"
              type="text"
              onChange={(v) => setVenueTypeName(v)}
              placeholder="Enter Venue Name"
              required={true}
            />
          </div>

          {/* Buttons */}
          <div className="absolute right-20 bottom-14 flex flex-row gap-6">
            <button
              onClick={() => navigate(-1)}
              className="h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
            >
              Cancel
            </button>
            <button
              onClick={handleUpdate}
              className="h-12 w-32 cursor-pointer rounded-md bg-[#FC9B51] text-white hover:text-purple-300"
            >
              Update
            </button>
          </div>
        </>
      )}

      {/* Success Dialog */}
      <AdminActionDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        text="UPDATED SUCCESSFULLY !"
      />
    </section>
  );
}
