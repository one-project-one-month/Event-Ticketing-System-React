import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import AdminInputLabel from "@/Admin/components/Layouts/AdminInputLabel.tsx";
import { useState } from "react";

export default function CreateVenueTypePage() {
  const [venueTypeName, setVenueTypeName] = useState("");
  return (
    <section
      className={`relative h-[45rem] w-[65rem] rounded-md bg-white px-20 py-14`}
    >
      {/* Title */}
      <div className={`flex flex-col justify-start gap-3`}>
        <AdminTitle>Venue Type Information</AdminTitle>
        <p className={`text-[#43319A]`}>
          Please fill in all required fields to create a new admin account.
        </p>
      </div>
      {/*  Form */}
      <div className={`mt-8`}>
        <AdminInputLabel
          label={`Venue Type Name`}
          value={venueTypeName}
          name={`venueTypeName`}
          type={`text`}
          onChange={(v) => setVenueTypeName(v)}
          placeholder={"Enter Venue Name"}
          required={true}
        />
      </div>
      {/*  Buttons */}
      <div className={`absolute right-20 bottom-14 flex flex-row gap-6`}>
        <button
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#D8DFEC] text-[#615CB8] hover:text-purple-300`}
        >
          Cancel
        </button>
        <button
          className={`h-12 w-32 cursor-pointer rounded-md bg-[#FC9B51] text-white hover:text-purple-300`}
        >
          Save
        </button>
      </div>
    </section>
  );
}
