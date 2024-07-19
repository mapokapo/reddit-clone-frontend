import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./components/theme-mode-provider";
import { routes } from "@/config/routes";
import { UserProvider } from "./components/user-provider";

const router = createBrowserRouter(routes);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeModeProvider
      defaultTheme="system"
      storageKey="vite-ui-theme">
      <UserProvider>
        <RouterProvider router={router} />
      </UserProvider>
    </ThemeModeProvider>
  </React.StrictMode>
);
