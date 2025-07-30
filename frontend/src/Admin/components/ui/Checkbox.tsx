import React from "react";

export function Checkbox({ label, ...props }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center space-x-2 text-sm text-gray-700">
      <input type="checkbox" className="accent-blue-600 h-4 w-4" {...props} />
      <span>{label}</span>
    </label>
  );
}
