import { useEffect, useState } from "react";
import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import {
  type HistoryColumn,
  HistoryTable,
} from "@/Admin/components/pages/HistoryTable.tsx";
import type { VerificationCodeData } from "@/Admin/DataTypes/VerificationCode.ts";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils";
import { getVerificationCodeList } from "@/services/VerificationCodeService.ts";

export const VerificationHistory = () => {
  const [codes, setCodes] = useState<VerificationCodeData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const verificationColumns = [
    { key: "email", label: "Email" },
    { key: "verificationCode", label: "Verification Code" },
    {
      key: "isused",
      label: "Status",
      align: "center",
      render: (value: boolean) => (value ? "✅" : "❌"),
    },
  ] satisfies HistoryColumn<VerificationCodeData>[];

  // Fetch data from service
  useEffect(() => {
    const fetchCodes = async () => {
      try {
        const res = await getVerificationCodeList();
        if (res.isSuccess && Array.isArray(res.data?.verificationCodes)) {
          setCodes(res.data.verificationCodes);
        } else {
          setError(res.message || "Failed to fetch verification codes.");
        }
      } catch (err) {
        console.error(err);
        setError("Error fetching verification codes.");
      } finally {
        setLoading(false);
      }
    };

    fetchCodes();
  }, []);

  const filteredCodes = codes.filter((code) =>
    code.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (format: string) => {
    if (filteredCodes.length === 0) return alert("No data to export.");

    const exportData = filteredCodes.map((c) => ({
      "Verification ID": c.verificationId,
      Email: c.email,
      "Verification Code": c.verificationCode,
      Status: c.isused ? "Used" : "Unused",
      "Created By": c.createdby,
      "Created At": c.createdat,
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "verification_codes.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "verification_codes.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "verification_codes.pdf");
        break;
      default:
        break;
    }
  };

  if (loading) return <p className="p-6 text-gray-500">Loading...</p>;
  if (error) return <p className="p-6 text-red-600">Error: {error}</p>;

  return (
    <section className="mx-auto w-[70rem]">
      {/* Search Bar */}
      <ToolBar
        addNewPath=""
        onExport={handleExport}
        onSearch={(term) => setSearchTerm(term)}
        hideAddNew={true}
      />

      {/* Data Table and Title */}
      <div className="mt-5">
        <AdminTitle>Verification History</AdminTitle>
        <HistoryTable
          data={filteredCodes}
          columns={verificationColumns}
          dataCodeName="verificationCode"
          link="/admin/history/verification/"
        />
      </div>
    </section>
  );
};
