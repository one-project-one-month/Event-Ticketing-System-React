import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useEffect, useState } from "react";
import AdminActionDialog from "@/Admin/components/Layouts/AdminActionDialog.tsx";
import AddonsInputGroup from "@/Admin/components/pages/venue/AddonInputGroup.tsx";
import VenueImageUpload from "@/Admin/components/pages/venue/VenueImageUpload.tsx";
import type { CreateVenueParams } from "@/Admin/DataTypes/VenueDataTypes";
import { createVenue } from "@/services/VenueService";
import { getVenueTypes } from "@/services/VenueTypeService.ts";
import type { VenueTypeData } from "@/Admin/DataTypes/VenueType.ts";

export default function CreateVenuePage() {
  const [venueName, setVenueName] = useState("");
  const [venueTypeCode, setVenueTypeCode] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addons, setAddons] = useState<string[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [venueTypes, setVenueTypes] = useState<VenueTypeData[]>([]);

  useEffect(() => {
    const fetchVenueTypes = async () => {
      try {
        const res = await getVenueTypes();
        if (res.isSuccess) {
          setVenueTypes(res.data!.venueTypeList);
        } else {
          console.error("Failed to load venue types:", res.message);
        }
      } catch (e) {
        console.error("Error fetching venue types", e);
      }
    };
    fetchVenueTypes();
  }, []);

  const handleSubmit = async () => {
    if (!venueName.trim() || !venueTypeCode.trim()) {
      alert("Please fill all required fields.");
      return;
    }

    try {
      setIsSubmitting(true);

      const formData = new FormData();
      images.forEach((file) => formData.append("VenueImage", file));

      const query: CreateVenueParams = {
        VenueName: venueName,
        VenueTypeCode: venueTypeCode,
        Capacity: Number(capacity),
        Address: address,
        Description: description,
        Facilities: facilities,
        Addons: addons,
      };

      const res = await createVenue({ query, formData });

      if (res?.isSuccess) {
        setIsOpen(true);
        setTimeout(() => {
          window.location.href = "/admin/venue";
        }, 2000);
      } else {
        alert("Failed to create venue: " + (res?.message || "Unknown error"));
      }
    } catch (e: any) {
      console.error("Error Creating Venue", e);
      alert("Error creating Venue: " + (e.message || "Unknown error"));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative mt-10 ml-12 h-fit w-[65rem] rounded-md bg-white px-20 py-14">
      {/* Title */}
      <div className="flex flex-col justify-start gap-3">
        <AdminTitle>Venue Information</AdminTitle>
        <p className="text-[#43319A]">
          Please fill in all required fields to create a new venue.
        </p>
      </div>

      {/* Form */}
      <div className="mt-8 flex flex-col gap-6">
        <div className="flex justify-between">
          <AdminInputLabel
            label="Venue Name"
            value={venueName}
            name="venueName"
            type="text"
            onChange={(v) => setVenueName(v)}
            placeholder="Enter Venue Name"
            required={true}
          />
          {/* Select Box for Venue Type */}
          <div className="flex w-96 flex-col gap-2">
            <label className="text-xl text-[#615CB8]">
              Venue Type <span className="text-red-500">*</span>
            </label>
            <select
              value={venueTypeCode}
              onChange={(e) => setVenueTypeCode(e.target.value)}
              className="rounded-[10px] border border-gray-300 p-2 text-center focus:border-purple-500 focus:ring-purple-500"
            >
              <option value="">-- Select Venue Type --</option>
              {venueTypes.map((type) => (
                <option key={type.venueTypeCode} value={type.venueTypeCode}>
                  {type.venueTypename}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex justify-between">
          <AdminInputLabel
            label="Capacity"
            value={capacity}
            name="capacity"
            type="number"
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

        <div className={`flex justify-between`}>
          <AddonsInputGroup selectedAddons={addons} onChange={setAddons} />
          <VenueImageUpload images={images} setImages={setImages} />
        </div>
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
          onClick={handleSubmit}
          disabled={isSubmitting}
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#FC9B51] text-white hover:text-purple-300 ${isSubmitting ? "cursor-not-allowed opacity-50" : ""}`}
        >
          Save
        </button>
      </div>

      <AdminActionDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        text="SAVED SUCCESSFULLY ! RETURNING TO VENUE LIST..."
      />
    </section>
  );
}
