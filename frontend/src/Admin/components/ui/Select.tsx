import { ChevronDown } from "lucide-react";
import { useState } from "react";

interface Option {
  label: string;
  value: string;
}

interface SelectProps {
  label?: string;
  value: string;
  onChange?: (value: string) => void;
  options: Option[];
  disabled?: boolean;
  placeholder?: string;
}

export const Select = ({
  label,
  value,
  onChange,
  options,
  disabled = false,
  placeholder = "Select an option",
}: SelectProps) => {
  const [open, setOpen] = useState(false);

  const selectedLabel =
    options.find((opt) => opt.value === value)?.label || placeholder;

  return (
    <div className="w-full relative text-sm">
      {label && (
        <label className="block text-gray-700 text-sm mb-1">{label}</label>
      )}
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen(!open)}
        className={`flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm transition
          ${disabled ? "cursor-not-allowed bg-gray-100 text-gray-500" : "hover:border-gray-400"}
        `}
      >
        <span>{selectedLabel}</span>
        <ChevronDown size={16} className="text-gray-500" />
      </button>

      {open && !disabled && (
        <ul
          className="absolute z-10 mt-1 w-full rounded-md border bg-white shadow-md max-h-56 overflow-auto"
          onMouseLeave={() => setOpen(false)}
        >
          {options.map((option) => (
            <li
              key={option.value}
              className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                option.value === value ? "bg-gray-100 font-medium" : ""
              }`}
              onClick={() => {
                onChange?.(option.value);
                setOpen(false);
              }}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
