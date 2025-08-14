import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import { router as userRouter } from "./User/routes";
import { adminRouter } from "./Admin/Routes/AdminRoutes";
import { ThemeProvider } from "@/User/components/theme-provider";

const isAdminPath = window.location.pathname.startsWith("/admin");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={isAdminPath ? adminRouter : userRouter} />
    </ThemeProvider>
  </StrictMode>,
);
