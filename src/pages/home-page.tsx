import Sidebar from "@/components/sidebar";
import Feed from "@/components/feed";

const HomePage: React.FC = () => {
  return (
    <div className="flex min-h-full flex-1">
      <Sidebar />
      <Feed />
    </div>
  );
};

export default HomePage;
