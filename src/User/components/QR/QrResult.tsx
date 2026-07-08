import { useRef } from "react";
import { toPng } from "html-to-image";

import scheduleIcon from "@/User/assets/icons/QR/schedule.svg";
import downloadIcon from "@/User/assets/icons/QR/downloadqrinfo.svg";
import ticketIcon from "@/User/assets/icons/QR/headerticker.svg";
import clockIcon from "@/User/assets/icons/QR/tabler_clock-filled.svg";
import feTicketIcon from "@/User/assets/icons/QR/fe_ticket.svg";
import personalIcon from "@/User/assets/icons/QR/personalinfoicon.svg";
import locationIcon from "@/User/assets/icons/QR/locationicon.svg";

import { type QRInfo } from "@/User/DataTypes/QrCheck";

interface QrResultProps {
  onClose: () => void;
  info: QRInfo;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="text-left font-medium text-black/50">{label}</span>
    <span className="text-right font-semibold text-[#233b75ff]">{value}</span>
  </div>
);

export default function QrResult({ onClose, info }: QrResultProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printRef.current) return;

    try {
      const dataUrl = await toPng(printRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `${info.eventName}-Ticket.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  function formatDateString(dateStr: string): string {
    const [month, day, year] = dateStr.split("/").map(Number);
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  function parseDateTime(str: string): Date {
  const [datePart, timePart, meridiem] = str.split(" ");
  const [month, day, year] = datePart.split("/").map(Number); // <-- MM/DD/YYYY
  let [hour, minute, second] = timePart.split(":").map(Number);

  if (meridiem.toUpperCase() === "PM" && hour < 12) hour += 12;
  if (meridiem.toUpperCase() === "AM" && hour === 12) hour = 0;

  return new Date(year, month - 1, day, hour, minute, second);
}

  function formatEventTimeRange(startStr: string, endStr: string): string {
    const startDate = parseDateTime(startStr);
    const endDate = parseDateTime(endStr);

    const startTime = startDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });
    const endTime = endDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    // Same day → just show times
    if (
      startDate.getDate() === endDate.getDate() &&
      startDate.getMonth() === endDate.getMonth() &&
      startDate.getFullYear() === endDate.getFullYear()
    ) {
      return `${startTime} - ${endTime}`;
    } else {
      // Different day → show end date after time
      // const endDateStr = formatDateString(
      //   `${endDate.getDate()}/${endDate.getMonth() + 1}/${endDate.getFullYear()}`,
      // );
      return `${startTime} - ${endTime}`;
    }
  }

  return (
    <div className="mt-10 flex w-full flex-col items-center">
      {/* This container is NOT inside printRef — so it won't be captured */}
      <div className="mb-6 flex w-full max-w-4xl items-start justify-between px-4">
        <div className="text-left">
          <h2 className="mb-0 text-xl font-semibold text-[#233b75]">
            Ticket Information
          </h2>
          <p className="-mt-0.5 text-sm text-[#233b75] opacity-60">
            View your ticket detail and event Information
          </p>
        </div>
        <div className="mt-1 flex gap-2">
          <button
            onClick={handleDownload}
            className="flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-[#233b75ff] shadow-sm hover:shadow-md"
          >
            <img src={downloadIcon} alt="Download" className="h-4 w-4" />{" "}
            Download
          </button>
          <button
            onClick={onClose}
            className="flex cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm font-medium text-red-600 shadow-sm hover:shadow-md"
          >
            Close
          </button>
        </div>
      </div>

      {/* This container is the ONLY part captured in the download */}
      <div
        ref={printRef}
        className="mt-2 w-full max-w-4xl rounded-2xl border bg-white p-0 shadow-md"
      >
        {/* Header */}
        <div
          className="flex items-center justify-between rounded-t-2xl px-6 py-4 text-white"
          style={{ background: "linear-gradient(to right, #233b75, #3a4b9d)" }}
        >
          <div>
            <h1 className="text-2xl font-bold">{info.eventName}</h1>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <img src={scheduleIcon} alt="schedule" className="h-4 w-4" />
              Event Code: {info.eventCode}
            </div>
          </div>
          <img src={ticketIcon} alt="ticket icon" className="h-10 w-10" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Date & Time */}
          <div className="space-y-2 rounded-xl bg-[#f4f6fb] p-4">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={clockIcon} alt="clock" className="h-4 w-4" /> Date &
              Time
            </div>
            <div className="space-y-1">
              <InfoRow label="Date:" value={formatDateString(info.eventDate)} />
              <InfoRow
                label="Time:"
                value={formatEventTimeRange(
                  info.eventTimeFrom,
                  info.eventTimeTo,
                )}
              />
              <InfoRow label="Gate open:" value={info.gateOpenTime} />
            </div>
          </div>

          {/* Ticket Details */}
          <div className="space-y-2 rounded-xl bg-[#f4f6fb] p-4">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img
                src={feTicketIcon}
                alt="ticket details"
                className="h-4 w-4"
              />{" "}
              Ticket Details
            </div>
            <div className="space-y-1">
              <InfoRow label="Ticket Code:" value={info.ticketCode} />
              <InfoRow label="Price:" value={`${info.ticketPrice} MMK`} />
              <InfoRow label="Type:" value={info.ticketType} />
            </div>
          </div>

          {/* Personal Info */}
          <div className="space-y-2 rounded-xl bg-[#f4f6fb] p-4">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={personalIcon} alt="personal info" className="h-4 w-4" />{" "}
              Personal Information
            </div>
            <div className="space-y-1">
              <InfoRow label="Full Name:" value={info.fullName} />
              <InfoRow label="Email:" value={info.email} />
            </div>
          </div>

          {/* Event Location */}
          <div className="space-y-2 rounded-xl bg-[#f4f6fb] p-4">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={locationIcon} alt="location" className="h-4 w-4" />{" "}
              Event Information
            </div>
            <div className="space-y-1">
              <InfoRow label="Venue Name:" value={info.location} />
              <InfoRow label="Address:" value={info.address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
