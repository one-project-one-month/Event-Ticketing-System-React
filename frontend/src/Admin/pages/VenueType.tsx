import { useEffect, useState } from "react";
import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import VenueTypeList from "@/Admin/components/pages/venuetype/VenueTypeList.tsx";
import VenuePagination from "@/Admin/components/pages/venuetype/VenuePagination.tsx";
import { getVenueTypes } from "@/services/VenueTypeService.ts";
import type { VenueTypeData } from "@/Admin/DataTypes/VenueType.ts";

const VenueType = () => {
  const [venueTypes, setVenueTypes] = useState<VenueTypeData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchVenueTypes = async () => {
      const res = await getVenueTypes();
      if (res.isSuccess && Array.isArray(res.data?.venueTypeList)) {
        setVenueTypes(res.data.venueTypeList);
      } else {
        console.error("Failed to fetch venue types:", res.message);
      }
    };

    fetchVenueTypes();
  }, []);

  const filteredVenueTypes = venueTypes.filter((type) =>
    type.venueTypename.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentVenueTypes = filteredVenueTypes.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <section className="figtreef mx-10">
      {/* Search Bar */}
      <ToolBar
        addNewPath={`/admin/venue-type/create`}
        onExport={() => {}}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
      />

      {/* List */}
      <VenueTypeList
        venueTypes={currentVenueTypes}
        additionalNumber={indexOfFirstItem}
      />

      {/* Pagination */}
      <VenuePagination
        totalItems={filteredVenueTypes.length}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={(page) => setCurrentPage(page)}
        onItemsPerPageChange={(count) => {
          setItemsPerPage(count);
          setCurrentPage(1);
        }}
      />
    </section>
  );
};

export default VenueType;
