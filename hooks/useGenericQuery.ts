import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import { apiService } from "@/services/api-service";

export const useFetch = <TQueryFnData, TError = unknown>(
  url: string,
  key: string[],
  options?: Omit<UseQueryOptions<TQueryFnData, TError>, "queryKey" | "queryFn">,
) => {
  return useQuery<TQueryFnData, TError>({
    queryKey: key,
    queryFn: () => apiService.get<TQueryFnData>(url),
    ...options,
  });
};
