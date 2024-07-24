import Loading from "@/components/loading";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/lib/firebase";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const RootLayout: React.FC = () => {
  const [authLoaded, setAuthLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => {
      setAuthLoaded(true);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="flex min-h-screen w-full flex-col">
      {authLoaded ? (
        <Outlet />
      ) : (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Loading />
          <span className="mt-4 text-muted-foreground">
            Reading authentication state...
          </span>
        </div>
      )}
      <Toaster />
    </div>
  );
};

export default RootLayout;
