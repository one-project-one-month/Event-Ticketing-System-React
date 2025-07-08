import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { QrUploadProvider } from "@/components/QR/QrUploadContext";
import "./index.css";
import { router } from "./routes";
import { ThemeProvider } from "@/components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <QrUploadProvider>
        <RouterProvider router={router} />
      </QrUploadProvider>
    </ThemeProvider>
  </StrictMode>,
);
