import { Button } from "@/User/components/ui/button";
import Toolbar from "@/Admin/components/ui/ToolBar";
import { useNavigate } from "react-router-dom";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { Pagination } from "@/Admin/components/ui/Pagination";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils";
import { useEffect, useState } from "react";

type EventItem = (typeof eventListDemoData)[number];

const EventList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<EventItem[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    setData(eventListDemoData);
  }, []);

  const handleDelete = (eventUniqueName: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this event?",
    );
    if (confirmed) {
      const updated = data.filter((e) => e.EventUniqueName !== eventUniqueName);
      setData(updated);
    }
  };

  const filteredEvents = data.filter(
    (event) =>
      event.EventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.EventUniqueName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (format: string) => {
    if (filteredEvents.length === 0) return alert("No data to export.");

    const exportData = filteredEvents.map((e) => ({
      "Event Name": e.EventName,
      "Event Unique Name": e.EventUniqueName,
      "Business Owner Name": e.BusinessOwnerName,
      "Is Active": e.IsActive ? "Active" : "Inactive",
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "events.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "events.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "events.pdf");
        break;
      default:
        break;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex justify-center px-[15px] py-[10px]">
      <div className="flex w-full max-w-[1057px] flex-col gap-[20px]">
        <Toolbar
          onSearch={(val) => setSearchTerm(val)}
          onExport={handleExport}
          addNewPath="/admin/event/list/create"
        />

        <h2 className="gap-[48px] text-[30px] font-semibold text-[#43319A] dark:text-white">
          Event List
        </h2>
        <div className="overflow-auto rounded-[20px] border border-gray-200 dark:bg-[#1E293B]">
          <table className="min-w-full divide-y divide-[#67648D]">
            <thead className="padding-[20px] bg-[#615CB8] dark:bg-[#0F172A]">
              <tr>
                {[
                  "No",
                  "Event Name",
                  "Event Unique Name",
                  "Business Owner Name",
                  "Active",
                  "Actions",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="py-[20px] text-center text-lg font-medium text-white/80 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white dark:bg-[#1E293B]">
              {currentEvents.map((event, index) => (
                <tr
                  key={event.EventCode}
                  className="hover:dark:bg-gray-50"
                >
                  <td className="px-[20px] py-[10px] text-center text-lg whitespace-nowrap">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {event.EventName}
                  </td>
                  <td className="whitespace px-[10px] py-[10px] text-center text-lg">
                    {event.EventUniqueName}
                  </td>
                  <td className="whitespace px-[10px] py-[10px] text-center text-lg">
                    {event.BusinessOwnerName}
                  </td>
                  <td className="whitespace px-[10px] py-[10px] text-center">
                    <span
                      className={`inline-block min-w-[100px] rounded-[20px] px-[10px] py-[4px] text-center text-lg ${
                        event.IsActive
                          ? "bg-[#58B651] text-[#030812]"
                          : "bg-[#D6D6D6] text-[#030812]"
                      }`}
                    >
                      {event.IsActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="flex items-center justify-center gap-[6px] px-[10px] py-[10px] whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigate(`/admin/event/list/${event.EventUniqueName}`)
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
                          `/admin/event/list/${event.EventUniqueName}/edit`,
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
                      onClick={() => handleDelete(event.EventUniqueName)}
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

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalItems={filteredEvents.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(count) => {
            setItemsPerPage(count);
            setCurrentPage(1);
          }}
        />
      </div>
    </div>
  );
};

export default EventList;
