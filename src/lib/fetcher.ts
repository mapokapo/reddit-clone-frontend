import { Fetcher } from "swr";
import {
  errorResponseSchema,
  ErrorStatusCode,
  FetchException,
  HttpException,
} from "@/lib/errors";
import { z } from "zod";

export const fetcher = <
  TRequestBodySchema extends z.Schema,
  TResponseBodySchema extends z.Schema,
>(
  schemas: {
    requestBody?: TRequestBodySchema;
    responseBody?: TResponseBodySchema;
  },
  options: FetchRequestInit = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
): Fetcher<z.infer<TResponseBodySchema>, string> => {
  return async url => {
    let response: Response;
    try {
      response = await fetch(url, options);
    } catch (e) {
      console.error(e);

      throw new FetchException(`Network error. Error: ${e}`);
    }

    let json: any;
    try {
      json = await response.json();
    } catch (e) {
      console.error(e);

      throw new FetchException(`Failed to parse response body. Error: ${e}`);
    }

    let body: TResponseBodySchema;
    if (schemas.responseBody) {
      const result = schemas.responseBody.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new FetchException(
          `Response data invalid. Reasons: ${result.error.errors.map(e => e.message).join(", ")}`
        );
      }

      body = result.data;
    } else {
      body = json;
    }

    if (!response.ok) {
      const result = errorResponseSchema.safeParse(json);

      if (!result.success) {
        console.error(result.error);

        throw new HttpException(
          result.error.errors.map(e => e.message),
          "Request failed. Failed to parse error response.",
          response.status as ErrorStatusCode
        );
      }

      const errorJson = result.data;

      throw new HttpException(
        errorJson.message,
        errorJson.error,
        response.status as ErrorStatusCode
      );
    }

    return body;
  };
};
