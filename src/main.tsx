import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeModeProvider } from "./components/theme-mode-provider";
import { routes } from "@/config/routes";
import { UserProvider } from "./components/user-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const router = createBrowserRouter(routes);

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeModeProvider
        defaultTheme="system"
        storageKey="vite-ui-theme">
        <UserProvider>
          <RouterProvider router={router} />
        </UserProvider>
      </ThemeModeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
