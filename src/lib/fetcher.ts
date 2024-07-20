import { ApiError, OpenAPIConfig } from "@/client/requests";
import { ApiRequestOptions } from "@/client/requests/core/ApiRequestOptions";
import {
  errorResponseSchema,
  ErrorStatusCode,
  FetchException,
  HttpException,
} from "@/lib/errors";
import { QueryFunction } from "@tanstack/react-query";

export type FetcherOptions<ResBody> = {
  fetchFunction: (
    config?: OpenAPIConfig,
    options?: ApiRequestOptions
  ) => Promise<ResBody>;
  config?: OpenAPIConfig;
  options?: ApiRequestOptions;
};

/**
 * A React-Query-specific utility type-safe fetch wrapper function for the OpenAPI client SDK made using @7nohe/openapi-react-query-codegen.
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
 * @param options.config OpenAPI configuration.
 * @param options.options Fetch options.
 *
 * @returns A fetch function that can be used with SWR.
 */
export const fetcher = <ResBody>({
  fetchFunction,
  config,
  options,
}: FetcherOptions<ResBody>): QueryFunction<ResBody> => {
  return async context => {
    let data: any;
    try {
      data = await fetchFunction(config, options);
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

        throw new HttpException("Request failed", errorJson);
      }

      throw new FetchException("Network unavailable", `${e}`);
    }

    return data;
  };
};
