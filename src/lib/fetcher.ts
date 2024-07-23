import { ApiError } from "@/client/requests";
import {
  errorResponseSchema,
  ErrorStatusCode,
  FetchException,
  HttpException,
} from "@/lib/errors";

export type MapFetchErrorsOptions<T> = {
  fetchFunction: () => Promise<T>;
  key: string | string[];
};

export const mapFetchErrors = async <T>({
  fetchFunction,
  key,
}: MapFetchErrorsOptions<T>): Promise<T> => {
  try {
    return await fetchFunction();
  } catch (e) {
    if (e instanceof ApiError) {
      const result = errorResponseSchema.safeParse(e.body);

      if (!result.success) {
        console.error(result.error);

        throw new HttpException("Failed to parse error response", {
          message: result.error.errors.map(e => e.message),
          statusCode: e.status as ErrorStatusCode,
          path: Array.isArray(key) ? key.join("/") : key,
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
};
