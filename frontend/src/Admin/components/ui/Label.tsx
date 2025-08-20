import React from "react";

interface LabelProps extends React.LabelHTMLAttributes<HTMLLabelElement> {
  label: string;
  required?: boolean;
  className?: string;
}

export function Label({ label, required = false, className = "", ...rest }: LabelProps) {
  return (
    <label
      className={`text-lg font-medium text-[#6C2BD9] mb-1 block ${className}`}
      {...rest}
    >
      <span className="relative inline-block">
        {label}
        {required && (
          <span
            className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 text-red-600"
            aria-hidden="true"
          >
            *
          </span>
        )}
      </span>
    </label>
  );
}
