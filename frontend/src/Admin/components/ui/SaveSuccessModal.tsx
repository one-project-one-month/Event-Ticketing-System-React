import { Dialog } from "@headlessui/react";
import { X } from "lucide-react";

interface SaveSuccessModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void; 
}

export default function SaveSuccessModal({ open, onClose, onConfirm }: SaveSuccessModalProps) {
  return (
    <Dialog open={open} onClose={onClose} className="fixed z-50 inset-0 flex items-center justify-center bg-black/40">
      <Dialog.Panel className="relative bg-white rounded-xl p-8 w-full max-w-sm text-center shadow-xl">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
        >
          <X className="w-5 h-5" />
        </button>

        <img
          src="/icons/SaveSuccess.svg"
          alt="Success"
          className="h-28 w-28 mx-auto mb-6"
        />

        <Dialog.Title className="text-xl font-semibold text-[#233b75] mb-4">
          Save Successful!
        </Dialog.Title>

        <button
          onClick={onConfirm} // ✅ use onConfirm instead of hardcoded navigate
          className="bg-[#233b75] hover:bg-[#1b2e5f] text-white text-sm px-6 py-2 rounded-md transition"
        >
          Okay
        </button>
      </Dialog.Panel>
    </Dialog>
  );
}
