import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useState } from "react";
import type { IVenueType } from "@/Admin/DataTypes/DataTypes.ts";

export default function ViewVenueTypePage() {
  const [venue, setVenue] = useState<IVenueType>({
    VenueTypeCode: "V001",
    VenueTypename: "Sapphire Ball Room",
    CreatedAt: "2025-07-20",
  });

  return (
    <section
      className={`relative mt-10 ml-12 h-[45rem] w-[65rem] rounded-md bg-white px-20 py-14`}
    >
      {/* Title */}
      <div className={`flex flex-col justify-start gap-3`}>
        <AdminTitle>Venue Type Information</AdminTitle>
      </div>
      {/*  Form */}
      <div className={`mt-8 flex flex-row justify-between`}>
        <AdminInputLabel
          label={`Venue Type Code`}
          value={venue.VenueTypeCode}
          name={`venueTypeName`}
          type={`text`}
          onChange={() => {}}
          placeholder={"Enter Venue Name"}
          required={true}
        />
        <AdminInputLabel
          label={`Venue Type Name`}
          value={venue.VenueTypename}
          name={`venueTypeName`}
          type={`text`}
          onChange={() => {}}
          placeholder={"Enter Venue Name"}
          required={true}
        />
      </div>
      {/*  Buttons */}
      <div className={`absolute right-20 bottom-14 flex flex-row gap-6`}>
        <button
          onClick={() => {
            window.history.back();
          }}
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300`}
        >
          Back
        </button>
      </div>
    </section>
  );
}
