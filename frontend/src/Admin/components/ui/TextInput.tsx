import React from "react";
import { cn } from "@/User/lib/utils";

export const TextInput = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className = "", disabled, ...props }, ref) => {
  return (
    <input
      ref={ref}
      disabled={disabled}
      className={cn(
        "w-full rounded-[10px] border border-gray-300 px-6 py-4 text-sm focus:border-blue-500 focus:ring-blue-500",
        disabled ? "!bg-[#D8DFEC] cursor-not-allowed text-gray-500" : "bg-white",
        className
      )}
      {...props}
    />
  );
});
TextInput.displayName = "TextInput";
