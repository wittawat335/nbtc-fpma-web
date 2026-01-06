"use client";

import Navbar from "@/components/layout/navbar";
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
      <div className="mx-auto max-w-7xl px-4 py-3">
        <div className="flex flex-wrap items-center">
          <div className="w-full px-2 md:w-1/3 lg:w-auto">
            <div className="flex items-center justify-center">
              <a href="/?lang=en-US">
                <img
                  src="/logo_NBTC.png"
                  className="h-[88px] w-auto"
                  alt="NBTC"
                />
              </a>
              <div className="mx-3 h-[60px] border-l border-gray-300"></div>
              <a href="/?lang=en-US">
                <img
                  src="/Logo_FPMA.webp"
                  className="h-[88px] w-auto"
                  alt="FPMA"
                />
              </a>
            </div>
          </div>
          <div className="w-full text-center md:w-2/3 md:text-right lg:w-auto lg:text-left">
            <h1 className="text-2xl leading-tight font-semibold text-[#0082bf]">
              ระบบจัดการโครงการกองทุนวิจัยและพัฒนาฯ{" "}
              <span className="hidden sm:inline">สำนักงาน กสทช.</span>
            </h1>
          </div>
          <div className="ml-auto w-full lg:w-auto">
            <div className="flex items-center justify-center">
              <UserMenu />
            </div>
          </div>
        </div>
      </div>
      <div className="TopMenu">
        <Navbar />
      </div>
    </header>
  );
}
