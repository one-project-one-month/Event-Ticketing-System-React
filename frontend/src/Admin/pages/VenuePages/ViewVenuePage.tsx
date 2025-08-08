import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useState } from "react";
import AddonsInputGroup from "@/Admin/components/pages/venue/AddonInputGroup.tsx";
import VenueImageUpload from "@/Admin/components/pages/venue/VenueImageUpload.tsx";

export default function ViewVenuePage() {
  const [venueCode, setVenueCode] = useState("VN001");
  const [venueName, setVenueName] = useState("Ocean View Hall");
  const [venueTypeCode, setVenueTypeCode] = useState("TYPE01");
  const [capacity, setCapacity] = useState<number | "">(200);
  const [address, setAddress] = useState("123 Bay Street, Yangon");
  const [description, setDescription] = useState(
    "Spacious hall with sea view.",
  );
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
          label="Venue Code"
          value={venueCode}
          name="venueCode"
          type="text"
          onChange={(v) => setVenueCode(v)}
          placeholder="Enter Venue Code"
          readonly
        />

        <AdminInputLabel
          label="Venue Name"
          value={venueName}
          name="venueName"
          type="text"
          onChange={(v) => setVenueName(v)}
          placeholder="Enter Venue Name"
          readonly
        />

        <AdminInputLabel
          label="Venue Type Code"
          value={venueTypeCode}
          name="venueTypeCode"
          type="text"
          onChange={(v) => setVenueTypeCode(v)}
          placeholder="Enter Type Code"
          readonly
        />

        <AdminInputLabel
          label="Capacity"
          value={capacity}
          name="capacity"
          type="number"
          onChange={(v) => setCapacity(Number(v))}
          placeholder="Enter Capacity"
          readonly
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

        <AddonsInputGroup
          selectedAddons={addons}
          onChange={setAddons}
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

        <VenueImageUpload />
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
