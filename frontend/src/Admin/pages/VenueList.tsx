import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import VenuePagination from "@/Admin/components/pages/venuetype/VenuePagination.tsx";
import VenueDataList from "@/Admin/components/pages/venue/VenueDataList.tsx";
import { useEffect, useState } from "react";
import { getVenues } from "@/services/VenueService.ts";
import type { VenueData } from "@/Admin/DataTypes/VenueDataTypes.ts";

const VenueList = () => {
  const [venues, setVenues] = useState<VenueData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchVenues = async () => {
    const res = await getVenues();
    if (res.isSuccess && Array.isArray(res.data?.venueList)) {
      setVenues(res.data.venueList);
    } else {
      console.error("Failed to fetch venues:", res.message);
    }
  };

  useEffect(() => {
    fetchVenues();
  }, []);

  const filteredVenues = venues.filter((venue) =>
    venue.venueName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVenues = filteredVenues.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <section className={`figtreef mx-10`}>
      {/* Search Bar */}
      <ToolBar
        addNewPath={`/admin/venue/create`}
        onExport={() => {}}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
      />

      {/*  List */}
      <VenueDataList
        venues={currentVenues}
        additionalNumber={indexOfFirstItem}
        onVenueDeleted={fetchVenues}
      />

      {/*  Pagination */}
      <VenuePagination
        totalItems={filteredVenues.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1); // reset to page 1
        }}
      />
    </section>
  );
};

export default VenueList;
