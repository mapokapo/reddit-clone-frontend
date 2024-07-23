import { Link } from "react-router-dom";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";
import Profile from "@/components/profile";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b-2 border-b-border py-2">
      <div className="mx-8 flex h-full items-center justify-between">
        <Link
          to="/"
          className="text-foreground">
          <img
            src="/reddit_clone_logo.png"
            width="40"
            height="40"
            alt="Logo"
          />
        </Link>
        <ol className="flex items-center space-x-4">
          <Link to="/app/create-post">
            <Button
              variant="ghost"
              className="flex gap-1 px-2 pr-3">
              <Plus size={24} />
              <span>Create</span>
            </Button>
          </Link>
          <ThemeModeToggle />
          <Profile />
        </ol>
      </div>
    </nav>
  );
};

export default Navbar;
