import { Fetcher } from "swr";
import {
  errorResponseSchema,
  ErrorStatusCode,
  FetchException,
  HttpException,
} from "@/lib/errors";
import { z } from "zod";

export type FetcherOptions<
  TResponseBodySchema extends z.Schema,
  TRequestBodySchema extends z.Schema,
> = {
  fetchFunction: (url: string, options: RequestInit) => Promise<Response>;
  schemas: {
    requestBody?: TRequestBodySchema;
    responseBody?: TResponseBodySchema;
  };
  fetchOptions: RequestInit;
};

/**
 * A SWR-specific utility type-safe fetch wrapper function.
 *
 * @example
 * ```tsx
 * const { data, error, isLoading } = useSWR("/posts", fetcher(
 *   {
 *     fetchFunction: fetch,
 *     schemas: {
 *       responseBody: z.array(
 *         z.object({
 *           id: z.number(),
 *           title: z.string(),
 *           body: z.string(),
 *         })
 *       ),
 *     },
 *     fetchOptions: {
 *       headers: {
 *         "Authorization": "Bearer <token>",
 *       },
 *     },
 *   }
 * ));
 * ```
 *
 * @param options Fetch wrapper options. You can either use a fetch function (along with options for the fetch function and Zod schemas for validation) or a data function which returns the data directly.
 * @param options.schemas Request and response Zod schemas for runtime validation and compile-type checking. Empty by default.
 * @param options.options Fetch request options. Empty by default.
 * @param options.fetchFunction Fetch function to use. Default is `fetch`.
 *
 * @returns A fetch function that can be used with SWR.
 */
export const fetcher = <
  TResponseBodySchema extends z.Schema,
  TRequestBodySchema extends z.Schema,
>(
  fetcherOptions: Partial<
    FetcherOptions<TResponseBodySchema, TRequestBodySchema>
  >
): Fetcher<z.infer<TResponseBodySchema>, string> => {
  const options: FetcherOptions<TResponseBodySchema, TRequestBodySchema> = {
    ...fetcherOptions,
    schemas: {},
    fetchOptions: {},
    fetchFunction: fetch.bind(window),
  };
  return async url => {
    let response: Response;
    try {
      response = await options.fetchFunction(url, options.fetchOptions);
    } catch (e) {
      console.error(e);

      throw new FetchException("Network unavailable", `${e}`);
    }

    let json: any;
    try {
      json = await response.json();
    } catch (e) {
      console.error(e);

      throw new FetchException("Failed to parse response body", `${e}`);
    }

    if (!response.ok) {
      const result = errorResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new HttpException(
          "Failed to parse error response",
          result.error.errors.map(e => e.message),
          response.status as ErrorStatusCode,
          url,
          new Date()
        );
      }

      const errorJson = result.data;

      throw new HttpException(
        "Request failed",
        errorJson.message,
        response.status as ErrorStatusCode,
        url,
        errorJson.timestamp
      );
    }

    let body: z.infer<TResponseBodySchema>;
    if (options.schemas.responseBody) {
      const result = options.schemas.responseBody.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new FetchException(
          "Response data invalid",
          `Reasons: ${result.error.errors.map(e => e.message).join(", ")}`
        );
      }

      body = result.data;
    } else {
      body = json;
    }

    return body;
  };
};
