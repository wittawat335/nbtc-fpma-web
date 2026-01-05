import {
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from "@tanstack/react-query";
import { apiService } from "@/services/api-service";

type MutationMethod = "POST" | "PUT" | "DELETE";

export const useGenericMutation = <
  TData,
  TVariables = unknown,
  TError = unknown,
>(
  url: string,
  method: MutationMethod,
  options?: UseMutationOptions<TData, TError, TVariables> & {
    invalidateKeys?: string[][];
  },
) => {
  const queryClient = useQueryClient();

  return useMutation<TData, TError, TVariables>({
    mutationFn: async (variables) => {
      switch (method) {
        case "POST":
          return apiService.post<TData, TVariables>(url, variables);
        case "PUT":
          return apiService.put<TData, TVariables>(url, variables);
        case "DELETE":
          return apiService.delete<TData>(`${url}/${variables}`);
        default:
          throw new Error("Invalid Method");
      }
    },
    onSuccess: (data, variables, context) => {
      if (options?.invalidateKeys) {
        options.invalidateKeys.forEach((key) => {
          queryClient.invalidateQueries({ queryKey: key });
        });
      }
      // เรียก onSuccess เดิมที่ส่งเข้ามา (ถ้ามี)
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    ...options,
  });
};
