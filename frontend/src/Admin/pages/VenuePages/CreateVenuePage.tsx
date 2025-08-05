import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useState } from "react";
import AdminActionDialog from "@/Admin/components/Layouts/AdminActionDialog.tsx";
import AddonsInputGroup from "@/Admin/components/pages/venue/AddonInputGroup.tsx";
import VenueImageUpload from "@/Admin/components/pages/venue/VenueImageUpload.tsx";

export default function CreateVenuePage() {
  const [venueName, setVenueName] = useState("");
  const [venueTypeCode, setVenueTypeCode] = useState("");
  const [capacity, setCapacity] = useState<number | "">("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [facilities, setFacilities] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [addons, setAddons] = useState<string[]>([]);

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
          <AdminInputLabel
            label="Venue Type Code"
            value={venueTypeCode}
            name="venueTypeCode"
            type="text"
            onChange={(v) => setVenueTypeCode(v)}
            placeholder="Enter Type Code"
            required={true}
          />
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
          <VenueImageUpload />
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
          onClick={() => setIsOpen(true)}
          className="h-12 w-32 cursor-pointer rounded-md bg-[#FC9B51] text-white hover:text-purple-300"
        >
          Save
        </button>
      </div>

      <AdminActionDialog
        open={isOpen}
        onClose={() => setIsOpen(false)}
        text="SAVED SUCCESSFULLY !"
      />
    </section>
  );
}
