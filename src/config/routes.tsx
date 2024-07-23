import AppLayout from "@/layouts/app-layout";
import PrivateLayout from "@/layouts/private-layout";
import PublicLayout from "@/layouts/public-layout";
import RootLayout from "@/layouts/root-layout";
import CreatePostPage from "@/pages/create-post-page";
import HomePage from "@/pages/home-page";
import LoginPage from "@/pages/login-page";
import ProfilePage from "@/pages/profile-page";
import RegisterPage from "@/pages/register-page";
import SettingsPage from "@/pages/settings-page";
import { Navigate, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/app",
        element: <PrivateLayout />,
        children: [
          {
            path: "/app",
            element: <AppLayout />,
            children: [
              {
                path: "/app/home",
                element: <HomePage />,
              },
              {
                path: "/app/settings",
                element: <SettingsPage />,
              },
              {
                path: "/app/profile",
                element: <ProfilePage />,
              },
              {
                path: "/app/create-post",
                element: <CreatePostPage />,
              },
            ],
          },
        ],
      },
      {
        path: "/auth",
        element: <PublicLayout />,
        children: [
          {
            path: "/auth/login",
            element: <LoginPage />,
          },
          {
            path: "/auth/register",
            element: <RegisterPage />,
          },
        ],
      },
      {
        path: "",
        element: <Navigate to="/app/home" />,
      },
    ],
  },
  {
    path: "/404",
    element: (
      <div className="flex min-h-screen w-full flex-col items-center justify-center">
        <h1 className="text-4xl font-bold">404</h1>
        <p className="text-lg">Page not found</p>
      </div>
    ),
  },
  {
    path: "*",
    element: (
      <Navigate
        to="/404"
        replace
      />
    ),
  },
];

export { routes };
