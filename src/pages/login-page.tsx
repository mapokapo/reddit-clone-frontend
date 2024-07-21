import { UsersService } from "@/client/requests";
import LoginComponent from "@/components/login";
import { auth } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  User,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  // Used for OAuth sign in - no registration required
  const createUserProfile = async (user: User) => {
    const userExists = await UsersService.getMe();

    if (!userExists) {
      await UsersService.createUser({
        requestBody: {
          name: user.displayName ?? "User",
          photoUrl: user.photoURL ?? undefined,
        },
      });
    }
  };

  const onSubmit = (email: string, password: string) => {
    setLoading(true);

    signInWithEmailAndPassword(auth, email, password)
      .catch(error => {
        const [text, details] = mapErrorToMessage(error);
        setActionError(text);
        toast.error(text, {
          description: details,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const onSignInWithGoogle = () => {
    setLoading(true);

    signInWithPopup(auth, new GoogleAuthProvider())
      .then(async credential => {
        await createUserProfile(credential.user);

        toast.success("Successfully signed in with Google");

        setLoading(false);
      })
      .catch(error => {
        const [text, details] = mapErrorToMessage(error);
        setActionError(text);
        toast.error(text, {
          description: details,
        });

        setLoading(false);
      });
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
        isLoading={loading}
        actionError={actionError}
      />
    </div>
  );
};

export default LoginPage;
