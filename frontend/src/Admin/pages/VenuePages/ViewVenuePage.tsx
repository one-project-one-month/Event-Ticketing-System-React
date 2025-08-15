import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import AddonsInputGroup from "@/Admin/components/pages/venue/AddonInputGroup.tsx";
import VenueImageUpload from "@/Admin/components/pages/venue/VenueImageUpload.tsx";
import { getVenueByCode } from "@/services/VenueService.ts";
import type { FullVenueData } from "@/Admin/DataTypes/VenueDataTypes.ts";

export default function ViewVenuePage() {
  const { venueCode } = useParams<{ venueCode: string }>();
  const [venue, setVenue] = useState<FullVenueData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchVenue = async () => {
      if (!venueCode) {
        setError("Venue code is missing.");
        setLoading(false);
        return;
      }

      try {
        const res = await getVenueByCode(venueCode);
        if (res.isSuccess && res.data?.venue) {
          setVenue(res.data.venue);
        } else {
          setError(res.message || "Venue not found.");
        }
      } catch (err) {
        console.error("Error fetching venue:", err);
        setError("An error occurred while fetching venue data.");
      } finally {
        setLoading(false);
      }
    };

    fetchVenue();
  }, [venueCode]);

  if (loading) return <p className="mt-20 text-center">Loading...</p>;
  if (error) return <p className="mt-20 text-center text-red-500">{error}</p>;
  if (!venue) return <p className="mt-20 text-center">Venue not found.</p>;

  return (
    <section className="relative mt-10 ml-12 h-fit w-[65rem] rounded-md bg-white px-20 py-14">
      {/* Title */}
      <div className="flex flex-col justify-start gap-3">
        <AdminTitle>Venue Information</AdminTitle>
        <p className="text-[#43319A]">
          View venue details below. Fields are read-only.
        </p>
      </div>

      {/* Form */}
      <div className="mt-10 grid grid-cols-2 gap-x-10 gap-y-6">
        <AdminInputLabel
          label="Venue Code"
          value={venue.venueCode}
          readonly
          name={""}
          onChange={() => {}}
          type={""}
          placeholder={""}
        />
        <AdminInputLabel
          label="Venue Name"
          value={venue.venueName}
          readonly
          name={""}
          onChange={() => {}}
          type={""}
          placeholder={""}
        />
        <AdminInputLabel
          label="Venue Type Code"
          value={venue.venueTypeCode}
          readonly
          name={""}
          onChange={() => {}}
          type={""}
          placeholder={""}
        />
        <AdminInputLabel
          label="Capacity"
          value={venue.capacity}
          readonly
          name={""}
          onChange={() => {}}
          type={""}
          placeholder={""}
        />
        <AdminInputLabel
          label="Address"
          value={venue.address}
          type="textarea"
          readonly
          name={""}
          onChange={() => {}}
          placeholder={""}
        />
        <AdminInputLabel
          label="Description"
          value={venue.description}
          type="textarea"
          readonly
          name={""}
          onChange={() => {}}
          placeholder={""}
        />
        <AddonsInputGroup
          selectedAddons={venue.addons}
          readonly
          onChange={() => {}}
        />
        <AdminInputLabel
          label="Facilities"
          value={venue.facilities}
          type="textarea"
          readonly
          name={""}
          onChange={() => {}}
          placeholder={""}
        />
        <VenueImageUpload
          images={[]}
          setImages={() => {}}
          initialUrls={Array.isArray(venue.venueImage) ? venue.venueImage : []}
          readonly
        />
      </div>

      {/* Back Button */}
      <div className="mt-12 flex justify-end">
        <button
          onClick={() => window.history.back()}
          className="h-12 w-32 rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
        >
          Back
        </button>
      </div>
    </section>
  );
}
