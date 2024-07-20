import LoginComponent from "@/components/login";
import { auth } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import {
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { toast } from "sonner";

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

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
