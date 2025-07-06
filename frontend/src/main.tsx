import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QrUploadProvider } from "@/components/QR/QrUploadContext";
import "./index.css";
import { router } from "./routes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QrUploadProvider>
      <RouterProvider router={router} />
    </QrUploadProvider>
  </StrictMode>,
);
