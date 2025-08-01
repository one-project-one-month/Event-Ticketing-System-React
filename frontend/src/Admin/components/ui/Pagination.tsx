import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

type PaginationProps = {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
};

export function Pagination({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
}: PaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const visiblePages = Array.from(
    { length: totalPages },
    (_, i) => i + 1,
  ).slice(Math.max(0, currentPage - 3), Math.min(currentPage + 2, totalPages));

  return (
    <div className="flex w-full items-center justify-between rounded-md bg-transparent px-4 py-2">
      {/* Left side: 1-10 of 100 items */}
      <div className="text-sm font-medium text-black dark:text-white">
        {startItem.toString().padStart(2, "0")}-
        {endItem.toString().padStart(2, "0")} of {totalItems} items
      </div>

      {/* Middle: Pagination Controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <ChevronsLeft size={16} />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="pagination-button"
        >
          <ChevronLeft size={16} />
        </button>

        {visiblePages.map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`pagination-number ${
              page === currentPage
                ? "bg-[#615CB8] text-white"
                : "bg-white text-black"
            }`}
          >
            {page}
          </button>
        ))}

        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <ChevronRight size={16} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="pagination-button"
        >
          <ChevronsRight size={16} />
        </button>
      </div>

      {/* Right side: Items per page */}
      <div className="flex items-center gap-2 text-sm text-black dark:text-white">
        <select
          value={itemsPerPage}
          onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
          className="rounded bg-[#615CB8] px-2 py-1 text-sm text-white"
        >
          {[5, 10, 20, 50].map((val) => (
            <option key={val} value={val}>
              {val}
            </option>
          ))}
        </select>
        Items per Page
      </div>
    </div>
  );
}
