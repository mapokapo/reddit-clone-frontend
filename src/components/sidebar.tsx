import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Compass, Home } from "lucide-react";
import { cn } from "@/lib/utils";

const Sidebar: React.FC = () => {
  const { pathname: path } = useLocation();
  return (
    <aside className="flex min-h-full w-1/6 border-r border-r-border p-4">
      <nav className="h-full w-full">
        <ScrollArea>
          <ol className="flex w-full flex-col gap-2">
            <Link to="/app/home">
              <Button
                variant={path === "/app/home" ? "secondary" : "ghost"}
                className={cn(
                  "flex w-full items-center justify-start gap-2 text-base",
                  path === "/app/home" ? "font-normal" : ""
                )}>
                <Home />
                Home
              </Button>
            </Link>
            <Link to="/app/all">
              <Button
                variant={path === "/app/all" ? "secondary" : "ghost"}
                className={cn(
                  "flex w-full items-center justify-start gap-2 text-base",
                  path === "/app/all" ? "font-normal" : ""
                )}>
                <Compass />
                All
              </Button>
            </Link>
          </ol>
        </ScrollArea>
      </nav>
    </aside>
  );
};

export default Sidebar;
