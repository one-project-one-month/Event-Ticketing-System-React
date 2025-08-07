import { forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker({
  value,
  onChange,
}: {
  value: Date | null;
  onChange: (date: Date | null) => void;
}) {
  const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
    <div className="relative w-[400px]">
      <input
        ref={ref}
        type="text"
        onClick={onClick}
        value={value}
        placeholder="dd/mm/yyyy (hh:mm aa)"
        readOnly
        className="w-full bg-[#F9F9FD] border border-[#E2E2EA] rounded-[10px] px-4 pr-10 py-3 text-[#6E6B8A] text-sm cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#6C2BD9]"
      />
      <img
        src="/icons/CalendarBlank.svg"
        alt="calendar"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 pointer-events-none"
      />
    </div>
  ));

  CustomInput.displayName = "CustomDateInput";

  return (
    <DatePicker
      selected={value}
      onChange={onChange}
      showTimeSelect
      timeFormat="hh:mm aa"
      timeIntervals={15}
      dateFormat="dd/MM/yyyy hh:mm aa"
      customInput={<CustomInput />}
      calendarClassName="shadow-md"
      popperPlacement="bottom-start"
    />
  );
}
