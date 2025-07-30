import React from "react";
import { cn } from "@/User/lib/utils";

export function Label({ htmlFor, children, className }: React.LabelHTMLAttributes<HTMLLabelElement>) {
  return (
    <label htmlFor={htmlFor} className={cn("text-sm font-medium text-gray-700", className)}>
      {children}
    </label>
  );
}
