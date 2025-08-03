import Toolbar from "@/Admin/components/ui/ToolBar";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/Admin/components/ui/Pagination";
import { exportToCSV, exportToExcel, exportToPDF } from "@/Admin/utils/exportUtils";
import { useEffect, useState } from "react";
import { TicketTypeDemoData } from "@/Admin/data/TicketTypeDemoData";
import { Button } from "@/User/components/ui/button";

type TicketTypeItem = typeof TicketTypeDemoData[number];

const TicketType = () => {
  
      const [searchTerm, setSearchTerm] = useState("");
      const [data, setData] = useState<TicketTypeItem[]>([]);
      const navigate = useNavigate();
      const [currentPage, setCurrentPage] = useState(1);
      const [itemsPerPage, setItemsPerPage] = useState(10);
  
      useEffect(() => {
          setData(TicketTypeDemoData);
        }, []);
  
      const handleDelete = (eventUniqueName: string) => {
      const confirmed = window.confirm("Are you sure you want to delete this event?");
      if (confirmed) {
        const updated = data.filter((e) => e.TicketTypeCode !== eventUniqueName);
        setData(updated);
      }
    };
  
    const filteredEventTypes = data.filter(
      (event) =>
        event.TicketTypeName.toLowerCase().includes(searchTerm.toLowerCase()) 
    );
  
    const handleExport = (format: string) => {
      if (filteredEventTypes.length === 0) return alert("No data to export.");
  
      const exportData = filteredEventTypes.map((e) => ({
        "Event Unique Name": e.TicketTypeCode,
        "Event Type Name": e.TicketTypeName,
        "Price": e.TicketPrice,
        "Event Name": e.EventName,
      }));
  
      switch (format) {
        case "csv":
          exportToCSV(exportData, "ticketType.csv");
          break;
        case "xlsx":
          exportToExcel(exportData, "ticketType.xlsx");
          break;
        case "pdf":
          exportToPDF(exportData, "ticketType.pdf");
          break;
        default:
          break;
      }
    };
  
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTicketType = filteredEventTypes.slice(indexOfFirstItem, indexOfLastItem);
  return (
    <div className="px-[15px] py-[10px] flex justify-center">
        <div className="w-full max-w-[1057px] flex flex-col gap-[20px]">
            <Toolbar
          onSearch={(val) => setSearchTerm(val)}
          onExport={handleExport}
          addNewPath="/admin/ticket-type/create"
        />

        <h2 className="text-[30px] font-semibold text-[#43319A] gap-[48px]">Ticket Type</h2>
        <div className="overflow-auto rounded-[20px] border border-gray-200">
            <table className="min-w-full divide-y divide-[#67648D]">
                <thead className="bg-[#615CB8] padding-[20px]">
                    <tr>
                      {["No", "Ticket Type Name", "Price", "Event Name", "Actions"].map((heading) => (
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
                      {currentTicketType.map((event, index) => (
                <tr key={event.TicketTypeCode} className="hover:bg-gray-50">
                  <td className="px-[20px] py-[10px] text-center whitespace-nowrap text-lg">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace-nowrap font-medium text-lg">
                    {event.TicketTypeName}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace-nowrap font-medium text-lg">
                    {event.EventName}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace-nowrap font-medium text-lg">
                    {event.TicketPrice}
                  </td>
                  <td className="px-[10px] py-[10px] whitespace-nowrap flex justify-center items-center gap-[6px]">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/admin/ticket-type/${event.TicketTypeCode}`)}
                    >
                      <img src="/icons/Eye.svg" alt="view" className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => navigate(`/admin/ticket-type/${event.TicketTypeCode}/edit`)}
                    >
                      <img src="/icons/Edit.svg" alt="edit" className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() => handleDelete(event.TicketTypeCode)}
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
          totalItems={filteredEventTypes.length}
          itemsPerPage={itemsPerPage}
          onPageChange={(page) => setCurrentPage(page)}
          onItemsPerPageChange={(count) => {
            setItemsPerPage(count);
            setCurrentPage(1);
          }}
        />
        </div>
    </div>
  )
}

export default TicketType