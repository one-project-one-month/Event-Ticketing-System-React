import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Toolbar from "@/Admin/components/ui/ToolBar";
import { Pagination } from "@/Admin/components/ui/Pagination";
import { Button } from "@/User/components/ui/button";
import { getEventTypes } from "@/services/EventTypeServices";
import { deleteEventType } from "@/services/EventTypeServices";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils";
import type { EventTypeData } from "@/Admin/DataTypes/EventTypes";

const EventType = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<EventTypeData[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const res = await getEventTypes();

      if (res.isSuccess && Array.isArray(res.data?.eventCategories)) {
        console.log("Event Type :", res);
        setData(res.data.eventCategories);
      } else {
        console.error("Failed to fetch Event Types:", res.message);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (eventCategorycode: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event category?",
    );
    if (!confirmed) return;

    try {
      const res = await deleteEventType(eventCategorycode);
      if (res.isSuccess) {
        setData((prev) =>
          prev.filter((e) => e.eventCategorycode !== eventCategorycode),
        );
      } else {
        alert(res.message || "Failed to delete event category.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("An error occurred while deleting. Please try again.");
    }
  };

  const filteredEventTypes = data.filter((event) =>
    event.categoryname.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (format: string) => {
    if (filteredEventTypes.length === 0) return alert("No data to export.");

    const exportData = filteredEventTypes.map((e) => ({
      "Event Category ID": e.eventCategoryid,
      "Event Category Code": e.eventCategorycode,
      "Category Name": e.categoryname,
      "Created Date": new Date(e.createdat).toLocaleDateString(),
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "eventType.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "eventType.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "eventType.pdf");
        break;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEventType = filteredEventTypes.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );

  return (
    <div className="flex justify-center px-[15px] py-[10px]">
      <div className="figtreef mx-10 flex w-full flex-col gap-[20px]">
        <Toolbar
          onSearch={(val) => setSearchTerm(val)}
          onExport={handleExport}
          addNewPath="/admin/event/type/create"
        />

        <h2 className="text-[30px] font-semibold text-[#43319A] dark:text-white">
          Event Type
        </h2>

        <div className="overflow-auto rounded-[20px] border border-gray-200 dark:bg-[#1E293B]">
          <table className="min-w-full divide-y divide-[#67648D]">
            <thead className="dark:[#0F172A] bg-[#615CB8] dark:bg-[#0F172A]">
              <tr>
                {["No", "Category Name", "Created Date", "Actions"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="py-[20px] text-center text-lg font-medium text-white/80 uppercase"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white dark:bg-[#1E293B]">
              {currentEventType.map((event, index) => (
                <tr key={event.eventCategoryid} className="hover:bg-gray-50">
                  <td className="px-[20px] py-[10px] text-center text-lg whitespace-nowrap">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {event.categoryname}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {event.createdat}
                  </td>
                  <td className="flex items-center justify-center gap-[6px] px-[10px] py-[10px] whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigate(`/admin/event/type/${event.eventCategorycode}`)
                      }
                    >
                      <img
                        src="/icons/Eye.svg"
                        alt="view"
                        className="h-4 w-4"
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigate(
                          `/admin/event/type/${event.eventCategorycode}/edit`,
                        )
                      }
                    >
                      <img
                        src="/icons/Edit.svg"
                        alt="edit"
                        className="h-4 w-4"
                      />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(event.eventCategorycode)}
                    >
                      <img
                        src="/icons/Delete.svg"
                        alt="delete"
                        className="h-4 w-4"
                      />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          currentPage={currentPage}
          totalItems={filteredEventTypes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={(count) => {
            setItemsPerPage(count);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default EventType;
