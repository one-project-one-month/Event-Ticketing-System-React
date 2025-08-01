import { useState, forwardRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function DateTimePicker() {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const CustomInput = forwardRef<HTMLInputElement, any>(({ value, onClick }, ref) => (
    <div
      className="relative w-full bg-[#F9F9FD] border border-[#E2E2EA] rounded-sm cursor-pointer"
      onClick={onClick}
    >
      <input
        type="text"
        value={value}
        placeholder="dd/mm/yyyy"
        readOnly
        ref={ref}
        className="w-full px-4 pr-10 py-3 text-[#6E6B8A] text-sm bg-transparent outline-none"
      />
      <img
        src="/icons/CalendarBlank.svg"
        alt="calendar"
        className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5"
      />
    </div>
  ));

  return (
    <DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      dateFormat="dd/MM/yyyy"
      customInput={<CustomInput />}
      calendarClassName="shadow-md"
    />
  );
}
