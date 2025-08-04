import type { IVenueModel } from "@/Admin/DataTypes/DataTypes";
import { useState } from "react";
import AdminDeleteDialog from "@/Admin/components/Layouts/AdminDeleteDialog";

export default function VenueDataList({ venues }: { venues: IVenueModel[] }) {
  return (
    <section className="mt-5">
      <h1 className="text-3xl font-semibold text-[#103263]">Venue List</h1>

      <div className="my-5 flex h-[33rem] w-full flex-col overflow-hidden rounded-md bg-[#F8F8FF]">
        {/* Header Row */}
        <div className="flex h-16 items-center bg-[#615CB8] px-6 text-lg font-semibold text-gray-300">
          <div className="w-[10%] pl-14">No</div>
          <div className="w-[35%]">Venue Name</div>
          <div className="w-[24%]">Venue Type Code</div>
          <div className="w-[15%]">Capacity</div>
          <div className="w-[10%] text-right">Action</div>
        </div>

        {/* Data Rows */}
        <div className="hide-scrollbar h-[29rem] overflow-y-scroll">
          {venues.map((venue, index) => (
            <VenueRow key={venue.VenueCode} index={index + 1} {...venue} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueRow({
  index,
  VenueCode,
  VenueName,
  VenueTypeCode,
  Capacity,
}: IVenueModel & { index: number }) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = () => {
    console.log("Deleted!", VenueCode);
    setShowDelete(false);
  };

  return (
    <div className="mb-2 flex items-center bg-white px-6 py-4 text-[#333]">
      <div className="w-[10%] pl-14">{index}</div>
      <div className="w-[35%]">{VenueName}</div>
      <div className="w-[25%]">{VenueTypeCode}</div>
      <div className="w-[15%]">{Capacity ?? "N/A"}</div>
      <div className="flex w-[11%] items-center justify-end gap-2">
        <a href={`/admin/venue/${VenueCode}`}>
          <img
            src="/icons/Eye.svg"
            alt="View Data"
            className="cursor-pointer"
          />
        </a>
        <a href={`/admin/venue/${VenueCode}/edit`}>
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
