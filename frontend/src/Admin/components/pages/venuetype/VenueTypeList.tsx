import type { IVenueTypeUI } from "@/Admin/DataTypes/DataTypes.ts";
import { useState } from "react";
import AdminDeleteDialog from "@/Admin/components/Layouts/AdminDeleteDialog.tsx";
import type { VenueTypeData } from "@/Admin/DataTypes/VenueType.ts";
import { deleteVenueType } from "@/services/VenueTypeService.ts";

export default function VenueTypeList({
  venueTypes,
  additionalNumber = 0,
  onDeleteSuccess,
}: {
  venueTypes: VenueTypeData[];
  additionalNumber?: number;
  onDeleteSuccess?: (deletedCode: string) => void;
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
              key={venueType.venueTypeCode}
              createdAt={venueType.createdAt}
              venueTypeCode={venueType.venueTypeCode}
              venueTypename={venueType.venueTypename}
              index={additionalNumber + index + 1}
              onDeleteSuccess={onDeleteSuccess}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function VenueTypeRow({
  index,
  venueTypeCode,
  venueTypename,
  createdAt,
  onDeleteSuccess,
}: IVenueTypeUI & { onDeleteSuccess?: (deletedCode: string) => void }) {
  const [showDelete, setShowDelete] = useState(false);

  const handleDelete = async () => {
    try {
      const res = await deleteVenueType(venueTypeCode);
      if (res.isSuccess) {
        if (onDeleteSuccess) onDeleteSuccess(venueTypeCode);
      } else {
        alert(res.message || "Failed to delete venue type.");
      }
    } catch (err) {
      console.error("Delete failed:", err);
      alert("An error occurred while deleting. Please try again.");
    } finally {
      setShowDelete(false);
    }
  };

  return (
    <div className="mb-2 flex items-center bg-white px-6 py-4 text-[#333]">
      <div className="w-[10%] pl-14">{index}</div>
      <div className="w-[43%]">{venueTypename}</div>
      <div className="w-[32%]">{createdAt}</div>
      <div className="flex w-[12%] items-center justify-end gap-2">
        <a href={`/admin/venue-type/${venueTypeCode}`}>
          <img
            src="/icons/Eye.svg"
            alt="View Data"
            className="cursor-pointer"
          />
        </a>
        <a href={`/admin/venue-type/${venueTypeCode}/edit`}>
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
