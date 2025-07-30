import { Button } from "@/User/components/ui/button";
import Toolbar from "@/Admin/components/ui/ToolBar";
import { useNavigate } from "react-router-dom";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { Pagination } from "@/Admin/components/ui/Pagination";
import { exportToCSV, exportToExcel, exportToPDF } from "@/Admin/utils/exportUtils";
import { useEffect, useState } from "react";

type EventItem = typeof eventListDemoData[number];

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
    const confirmed = window.confirm("Are you sure you want to delete this event?");
    if (confirmed) {
      const updated = data.filter((e) => e.EventUniqueName !== eventUniqueName);
      setData(updated);
    }
  };

  const filteredEvents = data.filter(
    (event) =>
      event.EventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.EventUniqueName.toLowerCase().includes(searchTerm.toLowerCase())
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
    <div className="px-[15px] py-[10px] flex justify-center">
      <div className="w-full max-w-[1057px] flex flex-col gap-[20px]">
        <Toolbar
          onSearch={(val) => setSearchTerm(val)}
          onExport={handleExport}
          addNewPath="/admin/eventlist/create"
        />

        <h2 className="text-[30px] font-semibold text-[#43319A] gap-[48px]">Event List</h2>
        <div className="overflow-auto rounded-[20px] border border-gray-200">
          <table className="min-w-full divide-y divide-[#67648D]">
            <thead className="bg-[#615CB8] padding-[20px]">
              <tr>
                {["No", "Event Name", "Event Unique Name", "Business Owner Name", "Active", "Actions"].map((heading) => (
                  <th
                    key={heading}
                    className="py-[20px] text-center text-lg font-medium text-white/80 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {currentEvents.map((event, index) => (
                <tr key={event.EventUniqueName} className="hover:bg-gray-50">
                  <td className="px-[20px] py-[10px] text-center whitespace-nowrap text-lg">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace-nowrap font-medium text-lg">
                    {event.EventName}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace text-lg">
                    {event.EventUniqueName}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace text-lg">
                    {event.BusinessOwnerName}
                  </td>
                  <td className="px-[10px] py-[10px] whitespace text-center">
                    <span
                      className={`px-[10px] py-[4px] rounded-[20px] min-w-[100px] inline-block text-center text-lg ${
                        event.IsActive ? "bg-[#58B651] text-[#030812]" : "bg-[#D6D6D6] text-[#030812]"
                      }`}
                    >
                      {event.IsActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-[10px] py-[10px] whitespace-nowrap flex justify-center items-center gap-[6px]">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/admin/eventlist/${event.EventUniqueName}`)}
                    >
                      <img src="/icons/Eye.svg" alt="view" className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/admin/eventlist/${event.EventUniqueName}/edit`)}
                    >
                      <img src="/icons/Edit.svg" alt="edit" className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(event.EventUniqueName)}
                    >
                      <img src="/icons/Delete.svg" alt="delete" className="w-4 h-4" />
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
