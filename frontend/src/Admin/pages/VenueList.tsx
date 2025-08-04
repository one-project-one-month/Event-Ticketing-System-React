import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import VenuePagination from "@/Admin/components/pages/venuetype/VenuePagination.tsx";
import type { IVenueModel } from "@/Admin/DataTypes/DataTypes.ts";
import VenueDataList from "@/Admin/components/pages/venue/VenueDataList.tsx";

const VenueList = () => {
  const sampleVenues: IVenueModel[] = [
    {
      VenueCode: "VEN001",
      VenueTypeCode: "TYPE01",
      VenueName: "Grand Ballroom",
      Capacity: 500,
    },
    {
      VenueCode: "VEN002",
      VenueTypeCode: "TYPE02",
      VenueName: "Sunset Rooftop",
      Capacity: 120,
    },
    {
      VenueCode: "VEN003",
      VenueTypeCode: "TYPE01",
      VenueName: "Ocean View Hall",
      Capacity: 300,
    },
    {
      VenueCode: "VEN004",
      VenueTypeCode: "TYPE03",
      VenueName: "Conference Room A",
      Capacity: 80,
    },
  ];

  return (
    <section className={`figtreef mx-10`}>
      {/* Search Bar */}
      <ToolBar
        addNewPath={`/admin/venue-type/create`}
        onExport={() => {}}
        onSearch={() => {}}
      />
      {/*  List */}
      <VenueDataList venues={sampleVenues} />
      {/*  Pagination */}
      <VenuePagination totalItems={sampleVenues.length} />
    </section>
  );
};

export default VenueList;
