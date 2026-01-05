"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  // สร้าง QueryClient ภายใน component เพื่อป้องกันข้อมูลแชร์กันระหว่าง request (สำคัญมากใน SSR)
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // แนะนำให้ตั้งค่า staleTime เพื่อป้องกันการ fetch ซ้ำทันที (เช่น 1 นาที)
            staleTime: 60 * 1000,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* DevTools จะแสดงเฉพาะตอน Dev mode เท่านั้น */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
