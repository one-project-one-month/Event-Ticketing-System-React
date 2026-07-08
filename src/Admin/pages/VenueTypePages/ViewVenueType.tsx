import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getVenueTypeByCode } from "@/services/VenueTypeService.ts";
import type { VenueTypeData } from "@/Admin/DataTypes/VenueType.ts";

export default function ViewVenueTypePage() {
  const { venueTypeCode } = useParams<{ venueTypeCode: string }>();
  const [venue, setVenue] = useState<VenueTypeData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVenueType = async () => {
      if (!venueTypeCode) return;

      const res = await getVenueTypeByCode(venueTypeCode);

      if (res.isSuccess && res.data?.venueTypeEdit) {
        setVenue(res.data.venueTypeEdit);
      } else {
        console.error("Failed to fetch venue type:", res.message);
        setVenue(null);
      }

      setLoading(false);
    };

    fetchVenueType();
  }, [venueTypeCode]);

  if (loading) {
    return <p className="mt-20 text-center">Loading...</p>;
  }

  if (!venue) {
    return (
      <p className="mt-20 text-center text-red-500">No venue type found.</p>
    );
  }

  return (
    <section className="relative mt-10 ml-12 h-[45rem] w-[65rem] rounded-md bg-white px-20 py-14">
      {/* Title */}
      <div className="flex flex-col justify-start gap-3">
        <AdminTitle>Venue Type Information</AdminTitle>
      </div>

      {/* Details */}
      <div className="mt-8 flex flex-row justify-between">
        <AdminInputLabel
          label="Venue Type Code"
          value={venue.venueTypeCode}
          name="venueTypeCode"
          type="text"
          onChange={() => {}}
          placeholder={""}
          readonly
        />
        <AdminInputLabel
          label="Venue Type Name"
          value={venue.venueTypename}
          name="venueTypeName"
          type="text"
          readonly
          onChange={() => {}}
          placeholder={""}
        />
      </div>

      {/* Buttons */}
      <div className="absolute right-20 bottom-14 flex flex-row gap-6">
        <button
          onClick={() => window.history.back()}
          className="h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
        >
          Back
        </button>
      </div>
    </section>
  );
}
