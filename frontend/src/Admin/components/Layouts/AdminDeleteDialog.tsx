"use client";

import { X, Trash2 } from "lucide-react";
import { motion } from "framer-motion";

interface AdminDeleteDialogProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export default function AdminDeleteDialog({
  open,
  onCancel,
  onConfirm,
}: AdminDeleteDialogProps) {
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
          onClick={onCancel}
          className="absolute top-4 right-4 text-xl text-[#645CAA] hover:opacity-60"
        >
          <X size={20} />
        </button>

        <div className="mx-auto mb-6 flex h-28 w-28 items-center justify-center rounded-full border-2 border-[#645CAA]">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gradient-to-b from-[#645CAA] to-[#A084DC]">
            <Trash2 className="h-8 w-8 text-white" />
          </div>
        </div>

        <p className="mb-8 text-lg font-semibold text-[#645CAA]">
          ARE YOU SURE TO DELETE THIS?
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={onCancel}
            className="cursor-pointer rounded-[18px] border border-[#645CAA] px-8 py-2 text-[#1a1a1a] hover:opacity-80"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="cursor-pointer rounded-[18px] bg-[#D21312] px-8 py-2 text-white shadow-md hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </motion.div>
    </div>
  );
}
