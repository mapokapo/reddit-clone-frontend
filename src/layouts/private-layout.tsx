import Loading from "@/components/loading";
import Navbar from "@/components/navbar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/user-provider";
import { auth } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import { signOut } from "firebase/auth";
import { LogOut, X } from "lucide-react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { toast } from "sonner";

const PrivateLayout: React.FC = () => {
  const { user, profile, error } = useAuth();
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

  if (error !== null) {
    const [text, details] = mapErrorToMessage(error);
    toast.error(text, {
      description: details,
    });
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      {error !== null ? (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <X
            size={48}
            className="rounded-full bg-primary p-1 text-red-500"
          />
          <p className="mt-4 text-muted-foreground">
            An error occurred while fetching your profile.
          </p>
          <p className="text-muted-foreground">
            If the problem persists, try clearing site data or logging out.
          </p>
          <Button
            variant="destructive"
            className="mt-6 flex gap-2"
            onClick={() => {
              signOut(auth);
            }}>
            <LogOut size={24} />
            <span>Log out</span>
          </Button>
        </div>
      ) : profile === null ? (
        <div className="flex min-h-screen w-full flex-col items-center justify-center">
          <Loading />
          <span className="mt-4 text-muted-foreground">
            Fetching user profile...
          </span>
        </div>
      ) : (
        <>
          <Navbar />
          <Outlet />
        </>
      )}
    </div>
  );
};

export default PrivateLayout;
