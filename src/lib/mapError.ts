import { FetchException, HttpException } from "@/lib/errors";
import { FirebaseError } from "firebase/app";
import { AuthError } from "firebase/auth";
import { mapFirebaseAuthError } from "./firebase";
import { StorageError } from "firebase/storage";

type ErrorTransformer = {
  filter: (e: unknown) => boolean;
  map: (e: any) => [string, string | null];
};

const errorTransformers: ErrorTransformer[] = [
  {
    filter: (e): e is FetchException => e instanceof FetchException,
    map: (e: FetchException) => [`Connection error - ${e.label}`, e.message],
  },
  {
    filter: (e: unknown): e is HttpException => e instanceof HttpException,
    map: (e: HttpException) => [
      `HTTP ${e.statusCode} error - ${e.label}`,
      e.message,
    ],
  },
  {
    filter: (e: unknown): e is AuthError => {
      return e instanceof FirebaseError && e.code.startsWith("auth/");
    },
    map: (e: AuthError) => [mapFirebaseAuthError(e), null],
  },
  {
    filter: (e: unknown): e is StorageError => e instanceof StorageError,
    map: (e: StorageError) => [`File network error - ${e.code}`, e.message],
  },
  {
    filter: (e: unknown): e is Error => e instanceof Error,
    map: (e: Error) => [e.message, null],
  },
  {
    filter: (e: unknown): e is string => typeof e === "string",
    map: (e: string) => [e, null],
  },
];

const mapErrorToMessage = (e: unknown) => {
  console.error(e);

  const transformer = errorTransformers.find(t => t.filter(e));
  return transformer ? transformer.map(e) : "An unexpected error occurred";
};

export default mapErrorToMessage;
