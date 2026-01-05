"use client";

import dynamic from "next/dynamic";
const UserMenu = dynamic(() => import("./user-menu"), {
  ssr: false,
  loading: () => (
    <button className="rounded-full border border-blue-200 px-4 py-1.5 text-sm font-medium text-blue-600 opacity-50">
      กำลังโหลด...
    </button>
  ),
});

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-4">
          <h1 className="text-sm font-semibold text-gray-700 md:text-base">
            ระบบจัดการโครงการกองทุนวิจัยและพัฒนาฯ{" "}
            <span className="hidden text-blue-600 sm:inline">
              สำนักงาน กสทช.
            </span>
          </h1>
        </div>

        <div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
}
