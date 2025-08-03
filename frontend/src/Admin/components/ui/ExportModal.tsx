import { X } from "lucide-react";
import { useState } from "react";

// Define allowed export formats
type ExportFormat = "csv" | "xlsx" | "pdf";

type ExportModalProps = {
  open: boolean;
  onClose: () => void;
  onExport: (format: ExportFormat) => void;
};

export default function ExportModal({ open, onClose, onExport }: ExportModalProps) {
  const [selectedFormat, setSelectedFormat] = useState<ExportFormat | "">("");

  const exportOptions: { label: string; icon: string; value: ExportFormat }[] = [
    {
      label: "CSV File (.csv)",
      icon: "/icons/csv-icon.svg",
      value: "csv",
    },
    {
      label: "Excel File (.xlsx)",
      icon: "/icons/xls-icon.svg",
      value: "xlsx",
    },
    {
      label: "PDF File (.pdf)",
      icon: "/icons/pdf-icon.svg",
      value: "pdf",
    },
  ];

  const handleExport = () => {
    if (!selectedFormat) return;
    onExport(selectedFormat as ExportFormat);
    onClose();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-[460px] rounded-2xl bg-white p-8 shadow-xl">
        <button
          className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          <X size={22} />
        </button>

        <h2 className="text-center text-2xl font-semibold text-[#151515]">
          Export <span className="pl-1">Data</span>
        </h2>

        <p className="mb-6 mt-2 text-center text-[#9CA3AF] text-[16px] font-medium">
          Select export format:
        </p>

        <div className="space-y-4">
          {exportOptions.map((option) => (
            <label
              key={option.value}
              className="flex cursor-pointer items-center gap-4 rounded-xl border border-gray-200 px-4 py-3 transition hover:bg-gray-100"
            >
              <input
                type="radio"
                name="export"
                value={option.value}
                checked={selectedFormat === option.value}
                onChange={() => setSelectedFormat(option.value)}
                className="h-4 w-4 text-purple-600 accent-purple-600"
              />
              <img src={option.icon} alt={option.label} className="h-6 w-6" />
              <span className="text-gray-800 font-medium text-sm">
                {option.label}
              </span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex justify-between gap-4">
          <button
            onClick={onClose}
            className="w-full rounded-xl border border-[#C4C4C4] bg-transparent py-2.5 text-[#6B7280] font-semibold hover:bg-gray-100 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="w-full rounded-xl bg-[#F28B38] py-2.5 text-white font-semibold hover:bg-[#df7e2f] transition"
            disabled={!selectedFormat}
          >
            Export
          </button>
        </div>
      </div>
    </div>
  );
}