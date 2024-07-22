import Sidebar from "@/components/sidebar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
