import { Link } from "react-router-dom";
import { ThemeModeToggle } from "@/components/theme-mode-toggle";

const Navbar: React.FC = () => {
  return (
    <nav className="w-full border-b-2 border-b-border py-2">
      <div className="mx-8 flex h-full items-center justify-between">
        <Link
          to="/"
          className="text-foreground">
          <img
            src="/vite.svg"
            width="40"
            height="40"
            alt="Logo"
          />
        </Link>
        <ol className="flex items-center space-x-4">
          <ThemeModeToggle />
        </ol>
      </div>
    </nav>
  );
};

export default Navbar;
