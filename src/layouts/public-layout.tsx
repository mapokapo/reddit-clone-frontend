import { useAuth } from "@/components/user-provider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const PublicLayout: React.FC = () => {
  const user = useAuth();
  const location = useLocation();

  if (user !== null) {
    const previousLocation = location.state?.from;

    return <Navigate to={previousLocation ?? "/app/home"} />;
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <Outlet />
    </div>
  );
};

export default PublicLayout;
