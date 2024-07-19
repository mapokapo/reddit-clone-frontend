import { z } from "zod";

/**
 * This exception is thrown when the fetch request fails. Examples include network issues, CORS violations, server timeouts, and incorrect response bodies.
 */
export class FetchException extends Error {
  public message: string;

  constructor(
    public label: string,
    message: string | string[]
  ) {
    const formattedMessage = Array.isArray(message)
      ? message.join(", ")
      : message;

    super(formattedMessage);

    this.message = formattedMessage;
    this.name = "FetchException";
  }
}

/**
 * This exception is thrown when the server responds with an HTTP error status code such as 404 or 500.
 *
 * This exception is extracted from the data contained within the {@link ErrorResponse} object.
 */
export class HttpException extends Error {
  public message: string;
  public timestamp: Date;

  constructor(
    public label: string,
    message: string | string[],
    public statusCode: ErrorStatusCode,
    public path: string,
    timestamp: string | Date
  ) {
    const formattedMessage = Array.isArray(message)
      ? message.join(", ")
      : message;

    super(formattedMessage);

    this.message = formattedMessage;
    this.timestamp =
      timestamp instanceof Date ? timestamp : new Date(timestamp);
    this.name = "HttpException";
  }
}

export type StatusCode = 200 | 201 | 400 | 401 | 403 | 404 | 500;
export type ErrorStatusCode = 400 | 401 | 403 | 404 | 500;

/**
 * This is the JSON body which the server responds with when an expected error occurs.
 */
export interface ErrorResponse {
  statusCode: ErrorStatusCode;
  timestamp: string;
  path: string;
  message: string | string[];
}

export const errorResponseSchema = z.object({
  statusCode: z
    .number()
    .int()
    .refine(value => {
      return [400, 401, 403, 404, 500].includes(value);
    }),
  message: z.union([z.string(), z.array(z.string())]),
  timestamp: z.string(),
  path: z.string(),
});
