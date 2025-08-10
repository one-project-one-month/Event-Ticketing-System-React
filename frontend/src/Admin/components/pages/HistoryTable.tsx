import HistoryPagination from "@/Admin/components/pages/HistoryPagination.tsx";
import { useState } from "react";

interface Column<T> {
  label: string;
  key: keyof T;
  width?: string; // tailwind width classes
  align?: "left" | "center" | "right";
}

interface HistoryTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onActionClick?: (row: T) => void;
}

export default function HistoryTable<T extends object>({
  columns,
  data,
  onActionClick,
}: HistoryTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = data.slice(startIndex, startIndex + rowsPerPage);

  return (
    <section className="mt-5">
      <div className={`h-[33rem] overflow-hidden rounded-md bg-[#F8F8FF]`}>
        {/* Header */}
        <div className="flex w-full items-center rounded-t-md bg-[#615CB8] text-lg font-semibold text-white">
          <div className="w-[7%] py-8 text-center">No.</div>
          {columns.map((col) => (
            <div
              key={String(col.key)}
              className={`${col.width || "px-4"} flex-1 py-8 ${
                col.align === "center"
                  ? "text-center"
                  : col.align === "right"
                    ? "text-right"
                    : "text-left"
              }`}
            >
              {col.label}
            </div>
          ))}
          <div className="w-[10%] py-4 text-center">Action</div>
        </div>

        {/* Rows */}
        <div className="hide-scrollbar h-[29rem] overflow-y-scroll">
          {currentRows.map((row, idx) => (
            <div
              key={idx}
              className={`flex w-full items-center ${
                idx % 2 === 0 ? "bg-white" : "bg-[#E6E3FF]"
              }`}
            >
              <div className="w-[7%] py-3 text-center">
                {startIndex + idx + 1}.
              </div>
              {columns.map((col) => (
                <div
                  key={String(col.key)}
                  className={`${col.width || "px-4"} flex-1 py-3 ${
                    col.align === "center"
                      ? "text-center"
                      : col.align === "right"
                        ? "text-right"
                        : "text-left"
                  }`}
                >
                  {String(row[col.key])}
                </div>
              ))}
              <div className="w-[10%] py-3 text-center">
                <button onClick={() => onActionClick?.(row)} className="p-1">
                  <img
                    src="/icons/Eye.svg"
                    alt="View"
                    className="inline-block cursor-pointer"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <HistoryPagination
        currentPage={currentPage}
        totalItems={data.length}
        onPageChange={setCurrentPage}
        itemsPerPage={rowsPerPage}
      />
    </section>
  );
}
