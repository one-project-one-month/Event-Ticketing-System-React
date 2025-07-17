import { useRef } from "react";
import { toPng } from "html-to-image";

import scheduleIcon from "@/assets/icons/QR/schedule.svg";
import downloadIcon from "@/assets/icons/QR/downloadqrinfo.svg";
import ticketIcon from "@/assets/icons/QR/headerticker.svg";
import clockIcon from "@/assets/icons/QR/tabler_clock-filled.svg";
import feTicketIcon from "@/assets/icons/QR/fe_ticket.svg";
import personalIcon from "@/assets/icons/QR/personalinfoicon.svg";
import locationIcon from "@/assets/icons/QR/locationicon.svg";

import { type QRInfo } from "@/types";

interface QrResultProps {
  onClose: () => void;
  info: QRInfo;
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
  <div className="flex justify-between text-sm">
    <span className="font-medium text-black/50 text-left">{label}</span>
    <span className="text-right text-[#233b75ff] font-semibold">{value}</span>
  </div>
);

export default function QrResult({ onClose, info }: QrResultProps) {
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownload = async () => {
    if (!printRef.current) return;

    try {
      const dataUrl = await toPng(printRef.current, { cacheBust: true });
      const link = document.createElement("a");
      link.download = `${info.EventName}-Ticket.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Failed to generate image:", error);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* This container is NOT inside printRef — so it won't be captured */}
      <div className="w-full max-w-4xl px-4 mb-6 flex justify-between items-start">
        <div className="text-left">
          <h2 className="text-xl font-semibold text-[#233b75] mb-0">Ticket Information</h2>
          <p className="text-sm text-[#233b75] opacity-60 -mt-0.5">
            View your ticket detail and event Information
          </p>
        </div>
        <div className="flex gap-2 mt-1">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 border px-4 py-2 text-[#233b75ff] rounded-md shadow-sm hover:shadow-md text-sm font-medium cursor-pointer"
          >
            <img src={downloadIcon} alt="Download" className="w-4 h-4" /> Download
          </button>
          <button
            onClick={onClose}
            className="flex items-center gap-2 border px-4 py-2 rounded-md shadow-sm hover:shadow-md cursor-pointer text-sm font-medium text-red-600"
          >
            Close
          </button>
        </div>
      </div>

      {/* This container is the ONLY part captured in the download */}
      <div
        ref={printRef}
        className="w-full max-w-4xl bg-white rounded-2xl shadow-md border p-0 mt-2"
      >
        {/* Header */}
        <div
          className="flex justify-between items-center px-6 py-4 rounded-t-2xl text-white"
          style={{ background: "linear-gradient(to right, #233b75, #3a4b9d)" }}
        >
          <div>
            <h1 className="text-2xl font-bold">{info.EventName}</h1>
            <div className="flex items-center gap-2 text-sm opacity-90">
              <img src={scheduleIcon} alt="schedule" className="w-4 h-4" />
              Event Code: {info.EventCode}
            </div>
          </div>
          <img src={ticketIcon} alt="ticket icon" className="w-10 h-10" />
        </div>

        {/* Body */}
        <div className="grid grid-cols-2 gap-6 p-6">
          {/* Date & Time */}
          <div className="bg-[#f4f6fb] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={clockIcon} alt="clock" className="w-4 h-4" /> Date & Time
            </div>
            <div className="space-y-1">
              <InfoRow label="Date:" value={info.Eventdate} />
              <InfoRow label="Time:" value={`${info.EventTimeFrom} - ${info.EventTimeTo}`} />
              <InfoRow label="Gate open:" value={info.GateOpenTime} />
            </div>
          </div>

          {/* Ticket Details */}
          <div className="bg-[#f4f6fb] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={feTicketIcon} alt="ticket details" className="w-4 h-4" /> Ticket Details
            </div>
            <div className="space-y-1">
              <InfoRow label="Ticket Code:" value={info.TicketCode} />
              <InfoRow label="Price:" value={`${info.TicketPrice} MMK`} />
              <InfoRow label="Type:" value={info.TicketType} />
            </div>
          </div>

          {/* Personal Info */}
          <div className="bg-[#f4f6fb] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={personalIcon} alt="personal info" className="w-4 h-4" /> Personal Information
            </div>
            <div className="space-y-1">
              <InfoRow label="Full Name:" value={info.FullName} />
              <InfoRow label="Email:" value={info.Email} />
            </div>
          </div>

          {/* Event Location */}
          <div className="bg-[#f4f6fb] rounded-xl p-4 space-y-2">
            <div className="flex items-center gap-2 font-medium text-[#233b75ff]">
              <img src={locationIcon} alt="location" className="w-4 h-4" /> Event Information
            </div>
            <div className="space-y-1">
              <InfoRow label="Location:" value={info.Location} />
              <InfoRow label="Address:" value={info.Address} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

