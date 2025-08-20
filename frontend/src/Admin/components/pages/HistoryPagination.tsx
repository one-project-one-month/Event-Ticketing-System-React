interface HistoryPaginationProps {
  currentPage: number;
  totalItems: number;
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
}

export default function HistoryPagination({
  currentPage,
  totalItems,
  onPageChange,
  itemsPerPage = 10,
}: HistoryPaginationProps) {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="mt-4 flex items-center justify-center gap-4 text-lg font-semibold text-[#43319A]">
      {pageNumbers.map((page) => (
        <span
          key={page}
          className={`cursor-pointer ${
            currentPage === page ? "underline underline-offset-4" : ""
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </span>
      ))}

      <button
        className="cursor-pointer rounded-full bg-[#43319A] px-3 py-1 text-white"
        onClick={() => {
          if (currentPage < totalPages) onPageChange(currentPage + 1);
        }}
      >
        →
      </button>
    </div>
  );
}
