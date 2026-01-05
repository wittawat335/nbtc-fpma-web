import { useFetch } from "@/hooks/useGenericQuery";
import { MasterOption } from "@/types";

export const useMasterData = (type: string) => {
  return useFetch<MasterOption[]>(
    `/masters/${type}`,
    ["master-data", type], // Query Key แยกตาม type เพื่อให้ caching ทำงานถูกต้อง
    {
      staleTime: 1000 * 60 * 60,
    },
  );
};
