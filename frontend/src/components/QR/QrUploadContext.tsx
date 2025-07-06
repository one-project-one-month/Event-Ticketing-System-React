import { createContext, useContext, useState } from "react";

const QrUploadContext = createContext<{
  isOpen: boolean;
  open: () => void;
  close: () => void;
}>({
  isOpen: false,
  open: () => {},
  close: () => {},
});

export const useQrUpload = () => useContext(QrUploadContext);

export const QrUploadProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);

  return (
    <QrUploadContext.Provider value={{ isOpen, open, close }}>
      {children}
    </QrUploadContext.Provider>
  );
};