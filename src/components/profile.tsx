import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserProfile } from "./user-provider";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";
import { LogOut, Settings, User } from "lucide-react";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useState } from "react";
import Loading from "./loading";
import { initials } from "@/lib/utils";

const Profile: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const { profile } = useUserProfile();

  const onLogOut = () => {
    setLoading(true);

    signOut(auth).then(() => {
      setLoading(false);
    });
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full">
          <Avatar>
            <AvatarImage
              src={profile.photoUrl}
              alt={profile.name}
            />
            <AvatarFallback>{initials(profile.name)}</AvatarFallback>
          </Avatar>
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        {loading ? (
          <Loading />
        ) : (
          <div className="flex w-full flex-col items-center justify-center gap-4 p-2">
            <Avatar className="h-24 w-24">
              <AvatarImage
                src={profile.photoUrl}
                alt={profile.name}
              />
              <AvatarFallback>{initials(profile.name)}</AvatarFallback>
            </Avatar>
            <span className="text-lg">{profile.name}</span>
            <Separator />
            <div className="flex w-full flex-col gap-2">
              <Link to="/app/profiles">
                <Button
                  variant="ghost"
                  className="flex w-full justify-start gap-2">
                  <User size={24} />
                  <span>Profile</span>
                </Button>
              </Link>
              <Link to="/app/settings">
                <Button
                  variant="ghost"
                  className="flex w-full justify-start gap-2">
                  <Settings size={24} />
                  <span>Settings</span>
                </Button>
              </Link>
              <Button
                variant="ghost"
                className="flex w-full justify-start gap-2"
                onClick={onLogOut}>
                <LogOut
                  size={24}
                  className="text-red-700"
                />
                <span className="text-red-700">Log out</span>
              </Button>
            </div>
          </div>
        )}
      </PopoverContent>
    </Popover>
  );
};

export default Profile;
