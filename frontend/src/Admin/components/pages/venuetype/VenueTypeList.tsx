import type { IVenueType, IVenueTypeUI } from "@/Admin/DataTypes/DataTypes.ts";
import { useState } from "react";
import AdminDeleteDialog from "@/Admin/components/Layouts/AdminDeleteDialog.tsx";

export default function VenueTypeList({
  venueTypes,
}: {
  venueTypes: IVenueType[];
}) {
  return (
    <section className="mt-5">
      <h1 className="text-3xl font-semibold text-[#103263]">Venue Type List</h1>

      <div className="my-5 flex h-[33rem] w-full flex-col overflow-hidden rounded-md bg-[#F8F8FF]">
        {/* Header Row */}
        <div className="flex h-16 items-center bg-[#615CB8] px-6 text-lg font-semibold text-gray-300">
          <div className="w-[10%] pl-14">No</div>
          <div className="w-[42.5%]">Venue Type Name</div>
          <div className="w-[32%]">Create Date</div>
          <div className="w-[10%] text-right">Action</div>
        </div>

        {/* Data Rows */}
        <div className={`hide-scrollbar h-[29rem] overflow-y-scroll`}>
          {venueTypes.map((venueType, index) => (
            <VenueTypeRow
              CreatedAt={venueType.CreatedAt}
              VenueTypeCode={venueType.VenueTypeCode}
              VenueTypename={venueType.VenueTypename}
              index={index + 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueTypeRow({
  index,
  VenueTypeCode,
  VenueTypename,
  CreatedAt,
}: IVenueTypeUI) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    console.log("Deleted!");
    setShowDelete(false);
  };
  return (
    <div className="mb-2 flex items-center bg-white px-6 py-4 text-[#333]">
      <div className="w-[10%] pl-14">{index}</div>
      <div className="w-[43%]">{VenueTypename}</div>
      <div className="w-[32%]">{CreatedAt}</div>
      <div className="flex w-[12%] items-center justify-end gap-2">
        <a href={`/admin/venue-type/${VenueTypeCode}`}>
          <img
            src="/icons/Eye.svg"
            alt="View Data"
            className="cursor-pointer"
          />
        </a>
        <a href={`/admin/venue-type/${VenueTypeCode}/edit`}>
          <img
            src="/icons/Edit.svg"
            alt="Edit Data"
            className="cursor-pointer"
          />
        </a>
        <img
          src="/icons/Delete.svg"
          alt="Delete Data"
          className="cursor-pointer"
          onClick={() => setShowDelete(true)}
        />
      </div>
      <AdminDeleteDialog
        open={showDelete}
        onCancel={() => setShowDelete(false)}
        onConfirm={handleDelete}
      />
    </div>
  );
}
