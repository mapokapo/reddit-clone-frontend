import { OpenAPI, User as UserProfile, UsersService } from "@/client/requests";
import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const UserContext = createContext<{
  user: User | null;
  profile: UserProfile | null;
  setProfile: (profile: UserProfile) => void;
}>({
  user: auth.currentUser,
  profile: null,
  setProfile: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async newUser => {
      setUser(newUser);

      OpenAPI.HEADERS = {
        Authorization: `Bearer ${await newUser?.getIdToken()}`,
      };

      if (newUser) {
        const userProfile = await UsersService.getMe();
        if (!userProfile) return;

        setProfile(userProfile);
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({ user, profile, setProfile }), [user, profile]);

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};

export const useUser = () => {
  const { user } = useAuth();

  if (user === null) {
    throw new Error("User is not authenticated");
  }

  return user;
};

export const useUserProfile = () => {
  const { user, profile } = useAuth();

  if (user === null || profile === null) {
    throw new Error("User profile is not loaded");
  }

  return { user, profile };
};
