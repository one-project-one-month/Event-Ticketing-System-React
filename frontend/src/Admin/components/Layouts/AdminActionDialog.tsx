import { X } from "lucide-react";
import { motion } from "framer-motion";

interface AdminActionDialogProps {
  open: boolean;
  onClose: () => void;
  text: string;
}

export default function AdminActionDialog({
  open,
  onClose,
  text,
}: AdminActionDialogProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="relative w-[380px] rounded-[20px] bg-[#f8f8ff] px-6 py-10 text-center shadow-xl"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-xl text-[#645CAA] hover:opacity-60"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#645CAA]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#645CAA] to-[#A084DC]">
            <svg
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <p className="mb-6 text-lg font-semibold text-[#645CAA]">{text}</p>

        <button
          onClick={onClose}
          className="mx-auto cursor-pointer rounded-[18px] bg-[#645CAA] px-10 py-3 text-white shadow-md hover:opacity-90"
        >
          Okay
        </button>
      </motion.div>
    </div>
  );
}
