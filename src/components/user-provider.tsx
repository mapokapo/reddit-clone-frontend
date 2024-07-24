import { OpenAPI, User as UserProfile, UsersService } from "@/client/requests";
import { mapFetchErrors } from "@/lib/fetcher";
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
  error: unknown | null;
  setProfile: (profile: UserProfile) => void;
}>({
  user: auth.currentUser,
  profile: null,
  error: null,
  setProfile: () => {},
});

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async newUser => {
      setUser(newUser);

      OpenAPI.HEADERS = {
        Authorization: `Bearer ${await newUser?.getIdToken()}`,
      };

      if (newUser) {
        try {
          const userProfile = await mapFetchErrors({
            fetchFunction: async () => await UsersService.getMe(),
            key: "/users/me",
          });
          if (!userProfile) throw new Error("User profile not found");

          setProfile(userProfile);
        } catch (e) {
          setError(e);
        }
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => ({ user, profile, error, setProfile }),
    [user, profile, error]
  );

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
