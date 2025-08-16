import { useState } from "react";
import AdminDeleteDialog from "@/Admin/components/Layouts/AdminDeleteDialog";
import type { VenueData } from "@/Admin/DataTypes/VenueDataTypes.ts";
import { deleteVenue } from "@/services/VenueService.ts";

export default function VenueDataList({
  venues,
  additionalNumber,
  onVenueDeleted,
}: {
  venues: VenueData[];
  additionalNumber?: number;
  onVenueDeleted: () => void;
}) {
  return (
    <section className="mt-5">
      <h1 className="text-3xl font-semibold text-[#103263]">Venue List</h1>

      <div className="my-5 flex h-[33rem] w-full flex-col overflow-hidden rounded-md bg-[#F8F8FF]">
        <div className="flex h-16 items-center bg-[#615CB8] px-6 text-lg font-semibold text-gray-300">
          <div className="w-[10%] pl-14">No</div>
          <div className="w-[35%]">Venue Name</div>
          <div className="w-[24%]">Venue Type Code</div>
          <div className="w-[15%]">Capacity</div>
          <div className="w-[10%] text-right">Action</div>
        </div>

        <div className="hide-scrollbar h-[29rem] overflow-y-scroll">
          {venues.map((venue, index) => (
            <VenueRow
              key={venue.venueCode}
              index={(additionalNumber ?? 0) + index + 1}
              {...venue}
              onDeleted={onVenueDeleted}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueRow({
  index,
  venueCode,
  venueName,
  venueTypeCode,
  capacity,
  onDeleted,
}: VenueData & { index: number; onDeleted: () => void }) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteVenue(venueCode);
      if (res.isSuccess) {
        onDeleted();
      } else {
        alert(res.message || "Failed to delete venue");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Error deleting venue");
    } finally {
      setShowDelete(false);
    }
  };

  return (
    <div className="mb-2 flex items-center bg-white px-6 py-4 text-[#333]">
      <div className="w-[10%] pl-14">{index}</div>
      <div className="w-[35%]">{venueName}</div>
      <div className="w-[25%]">{venueTypeCode}</div>
      <div className="w-[15%]">{capacity ?? "N/A"}</div>
      <div className="flex w-[11%] items-center justify-end gap-2">
        <a href={`/admin/venue/${venueCode}`}>
          <img
            src="/icons/Eye.svg"
            alt="View Data"
            className="cursor-pointer"
          />
        </a>
        <a href={`/admin/venue/${venueCode}/edit`}>
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
