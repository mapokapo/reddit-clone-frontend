import Navbar from "@/components/navbar";
import { useAuth } from "@/components/user-provider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PrivateLayout: React.FC = () => {
  const user = useAuth();
  const location = useLocation();

  if (user === null) {
    return (
      <Navigate
        to="/auth/login"
        state={{
          from: location.pathname,
        }}
      />
    );
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default PrivateLayout;