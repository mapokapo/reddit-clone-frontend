import { OpenAPIConfig } from "@/client/requests";
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
 * A SWR-specific utility type-safe fetch wrapper function.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading } = useSWR("/posts", fetcher(
 *   {
 *     fetchFunction: fetch,
 *     options: {
 *       headers: {
 *         "Authorization": "Bearer <token>",
 *       },
 *     },
 *   }
 * ));
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
      console.error(e);

      throw new FetchException("Network unavailable", `${e}`);
    }

    if ("statusCode" in data) {
      const result = errorResponseSchema.safeParse(data);

      if (!result.success) {
        console.error(result.error);

        throw new HttpException(
          "Failed to parse error response",
          result.error.errors.map(e => e.message),
          data.statusCode as ErrorStatusCode,
          context.queryKey[0] as string,
          new Date()
        );
      }

      const errorJson = result.data;

      throw new HttpException(
        "Request failed",
        errorJson.message,
        data.statusCode as ErrorStatusCode,
        context.queryKey[0] as string,
        errorJson.timestamp
      );
    }

    return data;
  };
};
