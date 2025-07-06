import React from "react";
import { type QRInfo } from "@/types/index";
import { X, CheckCircle } from "lucide-react";

interface Props {
  info: QRInfo;
  onClose: () => void;
}

const QrResult: React.FC<Props> = ({ info, onClose }) => {
  return (
    <div className="relative bg-gradient-to-br from-purple-700 via-pink-600 to-yellow-400 text-white rounded-2xl p-8 w-full max-w-md shadow-2xl border-4 border-white/20 animate-fade-in">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 text-white/70 hover:text-white transition"
        aria-label="Close"
      >
        <X className="w-6 h-6" />
      </button>

      <div className="flex flex-col items-center justify-center text-center">
        {/* Animated glowing circle with checkmark */}
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-pink-500 via-yellow-400 to-purple-600 animate-spin-slow opacity-60 blur-lg"></div>
          <div className="relative z-10 w-full h-full flex items-center justify-center bg-white/10 border border-white/30 rounded-full shadow-xl">
            <CheckCircle className="w-12 h-12 text-green-300" />
          </div>
        </div>

        <h2 className="text-2xl font-bold mb-4 tracking-wide uppercase">Valid Ticket</h2>

        <div className="bg-white/10 backdrop-blur-sm p-4 rounded-lg w-full space-y-2 text-sm">
          <p>
            <span className="font-semibold text-white/90">Name:</span>{" "}
            <span className="text-white">{info.name}</span>
          </p>
          <p>
            <span className="font-semibold text-white/90">Ticket #:</span>{" "}
            <span className="text-white">{info.ticketNumber}</span>
          </p>
          <p>
            <span className="font-semibold text-white/90">Event:</span>{" "}
            <span className="text-white">{info.event}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default QrResult;
