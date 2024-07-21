import { ApiError } from "@/client/requests";
import {
  errorResponseSchema,
  ErrorStatusCode,
  FetchException,
  HttpException,
} from "@/lib/errors";
import { QueryFunction } from "@tanstack/react-query";

export type FetcherOptions<ResBody> = {
  fetchFunction: () => Promise<ResBody>;
};

/**
 * A React-Query-specific utility type-safe fetch wrapper function.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading } = useQuery({
 *   queryKey: {"/posts"},
 *   queryFn: fetcher(
 *     {
 *       fetchFunction: fetch,
 *       options: {
 *         headers: {
 *           "Authorization": "Bearer <token>",
 *         },
 *       },
 *     }
 *   ),
 * });
 * ```
 *
 * @param options Fetch wrapper options.
 * @param options.fetchFunction Fetch function to use. Default is `fetch`.
 *
 * @returns A fetch function that can be used with SWR.
 */
export const fetcher = <ResBody>({
  fetchFunction,
}: FetcherOptions<ResBody>): QueryFunction<ResBody> => {
  return async context => {
    let data: any;
    try {
      data = await fetchFunction();
    } catch (e) {
      if (e instanceof ApiError) {
        const result = errorResponseSchema.safeParse(e.body);

        if (!result.success) {
          console.error(result.error);

          throw new HttpException("Failed to parse error response", {
            message: result.error.errors.map(e => e.message),
            statusCode: e.status as ErrorStatusCode,
            path: context.queryKey[0] as string,
            timestamp: new Date().toString(),
          });
        }

        const errorJson = result.data;
        console.log("API Error", e.body);

        throw new HttpException("Server error", errorJson);
      } else if (e instanceof TypeError) {
        throw new FetchException("Request failed", `${e.message}`);
      }

      throw new FetchException("Network unavailable", `${e}`);
    }

    return data;
  };
};
