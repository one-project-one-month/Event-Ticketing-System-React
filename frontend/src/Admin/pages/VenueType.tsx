import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import VenueTypeList from "@/Admin/components/pages/venuetype/VenueTypeList.tsx";
import type { IVenueType } from "@/Admin/DataTypes/DataTypes.ts";
import VenuePagination from "@/Admin/components/pages/venuetype/VenuePagination.tsx";

const VenueType = () => {
  const venueTypes: IVenueType[] = [
    {
      VenueTypeCode: "V001",
      VenueTypename: "Sapphire Ball Room",
      CreatedAt: "2025-07-20",
    },
    {
      VenueTypeCode: "V002",
      VenueTypename: "Emerald Garden",
      CreatedAt: "2025-07-21",
    },
    {
      VenueTypeCode: "V003",
      VenueTypename: "Golden Hall",
      CreatedAt: "2025-07-22",
    },
  ];
  return (
    <section className={`mx-10`}>
      {/* Search Bar */}
      <ToolBar
        addNewPath={`/admin/venue-type/create`}
        onExport={() => {}}
        onSearch={() => {}}
      />
      {/* List */}
      <VenueTypeList venueTypes={venueTypes} />
      {/* Pagination */}
      <VenuePagination totalItems={venueTypes.length} />
    </section>
  );
};

export default VenueType;
