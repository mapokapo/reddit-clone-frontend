import { auth } from "@/lib/firebase";
import { onAuthStateChanged, User } from "firebase/auth";
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";

export const UserContext = createContext<User | null>(auth.currentUser);

export const UserProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<User | null>(auth.currentUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, newUser => {
      setUser(newUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(UserContext);

  if (context === undefined)
    throw new Error("useUser must be used within a UserProvider");

  return context;
};

export const useUser = () => {
  const user = useAuth();

  if (user === null) {
    throw new Error("User is not authenticated");
  }

  return user;
};
