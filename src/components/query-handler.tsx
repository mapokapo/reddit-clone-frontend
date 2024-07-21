import mapErrorToMessage from "@/lib/mapError";
import { UseQueryResult } from "@tanstack/react-query";
import React from "react";
import { toast } from "sonner";

type QueryHandlerProps<TData = any, TError = any> = {
  query: UseQueryResult<TData, TError>;
  loading?: React.ReactNode;
  error?: (error: TError) => React.ReactNode;
  success: (data: TData) => React.ReactNode;
  showToastOnError?: boolean;
};

function QueryHandler<TData, TError>({
  query,
  loading,
  error,
  success,
  showToastOnError = true,
}: QueryHandlerProps<TData, TError>) {
  if (query.isLoading) {
    return loading ?? null;
  }

  if (query.isError) {
    if (showToastOnError) {
      const [text, details] = mapErrorToMessage(query.error);
      toast.error(text, {
        description: details,
      });
    }

    return error ? error(query.error) : null;
  }

  if (query.isSuccess) {
    return success(query.data!);
  }

  return null;
}

export default QueryHandler;
