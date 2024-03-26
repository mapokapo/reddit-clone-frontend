import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";

const AppLayout: React.FC = () => {
  return (
    <div className="flex h-full w-full flex-col">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AppLayout;
