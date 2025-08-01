import React from "react";

export function Checkbox({
  label,
  disabled,
  ...props
}: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <label className="flex items-center space-x-2 text-lg font-medium">
      <input
        type="checkbox"
        className="h-4 w-4 accent-[#615CB8]"
        disabled={disabled}
        {...props}
      />
      <span className={disabled ? "text-[#D8DFEC]" : "text-[#615CB8]"}>
        {label}
      </span>
    </label>
  );
}
