import { useFetch } from "./useGenericQuery";
import { Operator, User } from "@/types/User";

export const useOperators = () => {
  const operatorsQuery = useFetch<Operator[]>(
    "/user/operators",
    ["operators"]
  );

  return {
    ...operatorsQuery,
  };
};
