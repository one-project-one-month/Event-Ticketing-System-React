import React from "react";
import { cn } from "@/User/lib/utils";

export const TextInput = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => (
    <input
      ref={ref}
      className={cn(
        "w-full rounded-20px border border-gray-300 px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:ring-blue-500",
        className
      )}
      {...props}
    />
  )
);
TextInput.displayName = "TextInput";
