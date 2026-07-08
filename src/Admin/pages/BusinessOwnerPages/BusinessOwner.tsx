import Toolbar from "@/Admin/components/ui/ToolBar";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/Admin/components/ui/Pagination";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils";
import { useEffect, useState } from "react";
import { Button } from "@/User/components/ui/button";
import {
  deleteBusnisssOwner,
  getBusinessOwners,
} from "@/services/BusinessOwnerServices";
import type { BusinessOwnerData } from "@/Admin/DataTypes/BusinessOwner";

const BusinessOwner = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<BusinessOwnerData[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getBusinessOwners();

      if (res.isSuccess && Array.isArray(res.data?.businessOwners)) {
        setData(res.data.businessOwners);
      } else {
        console.error("Failed to fetch Business Owner:", res.message);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (ownerCode: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this Business Owner?",
    );
    if (!confirmed) return;

    try {
      const res = await deleteBusnisssOwner(ownerCode);
      if (res.isSuccess) {
        setData((prev) =>
          prev.filter((e) => e.businessownercode !== ownerCode),
        );
      } else {
        alert(res.message || "Failed to delete Business owner.");
      }
    } catch (error) {
      console.error("Delete failed:", error);
      alert("An error occurred while deleting. Please try again.");
    }
  };

  const filteredBusinessOwner = data.filter((event) =>
    event.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (format: string) => {
    if (filteredBusinessOwner.length === 0) return alert("No data to export.");

    const exportData = filteredBusinessOwner.map((e) => ({
      "Business Owner ID": e.businessownerid,
      "Category Name": e.fullName,
      Email: e.email,
      "Phone Number": e.phone,
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "businessOwner.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "businessOwner.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "businessowner.pdf");
        break;
      default:
        break;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentTicketType = filteredBusinessOwner.slice(
    indexOfFirstItem,
    indexOfLastItem,
  );
  return (
    <div className="flex justify-center px-[15px] py-[10px]">
      <div className="figtreef mx-10 flex w-full flex-col gap-[20px]">
        <Toolbar
          onSearch={(val) => setSearchTerm(val)}
          onExport={handleExport}
          addNewPath="/admin/business/owner/create"
        />

        <h2 className="gap-[48px] text-[30px] font-semibold text-[#43319A] dark:text-white">
          Business Owner
        </h2>
        <div className="overflow-auto rounded-[20px] border border-gray-200">
          <table className="min-w-full divide-y divide-[#67648D]">
            <thead className="padding-[20px] bg-[#615CB8] dark:bg-[#0F172A]">
              <tr>
                {["No", "Full Name", "Email", "Phone Number", "Actions"].map(
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
              {currentTicketType.map((event, index) => (
                <tr key={event.businessownercode} className="hover:bg-gray-50">
                  <td className="px-[20px] py-[10px] text-center text-lg whitespace-nowrap">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {event.fullName}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {event.email}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {event.phone}
                  </td>
                  <td className="flex items-center justify-center gap-[6px] px-[10px] py-[10px] whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigate(
                          `/admin/business/owner/${event.businessownercode}`,
                        )
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
                          `/admin/business/owner/${event.businessownercode}/edit`,
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
                      onClick={() => handleDelete(event.businessownercode)}
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
          totalItems={filteredBusinessOwner.length}
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

export default BusinessOwner;
