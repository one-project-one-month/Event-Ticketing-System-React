import { useEffect, useState } from "react";
import ToolBar from "@/Admin/components/ui/ToolBar.tsx";
import AdminTitle from "@/Admin/components/Layouts/AdminTitle";
import {
  HistoryTable,
  type HistoryColumn,
} from "@/Admin/components/pages/HistoryTable.tsx";
import type { TransactionHistory } from "@/Admin/DataTypes/PurchasedHistory.ts";
import { getPurchasedHistoryList } from "@/services/PurchasedHistoryService.ts";
import {
  exportToCSV,
  exportToExcel,
  exportToPDF,
} from "@/Admin/utils/exportUtils.ts";

const PurchasedHistory = () => {
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState("");

  // --- Fetch Data ---
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const res = await getPurchasedHistoryList();
        if (res.isSuccess && Array.isArray(res.data?.transactionList)) {
          setTransactions(res.data.transactionList);
        } else {
          // setError(res.message || "Failed to fetch purchased history.");
          console.error("Error Fetching purchased history: ", res.message);
        }
      } catch (err) {
        console.error(err);
        // setError("Error fetching purchased history.");
      } finally {
        // setLoading(false);
      }
    };
    fetchTransactions();
  }, []);

  // --- Filter ---
  const filteredTransactions = transactions.filter((t) =>
    t.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  // --- Table Columns ---
  const transactionColumns: HistoryColumn<TransactionHistory>[] = [
    { key: "email", label: "Email" },
    { key: "eventName", label: "Event Name" },
    { key: "ticketTypeName", label: "Ticket Type Name" },
    {
      key: "transactionDate",
      label: "Transaction Date",
      render: (value) => new Date(value).toLocaleDateString("en-GB"),
    },
  ];

  // --- Export Function ---
  const handleExport = (format: string) => {
    if (filteredTransactions.length === 0) {
      return alert("No data to export.");
    }

    const exportData = filteredTransactions.map((t) => ({
      Email: t.email,
      "Event Name": t.eventName,
      "Ticket Type Name": t.ticketTypeName,
      "Transaction Date": new Date(t.transactionDate).toLocaleDateString(
        "en-GB",
      ),
    }));

    switch (format) {
      case "csv":
        exportToCSV(exportData, "purchasedHistory.csv");
        break;
      case "xlsx":
        exportToExcel(exportData, "purchasedHistory.xlsx");
        break;
      case "pdf":
        exportToPDF(exportData, "purchasedHistory.pdf");
        break;
      default:
        break;
    }
  };

  return (
    <section className="figtreef mx-10">
      {/* Search Bar */}
      <ToolBar
        addNewPath=""
        onExport={handleExport}
        onSearch={(term) => setSearchTerm(term)}
        hideAddNew={true}
      />

      {/* Data Table and Title */}
      <div className="mt-5">
        <AdminTitle>Purchased History</AdminTitle>
        <HistoryTable
          data={filteredTransactions}
          columns={transactionColumns}
          dataCodeName="transactionCode"
          link="/admin/history/purchased/"
        />
      </div>
    </section>
  );
};

export default PurchasedHistory;
