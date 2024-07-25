import { UsersService } from "@/client/requests";
import LoginComponent from "@/components/login";
import { useAuth } from "@/components/user-provider";
import { mapFetchErrors } from "@/lib/fetcher";
import { auth } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import {
  deleteUser,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const { setProfile } = useAuth();
  const [actionError, setActionError] = useState<string | null>(null);

  // Used for OAuth sign in - no registration required
  const createUserProfile = async (user: User) => {
    const userExists = await UsersService.getMe();

    if (!userExists) {
      return await mapFetchErrors({
        fetchFunction: () =>
          UsersService.createUser({
            requestBody: {
              name: user.displayName ?? "User",
              photoUrl: user.photoURL ?? undefined,
            },
          }),
        key: "/users",
      });
    }

    return userExists;
  };

  const onSubmit = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      setActionError(details);
      toast.error(text, {
        description: details,
      });
    }
  };

  const onSignInWithGoogle = async () => {
    try {
      const credential = await signInWithPopup(auth, new GoogleAuthProvider());
      try {
        const profile = await createUserProfile(credential.user);

        setProfile(profile);
      } catch (e) {
        if (auth.currentUser) await deleteUser(auth.currentUser);

        throw e;
      }

      toast.success("Successfully signed in with Google");
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      setActionError(details);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <div className="m-auto aspect-video w-1/3 min-w-96">
      <LoginComponent
        onSubmit={values => {
          onSubmit(values.email, values.password);
        }}
        onSignInWithGoogle={() => {
          onSignInWithGoogle();
        }}
        actionError={actionError}
      />
    </div>
  );
};

export default LoginPage;
