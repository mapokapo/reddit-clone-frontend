import { useState } from "react";
import RegisterComponent from "@/components/register";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, storage } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";
import { UsersService, CreateUserRequest } from "@/client/requests";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "@/components/user-provider";

const RegisterPage: React.FC = () => {
  const { setProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const createUserProfile = async ({ name, photoUrl }: CreateUserRequest) => {
    return await UsersService.createUser({
      requestBody: {
        name,
        photoUrl,
      },
    });
  };

  const onSubmit = ({
    name,
    email,
    password,
    photoFile,
  }: {
    name: string;
    email: string;
    password: string;
    photoFile?: File;
  }) => {
    setLoading(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then(async credential => {
        let photoUrl: string | undefined;
        if (photoFile) {
          const photoRef = ref(
            storage,
            `users/${credential.user.uid}/profile.${photoFile.name.split(".").pop()}`
          );

          const res = await uploadBytes(photoRef, photoFile);
          const url = await getDownloadURL(res.ref);

          photoUrl = url;
        }

        const profile = await createUserProfile({ name, photoUrl });

        setProfile(profile);

        toast.success("Successfully registered", {
          description: "Now you can sign in",
        });

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
      <RegisterComponent
        onSubmit={values => {
          onSubmit(values);
        }}
        isLoading={loading}
        actionError={actionError}
      />
    </div>
  );
};

export default RegisterPage;
