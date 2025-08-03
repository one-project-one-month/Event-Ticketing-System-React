"use client";

import React from "react";
import {
  ChevronsLeft,
  ChevronLeft,
  ChevronRight,
  ChevronsRight,
} from "lucide-react";

import { Button } from "@/Admin/components/ui/shadcn/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Admin/components/ui/shadcn/select";

interface PaginationProps {
  totalItems: number;
  itemsPerPageOptions?: number[];
}

export default function VenuePagination({
  totalItems,
  itemsPerPageOptions = [5, 10, 20, 50],
}: PaginationProps) {
  const [currentPage, setCurrentPage] = React.useState(1);
  const [itemsPerPage, setItemsPerPage] = React.useState(
    itemsPerPageOptions[1],
  );

  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxPagesToShow = 5; // Number of page buttons to display
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    const endPage = Math.min(totalPages, startPage + maxPagesToShow - 1);

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = getPageNumbers();

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (value: string) => {
    setItemsPerPage(Number(value));
    setCurrentPage(1); // Reset to first page when items per page changes
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="text-sm text-gray-700">
        {startItem}-{endItem} of {totalItems} items
      </div>

      <div className="flex items-center gap-1">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(1)}
          disabled={currentPage === 1}
          className="rounded-none bg-[hsl(250_50%_40%)] text-white hover:bg-[hsl(250_50%_50%)] disabled:bg-gray-300 disabled:text-gray-500"
          aria-label="First page"
        >
          <ChevronsLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="rounded-none bg-[hsl(250_50%_40%)] text-white hover:bg-[hsl(250_50%_50%)] disabled:bg-gray-300 disabled:text-gray-500"
          aria-label="Previous page"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {pageNumbers.map((page) => (
          <Button
            key={page}
            variant="ghost"
            size="icon"
            onClick={() => handlePageChange(page)}
            className={`rounded-none ${
              currentPage === page
                ? "bg-[hsl(250_50%_40%)] text-white hover:bg-[hsl(250_50%_50%)]"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
            aria-current={currentPage === page ? "page" : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </Button>
        ))}

        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="rounded-none bg-[hsl(250_50%_40%)] text-white hover:bg-[hsl(250_50%_50%)] disabled:bg-gray-300 disabled:text-gray-500"
          aria-label="Next page"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => handlePageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="rounded-none bg-[hsl(250_50%_40%)] text-white hover:bg-[hsl(250_50%_50%)] disabled:bg-gray-300 disabled:text-gray-500"
          aria-label="Last page"
        >
          <ChevronsRight className="h-4 w-4" />
        </Button>
      </div>

      <div className="flex items-center gap-2 text-sm text-gray-700">
        <Select
          value={String(itemsPerPage)}
          onValueChange={handleItemsPerPageChange}
          disabled={true}
        >
          <SelectTrigger
            className="h-9 w-fit rounded-none border-none bg-[hsl(250_50%_40%)] text-white focus:ring-0 focus:ring-offset-0 [&>svg]:stroke-white"
            aria-label="Select items per page"
          >
            <SelectValue placeholder={itemsPerPage} />
          </SelectTrigger>
          <SelectContent className={`text-white`}>
            {itemsPerPageOptions.map((option) => (
              <SelectItem key={option} value={String(option)}>
                {option}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        Items per Page
      </div>
    </div>
  );
}
