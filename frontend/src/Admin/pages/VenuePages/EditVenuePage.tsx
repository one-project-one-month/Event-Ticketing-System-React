import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useState } from "react";
import AddonsInputGroup from "@/Admin/components/pages/venue/AddonInputGroup.tsx";
import VenueImageUpload from "@/Admin/components/pages/venue/VenueImageUpload.tsx";
import AdminActionDialog from "@/Admin/components/Layouts/AdminActionDialog.tsx";

export default function EditVenuePage() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [venueCode, setVenueCode] = useState("VN001");
  const [venueName, setVenueName] = useState("Ocean View Hall");
  const [venueTypeCode, setVenueTypeCode] = useState("TYPE01");
  const [capacity, setCapacity] = useState<number | "">(200);
  const [address, setAddress] = useState("123 Bay Street, Yangon");
  const [description, setDescription] = useState(
    "Spacious hall with sea view.",
  );
  const [isOpen, setIsOpen] = useState(false);
  const [facilities, setFacilities] = useState("Wi-Fi, Projector, Parking");
  const [addons, setAddons] = useState<string[]>(["Catering", "Decoration"]);

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
          label="Venue Name"
          value={venueName}
          name="venueName"
          type="text"
          onChange={(v) => setVenueName(v)}
          placeholder="Enter Venue Name"
          readonly
          disabled
        />

        <AdminInputLabel
          label="Venue Type Code"
          value={venueTypeCode}
          name="venueTypeCode"
          type="text"
          onChange={(v) => setVenueTypeCode(v)}
          placeholder="Enter Type Code"
          readonly
          disabled
        />

        <AdminInputLabel
          label="Capacity"
          value={capacity}
          name="capacity"
          type="number"
          onChange={(v) => setCapacity(Number(v))}
          placeholder="Enter Capacity"
          readonly
          disabled
        />

        <AdminInputLabel
          label="Address"
          value={address}
          name="address"
          type="textarea"
          onChange={(v) => setAddress(v)}
          placeholder="Enter Address"
          readonly
        />

        <AdminInputLabel
          label="Description"
          value={description}
          name="description"
          type="textarea"
          onChange={(v) => setDescription(v)}
          placeholder="Enter Description"
          readonly
        />

        <AdminInputLabel
          label="Facilities"
          value={facilities}
          name="facilities"
          type="textarea"
          onChange={(v) => setFacilities(v)}
          placeholder="Enter Facilities"
          readonly
        />

        <AddonsInputGroup
          selectedAddons={addons}
          onChange={setAddons}
          readonly
        />

        <VenueImageUpload />
      </div>

      {/* Action Buttons */}
      <div className={`h-20 w-full`}></div>
      <div className="absolute right-20 bottom-14 flex flex-row gap-6">
        <button
          onClick={() => window.history.back()}
          className="h-12 w-32 rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300"
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
        text="UPDATED SUCCESSFULLY !"
      />
    </section>
  );
}
