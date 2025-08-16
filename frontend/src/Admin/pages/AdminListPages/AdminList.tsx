import { Button } from "@/User/components/ui/button";
import Toolbar from "@/Admin/components/ui/ToolBar";
import { useNavigate } from "react-router-dom";
import { Pagination } from "@/Admin/components/ui/Pagination";
import { getAdmin } from "@/services/AdminServices";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils";
import { useEffect, useState } from "react";
import type { AdminDataList } from "@/Admin/DataTypes/Admin";

const AdminList = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [data, setData] = useState<AdminDataList[]>([]);
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      const res = await getAdmin();
      if (res.isSuccess && Array.isArray(res.data?.adminList)) {
        setData(res.data.adminList);
      } else {
        console.error("Failed to fetch Admins:", res.message);
        setData([]);
      }
      console.log(data);
    };

    fetchData();
  }, []);

  const filteredAdmins = data.filter((data) =>
    data.adminCode?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (format: string) => {
    if (filteredAdmins.length === 0) return alert("No data to export.");

    const exportData = filteredAdmins.map((e) => ({
      "Admin Code": e.adminCode,
      "Full Name": e.fullName,
      "Email Address": e.email,
      "Mobile Number": e.phoneNo,
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "admins.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "admins.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "admins.pdf");
        break;
      default:
        break;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAdmin = filteredAdmins.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="flex justify-center px-[15px] py-[10px]">
      <div className="flex w-full max-w-[1057px] flex-col gap-[20px]">
        <Toolbar
          onSearch={(val) => setSearchTerm(val)}
          onExport={handleExport}
          addNewPath="/admin/admin/create"
        />

        <h2 className="gap-[48px] text-[30px] font-semibold text-[#43319A] dark:text-white">
          Admin
        </h2>
        <div className="overflow-auto rounded-[20px] border border-gray-200 dark:bg-[#1E293B]">
          <table className="min-w-full divide-y divide-[#67648D]">
            <thead className="padding-[20px] bg-[#615CB8] dark:bg-[#0F172A]">
              <tr>
                {["No", "Full Name", "Email", "Mobile Number", "Action"].map(
                  (heading) => (
                    <th
                      key={heading}
                      className="py-[20px] text-center text-[20px] font-medium text-[#FAFAFACC]"
                    >
                      {heading}
                    </th>
                  ),
                )}
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 bg-white dark:bg-[#1E293B]">
              {currentAdmin.map((admin, index) => (
                <tr key={admin.adminCode} className="hover:dark:bg-gray-50">
                  <td className="px-[20px] py-[10px] text-center text-lg whitespace-nowrap">
                    {indexOfFirstItem + index + 1}
                  </td>
                  <td className="px-[10px] py-[10px] text-center text-lg font-medium whitespace-nowrap">
                    {admin.fullName}
                  </td>
                  <td className="whitespace px-[10px] py-[10px] text-center text-lg">
                    {admin.email}
                  </td>
                  <td className="whitespace px-[10px] py-[10px] text-center text-lg">
                    {admin.phoneNo}
                  </td>

                  <td className="flex items-center justify-center gap-[6px] px-[10px] py-[10px] whitespace-nowrap">
                    <Button
                      size="icon"
                      variant="ghost"
                      onClick={() =>
                        navigate(`/admin/admin/${admin.adminCode}`)
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
                        navigate(`/admin/admin/${admin.adminCode}/edit`)
                      }
                    >
                      <img
                        src="/icons/Edit.svg"
                        alt="edit"
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
          totalItems={filteredAdmins.length}
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

export default AdminList;
