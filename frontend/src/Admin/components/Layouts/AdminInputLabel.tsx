import type { IAdminInputProps } from "@/Admin/DataTypes/DataTypes.ts";

export default function AdminInputLabel({
  label,
  value,
  name,
  onChange,
  required = false,
  type,
  placeholder,
  readonly = false,
}: IAdminInputProps) {
  return (
    <div className={`flex flex-col justify-start gap-3`}>
      <label className={`text-xl text-[#615CB8]`} htmlFor={name}>
        {label} {required && <span className={`text-red-400`}>*</span>}
      </label>

      {type === "textarea" ? (
        <textarea
          value={value}
          name={name}
          readOnly={readonly}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={`w-96 resize-none rounded-[0.5rem] border px-3 py-2 text-lg`}
          rows={5}
        />
      ) : (
        <input
          value={value}
          name={name}
          type={type}
          readOnly={readonly}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          placeholder={placeholder}
          className={`w-96 rounded-[0.5rem] border px-3 py-2 text-lg`}
        />
      )}
    </div>
  );
}
