import { useEffect, useState } from "react";
import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle.tsx";
import {
  type HistoryColumn,
  HistoryTable,
} from "@/Admin/components/pages/HistoryTable.tsx";
import type { BusinessEmailData } from "@/Admin/DataTypes/BusinessEmail.ts";
import { getBusinessEmailList } from "@/services/BusinessEmailService.ts";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils.ts";

export const BusinessEmail = () => {
  const [emails, setEmails] = useState<BusinessEmailData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const businessEmailColumns = [
    { key: "fullName", label: "Full Name" },
    { key: "phone", label: "Mobile No." },
    { key: "email", label: "Email" },
  ] satisfies HistoryColumn<BusinessEmailData>[];

  useEffect(() => {
    const fetchEmails = async () => {
      const res = await getBusinessEmailList();
      if (res.isSuccess && Array.isArray(res.data?.businessEmailList)) {
        setEmails(res.data.businessEmailList);
      } else {
        console.error("Failed to fetch business emails:", res.message);
      }
    };

    fetchEmails();
  }, []);

  const filteredEmails = emails.filter((email) =>
    email.fullName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleExport = (format: string) => {
    if (filteredEmails.length === 0) return alert("No data to export.");

    const exportData = filteredEmails.map((e) => ({
      "Full Name": e.fullName,
      Email: e.email,
      "Phone Number": e.phone,
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "business-emails.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "business-emails.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "business-emails.pdf");
        break;
      default:
        break;
    }
  };

  return (
    <section className={`mx-auto w-[70rem]`}>
      {/* Search Bar */}
      <ToolBar
        addNewPath={``}
        onExport={handleExport}
        onSearch={(term) => setSearchTerm(term)}
        hideAddNew={true}
      />

      {/*  Data Table and Title */}
      <div className={`mt-5`}>
        <AdminTitle>Business Email</AdminTitle>
        <HistoryTable
          data={filteredEmails}
          columns={businessEmailColumns}
          dataCodeName={`businessEmailCode`}
          link={`/admin/business/email/`}
        />
      </div>
    </section>
  );
};
