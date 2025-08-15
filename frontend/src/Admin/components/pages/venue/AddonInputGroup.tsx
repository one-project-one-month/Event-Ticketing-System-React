import { useEffect, useState } from "react";

interface AddonsInputGroupProps {
  selectedAddons: string[];
  onChange: (addons: string[]) => void;
  readonly?: boolean;
}

const defaultOptions = [
  "Catering",
  "Transportation",
  "Coordination",
  "Decoration and Design",
  "Wifi-Free",
  "Others",
];

export default function AddonsInputGroup({
  selectedAddons,
  onChange,
  readonly = false,
}: AddonsInputGroupProps) {
  // Split default options and others
  const defaultChecked = selectedAddons.filter((a) =>
    defaultOptions.includes(a),
  );
  const otherInitial = selectedAddons
    .filter((a) => !defaultOptions.includes(a))
    .join(", ");

  const [checked, setChecked] = useState<string[]>(defaultChecked);
  const [otherText, setOtherText] = useState<string>(otherInitial);

  const handleCheckboxChange = (value: string) => {
    if (checked.includes(value)) {
      setChecked(checked.filter((item) => item !== value));
    } else {
      setChecked([...checked, value]);
    }
  };

  useEffect(() => {
    const others = otherText
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s.length > 0);

    const result = checked.includes("Others")
      ? [...checked.filter((i) => i !== "Others"), ...others]
      : [...checked, ...others.filter((o) => !checked.includes(o))];

    onChange(result);
  }, [checked, otherText]);

  return (
    <div className="mt-6 flex flex-col gap-3">
      <label className="text-xl text-[#615CB8]">
        Addon <span className="text-red-400">*</span>
      </label>

      <div className="grid grid-cols-2 gap-4">
        {defaultOptions.map((option) => (
          <div className="flex flex-row items-center" key={option}>
            <input
              id={`addon-${option}`}
              type="checkbox"
              readOnly={readonly}
              checked={checked.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className={`relative mr-2 flex size-5 appearance-none items-center justify-center rounded border border-[#6F6C8F] bg-[#6F6C8F] before:absolute before:top-[1px] before:left-[5px] before:hidden before:text-xs before:font-bold before:text-white before:content-['✓'] checked:bg-[#615CB8] checked:before:block`}
            />
            <label
              htmlFor={`addon-${option}`}
              className="flex min-w-32 cursor-pointer items-center gap-2 rounded border border-[#6F6C8F] px-2 py-0.5 text-[#6F6C8F]"
            >
              {option}
            </label>
          </div>
        ))}
      </div>

      <div className="mt-2 flex flex-col gap-1">
        <input
          type="text"
          value={otherText}
          readOnly={readonly || (!checked.includes("Others") && !otherText)}
          onChange={(e) => setOtherText(e.target.value)}
          placeholder="Enter additional addons (separated by commas)"
          className="w-96 rounded border px-3 py-2"
        />
        <span className="ml-1 text-sm text-gray-500">
          Separate multiple values with commas.
        </span>
      </div>
    </div>
  );
}
