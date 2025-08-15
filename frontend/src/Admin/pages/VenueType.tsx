import { useEffect, useState } from "react";
import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import VenueTypeList from "@/Admin/components/pages/venuetype/VenueTypeList.tsx";
import VenuePagination from "@/Admin/components/pages/venuetype/VenuePagination.tsx";
import { getVenueTypes } from "@/services/VenueTypeService.ts";
import type { VenueTypeData } from "@/Admin/DataTypes/VenueType.ts";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils";

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

  const handleExport = (format: string) => {
    if (filteredVenueTypes.length === 0) return alert("No data to export.");

    const exportData = filteredVenueTypes.map((e) => ({
      "Venue Type Code": e.venueTypeCode,
      "Venue Type Name": e.venueTypename,
      "Created Date": e.createdAt || "Created Date is not provided!",
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "venueType.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "venueType.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "venueType.pdf");
        break;
    }
  };

  return (
    <section className="figtreef mx-10">
      {/* Search Bar */}
      <ToolBar
        addNewPath={`/admin/venue-type/create`}
        onExport={handleExport}
        onSearch={(term) => {
          setSearchTerm(term);
          setCurrentPage(1);
        }}
      />

      {/* List */}
      <VenueTypeList
        venueTypes={currentVenueTypes}
        additionalNumber={indexOfFirstItem}
        onDeleteSuccess={async () => {
          // Refetch venue types
          const res = await getVenueTypes();
          if (res.isSuccess && Array.isArray(res.data?.venueTypeList)) {
            setVenueTypes(res.data.venueTypeList);
          } else {
            console.error("Failed to fetch venue types:", res.message);
          }
        }}
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
