import { FetchException, HttpException } from "@/lib/errors";

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
    filter: (e: unknown): e is Error => e instanceof Error,
    map: (e: Error) => [e.message, null],
  },
  {
    filter: (e: unknown): e is string => typeof e === "string",
    map: (e: string) => [e, null],
  },
];

const mapErrorToMessage = (e: unknown) => {
  const transformer = errorTransformers.find(t => t.filter(e));
  return transformer ? transformer.map(e) : "An unexpected error occurred";
};

export default mapErrorToMessage;
