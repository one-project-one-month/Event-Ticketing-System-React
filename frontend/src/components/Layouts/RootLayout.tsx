import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useQrUpload } from "@/components/QR/QrUploadContext";
import QRUpload from "@/components/QR/QrUpload";

function RootLayout() {
  const { isOpen, close } = useQrUpload();
  return (
    <>
      <div className="flex min-h-screen flex-col overflow-hidden">
        <Header />
        <main className="mt-16 flex-1">
          <Outlet />
        </main>
        <Footer />
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="relative">
            <button
              onClick={close}
              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 text-xl font-bold"
            >
              ✕
            </button>
            <QRUpload />
          </div>
        </div>
      )}
    </>
  );
}

export default RootLayout;
