import { useState } from "react";
import RegisterComponent from "@/components/register";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";

const RegisterPage: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const onSubmit = (email: string, password: string) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
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
      <RegisterComponent
        onSubmit={values => {
          onSubmit(values.email, values.password);
        }}
        isLoading={loading}
        actionError={actionError}
      />
    </div>
  );
};

export default RegisterPage;
