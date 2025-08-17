import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import AddonsInputGroup from "@/Admin/components/pages/venue/AddonInputGroup.tsx";
import AdminActionDialog from "@/Admin/components/Layouts/AdminActionDialog.tsx";
import { getVenueByCode, updateVenue } from "@/services/VenueService.ts";
import type { FullVenueData } from "@/Admin/DataTypes/VenueDataTypes.ts";
import VenueImageUpload from "@/Admin/components/pages/venue/VenueImageUpload.tsx";

export default function EditVenuePage() {
  const { venueCode } = useParams<{ venueCode: string }>();
  const [venueName, setVenueName] = useState("");
  const [venueTypeCode, setVenueTypeCode] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [addons, setAddons] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [initialUrls, setInitialUrls] = useState<string[]>([]);
  const [deletedImages] = useState<string[]>([]);

  // Load existing venue
  useEffect(() => {
    const fetchVenue = async () => {
      if (!venueCode) return;
      try {
        const res = await getVenueByCode(venueCode);
        if (res.isSuccess && res.data?.venue) {
          const v: FullVenueData = res.data.venue;
          setVenueName(v.venueName);
          setVenueTypeCode(v.venueTypeCode);
          setCapacity(v.capacity);
          setAddress(v.address);
          setDescription(v.description);
          setFacilities(v.facilities);
          setAddons(v.addons || []);
          setInitialUrls(Array.isArray(v.venueImage) ? v.venueImage : []);
        }
      } catch (err) {
        console.error("Error loading venue:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchVenue();
  }, [venueCode]);

  const handleUpdate = async () => {
    if (!venueName.trim() || !venueTypeCode.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      images.forEach((file) => formData.append("VenueImage", file));

      const query = {
        VenueCode: venueCode!,
        VenueName: venueName,
        VenueTypeCode: venueTypeCode,
        Capacity: Number(capacity),
        Address: address,
        Description: description,
        Facilities: facilities,
        Addons: addons,
      };

      const res = await updateVenue({ query, formData });

      if (res?.isSuccess) {
        setIsOpen(true);
        setTimeout(() => {
          window.location.href = "/admin/venue";
        }, 2000);
      } else {
        alert("Failed to update venue: " + (res?.message || "Unknown error"));
      }
    } catch (e: any) {
      console.error("Error Updating Venue", e);
      alert("Error updating Venue: " + (e.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <p className="mt-20 text-center">Loading...</p>;

  return (
    <section className="relative mt-10 ml-12 h-fit w-[65rem] rounded-md bg-white px-20 py-14">
      <div className="flex flex-col justify-start gap-3">
        <AdminTitle>Edit Venue</AdminTitle>
        <p className="text-[#43319A]">
          Update the fields below and save changes.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-6">
        <div className="flex justify-between">
          <AdminInputLabel
            label="Venue Name"
            value={venueName}
            name="venueName"
            readonly
            type="text"
            onChange={(v) => setVenueName(v)}
            placeholder="Enter Venue Name"
            required
          />
          <AdminInputLabel
            label="Venue Type Code"
            value={venueTypeCode}
            name="venueTypeCode"
            readonly
            type="text"
            onChange={(v) => setVenueTypeCode(v)}
            placeholder="Enter Type Code"
            required
          />
        </div>

        <div className="flex justify-between">
          <AdminInputLabel
            label="Capacity"
            value={capacity}
            name="capacity"
            type="number"
            readonly
            onChange={(v) => setCapacity(Number(v))}
            placeholder="Enter Capacity"
          />
          <AdminInputLabel
            label="Address"
            value={address}
            name="address"
            type="textarea"
            onChange={(v) => setAddress(v)}
            placeholder="Enter Address"
          />
        </div>

        <div className="flex justify-between">
          <AdminInputLabel
            label="Description"
            value={description}
            name="description"
            type="textarea"
            onChange={(v) => setDescription(v)}
            placeholder="Enter Description"
          />
          <AdminInputLabel
            label="Facilities"
            value={facilities}
            name="facilities"
            type="textarea"
            onChange={(v) => setFacilities(v)}
            placeholder="Enter Facilities"
          />
        </div>

        <AddonsInputGroup selectedAddons={addons} onChange={setAddons} />

        <VenueImageUpload
          images={images}
          setImages={setImages}
          initialUrls={initialUrls.filter(
            (url) => !deletedImages.includes(url),
          )}
        />
      </div>

      {/* Buttons */}
      <div className={`h-20 w-full`}></div>
      <div className="absolute right-20 bottom-14 flex flex-row gap-6">
        <button
          onClick={() => {
            window.history.back();
          }}
          className="h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
        >
          Cancel
        </button>
        <button
          onClick={handleUpdate}
          disabled={isSubmitting}
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#FC9B51] text-white hover:text-purple-300 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Save
        </button>
      </div>

      <AdminActionDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        text="UPDATED SUCCESSFULLY ! RETURNING TO VENUE LIST..."
      />
    </section>
  );
}
