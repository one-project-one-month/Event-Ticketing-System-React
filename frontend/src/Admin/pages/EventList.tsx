import { useEffect, useState } from "react";
import { Button } from "@/User/components/ui/button";
import { Input } from "@/User/components/ui/input";
import { useNavigate } from "react-router-dom";
import { eventListDemoData } from "@/Admin/data/eventListDemoData";
import { Eye, Pencil, Trash2 } from "lucide-react";
import { Pagination } from "@/Admin/components/ui/Pagination"; 
import { Search } from "lucide-react";



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

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentEvents = filteredEvents.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="px-[15px] py-[10px] flex justify-center">
      <div className="w-full max-w-[1057px] flex flex-col gap-[20px]">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="relative w-[500px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-[52px] w-full text-base pl-10 pr-4" 
            />
          </div>
          <div className="flex gap-[20px]">
            <Button className="bg-[#615CB8] text-white h-[52px] px-6 text-base rounded-lg" variant="outline">
              Export
            </Button>
            <Button
              className="bg-[#FC9B51] text-white h-[52px] px-6 text-base rounded-lg"
              onClick={() => navigate("/admin/eventlist/create")}
            >
              + Add New
            </Button>
          </div>
        </div>
        
        <h2 className="text-[30px] font-semibold text-[#43319A] gap-[48px]">Event List</h2>

        {/* Table */}
        <div className="overflow-auto rounded-[20px] border border-gray-200">
          <table className="min-w-full divide-y divide-[#67648D]">
            <thead className="bg-[#615CB8] padding-[20px]">
              <tr>
                {["No", "Event Name", "Event Unique Name", "Business Owner Name", "Active", "Actions"].map((heading) => (
                  <th
                    key={heading}
                    className=" py-[20px] text-center text-lg font-medium text-white/80 uppercase"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white">
              {currentEvents.map((event, index) => (
                <tr key={event.EventUniqueName} className="hover:bg-gray-50 gap-[10px]">
                  <td className="px-[20px] py-[10px] text-center whitespace-nowrap text-lg">{indexOfFirstItem + index + 1}</td>
                  <td className="px-[10px] py-[10px] text-center whitespace-nowrap font-medium text-lg">
                    {event.EventName}
                  </td>
                  <td className="px-[10px] py-[10px] text-center whitespace text-lg">{event.EventUniqueName}</td>
                  <td className="px-[10px] py-[10px] text-center whitespace text-lg">{event.BussinessOwnerName}</td>
                  <td className="px-[10px] py-[10px] whitespace">
                    <span
                      className={`px-[10px] py-[4px] rounded-[20px] text-lg ${
                        event.IsActive ? "bg-[#58B651] text-[#030812]" : "bg-[#D6D6D6] text-[#030812]"
                      }`}
                    >
                      {event.IsActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-[10px] py-[10px] whitespace-nowrap flex gap-[10px]">
                    <Button size="icon" variant="ghost" onClick={() => navigate(`/admin/eventlist/${event.EventUniqueName}`)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => navigate(`/admin/eventlist/${event.EventUniqueName}/edit`)}>
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="ghost" onClick={() => handleDelete(event.EventUniqueName)}>
                      <Trash2 className="h-4 w-4 text-red-500" />
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
