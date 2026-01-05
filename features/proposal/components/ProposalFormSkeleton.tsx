import { Skeleton } from "@/components/ui";
import React from "react";

export default function ProposalFormSkeleton() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Header Banner */}
      <Skeleton className="h-24 w-full rounded-lg bg-blue-50/50" />

      {/* 1.1 ข้อมูลหน่วยงาน */}
      <div className="card rounded border border-gray-200 bg-white shadow-sm">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
           <Skeleton className="h-6 w-1/3 bg-gray-200 rounded" />
        </div>
        <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded bg-gray-100" />
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded bg-gray-100" />
          </div>
        </div>
      </div>

      {/* 1.2 ชื่อโครงการ */}
      <div className="card rounded border border-gray-200 bg-white shadow-sm">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
           <Skeleton className="h-6 w-1/3 bg-gray-200 rounded" />
        </div>
        <div className="p-4 space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-24 w-full rounded bg-gray-100" />
        </div>
      </div>

      {/* 1.3 & 1.4 งบประมาณและระยะเวลา */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card rounded border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <Skeleton className="h-6 w-1/2 bg-gray-200 rounded" />
          </div>
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded bg-gray-100" />
          </div>
        </div>
        <div className="card rounded border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
             <Skeleton className="h-6 w-1/2 bg-gray-200 rounded" />
          </div>
          <div className="p-4 space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-10 w-full rounded bg-gray-100" />
          </div>
        </div>
      </div>

      {/* 1.5 คุณสมบัติผู้ขอรับการส่งเสริม */}
      <div className="card rounded border border-gray-200 bg-white shadow-sm">
        <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
           <Skeleton className="h-6 w-1/2 bg-gray-200 rounded" />
        </div>
        <div className="p-4 space-y-3 pl-2">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="h-5 w-5 rounded-full bg-gray-200" />
              <Skeleton className="h-4 w-full max-w-2xl bg-gray-100" />
            </div>
          ))}
        </div>
      </div>

      {/* Person Forms (1.6 - 1.9) */}
      {[
        "1.6 ชื่อหัวหน้าโครงการ",
        "1.7 ชื่อผู้มีอำนาจกระทำการ",
        "1.8 ชื่อผู้รับมอบอำนาจ",
        "1.9 ผู้ประสานงาน",
      ].map((title, index) => (
        <div key={index} className="card rounded border border-gray-200 bg-white shadow-sm">
          <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
             <Skeleton className="h-6 w-1/3 bg-gray-200 rounded" />
          </div>
          
          <div className="p-4 space-y-4">
            {/* Name Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded bg-gray-100" />
               </div>
               <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded bg-gray-100" />
               </div>
               <div className="space-y-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-10 w-full rounded bg-gray-100" />
               </div>
            </div>

            {/* Contact Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
               <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded bg-gray-100" />
               </div>
               <div className="space-y-2">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-10 w-full rounded bg-gray-100" />
               </div>
               <div className="space-y-2">
                   <Skeleton className="h-4 w-24" />
                   <Skeleton className="h-10 w-full rounded bg-gray-100" />
               </div>
            </div>

            {/* Address Placeholder (Optional) */}
            <div className="mt-2 rounded border border-gray-100 bg-gray-50 p-4 space-y-4">
               <Skeleton className="h-5 w-48 bg-gray-200" />
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                 {[...Array(8)].map((_, j) => (
                    <div key={j} className="space-y-2">
                       <Skeleton className="h-3 w-16" />
                       <Skeleton className="h-10 w-full rounded bg-white border border-gray-100" />
                    </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      ))}

      {/* 1.10 & 1.11 Locations */}
      {["1.10 สถานที่ตั้งของโครงการ", "1.11 สถานที่ติดต่อ"].map((_, i) => (
        <div key={i} className="card rounded border border-gray-200 bg-white shadow-sm">
           <div className="bg-gray-50 px-4 py-2 border-b border-gray-100 flex justify-between items-center">
             <Skeleton className="h-6 w-1/3 bg-gray-200 rounded" />
             {i === 1 && <Skeleton className="h-5 w-40 bg-gray-200 rounded" />}
           </div>
           
           <div className="p-4 space-y-4">
             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[...Array(8)].map((_, j) => (
                  <div key={j} className="space-y-2">
                    <Skeleton className="h-3 w-20" />
                    <Skeleton className="h-10 w-full rounded bg-gray-100" />
                  </div>
                ))}
             </div>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[...Array(3)].map((_, k) => (
                   <div key={k} className="space-y-2">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-10 w-full rounded bg-gray-100" />
                   </div>
                ))}
             </div>
           </div>
        </div>
      ))}

      {/* 1.12 Tax Info */}
      <div className="card rounded border border-gray-200 bg-white shadow-sm">
         <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <Skeleton className="h-6 w-1/3 bg-gray-200 rounded" />
         </div>
         <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {[...Array(5)].map((_, j) => (
              <div key={j} className="space-y-2">
                 <Skeleton className="h-4 w-32" />
                 <Skeleton className="h-10 w-full rounded bg-gray-100" />
              </div>
            ))}
         </div>
      </div>

       {/* Part 2 Documents */}
       <div className="card rounded border border-gray-200 bg-white shadow-sm">
         <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <Skeleton className="h-6 w-1/2 bg-gray-200 rounded" />
         </div>
         <div className="p-4 space-y-6">
            <Skeleton className="h-20 w-full bg-blue-50/50 rounded-lg border border-blue-100" />
            <div className="space-y-4">
                {[...Array(5)].map((_, j) => (
                <div key={j} className="flex flex-col md:flex-row gap-4 border-b border-gray-100 pb-4 last:border-0">
                    <div className="w-full md:w-2/3 space-y-2">
                        <Skeleton className="h-5 w-3/4" />
                        <Skeleton className="h-3 w-1/2" />
                    </div>
                    <div className="flex gap-2 items-center w-full md:w-1/3 justify-end">
                        <Skeleton className="h-9 w-24 rounded bg-gray-200" />
                        <Skeleton className="h-9 w-24 rounded bg-gray-200" />
                    </div>
                </div>
                ))}
            </div>
         </div>
      </div>

       {/* Part 3 Certification */}
       <div className="card mt-8 rounded border border-gray-200 bg-white shadow-sm">
         <div className="bg-gray-50 px-4 py-2 border-b border-gray-100">
            <Skeleton className="h-6 w-2/3 bg-gray-200 rounded" />
         </div>
         <div className="p-6 space-y-4">
            <div className="space-y-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="space-y-2 pt-2">
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
            </div>
         </div>
      </div>

    </div>
  );
}