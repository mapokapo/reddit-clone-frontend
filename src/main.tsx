import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./components/theme-mode-provider";
import { routes } from "@/config/routes";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeModeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeModeProvider>
  </React.StrictMode>
);
