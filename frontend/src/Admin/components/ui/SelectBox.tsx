import React from "react";
import { cn } from "@/User/lib/utils";

export const SelectBox = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement>
>(({ className = "", disabled, children, ...props }, ref) => {
  return (
    <div className="relative w-full">
      <select
        ref={ref}
        disabled={disabled}
        className={cn(
          "w-full appearance-none rounded-[10px] border border-gray-300 bg-white px-6 py-4 pr-12 text-sm focus:border-blue-500 focus:ring-blue-500",
          disabled ? "!bg-[#D8DFEC] cursor-not-allowed text-gray-500" : "bg-white",
          className
        )}
        {...props}
      >
        {children}
      </select>

      {/* Dropdown Arrow Icon */}
      <img
        src="/icons/dropdown-arrow.svg"
        alt="Dropdown Arrow"
        className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400"
      />
    </div>
  );
});
SelectBox.displayName = "SelectBox";
