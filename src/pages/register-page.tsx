import { useState } from "react";
import RegisterComponent from "@/components/register";
import { createUserWithEmailAndPassword, deleteUser } from "firebase/auth";
import { auth, storage } from "@/lib/firebase";
import mapErrorToMessage from "@/lib/mapError";
import { toast } from "sonner";
import { UsersService } from "@/client/requests";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAuth } from "@/components/user-provider";

const RegisterPage: React.FC = () => {
  const { setProfile } = useAuth();
  const [actionError, setActionError] = useState<string | null>(null);

  const onSubmit = async ({
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
    try {
      const credential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

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

      try {
        const profile = await UsersService.createUser({
          requestBody: {
            name,
            photoUrl,
          },
        });

        setProfile(profile);

        toast.success("Successfully registered", {
          description: "Now you can sign in",
        });
      } catch (e) {
        if (auth.currentUser) await deleteUser(auth.currentUser);

        throw e;
      }
    } catch (error) {
      const [text, details] = mapErrorToMessage(error);
      setActionError(text);
      toast.error(text, {
        description: details,
      });
    }
  };

  return (
    <div className="m-auto aspect-video w-1/3 min-w-96">
      <RegisterComponent
        onSubmit={values => {
          onSubmit(values);
        }}
        actionError={actionError}
      />
    </div>
  );
};

export default RegisterPage;
