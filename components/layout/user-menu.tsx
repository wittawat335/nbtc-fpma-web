"use client";

import { useAuth } from "@/hooks/useAuth";
import { LogOut, User, Loader2 } from "lucide-react";

export default function UserMenu() {
  const { user, logout, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <Loader2 className="animate-spin" size={18} />
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <div className="hidden text-right sm:block">
          <p className="text-sm font-bold text-gray-800">
            สวัสดี, {user.firstName || user.username}
          </p>
          <p className="text-xs text-gray-500">
            {user.role || "ผู้ใช้งานระบบ"}
          </p>
        </div>
        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-blue-600">
          <User size={20} />
        </div>
        <div className="mx-1 h-8 w-[1px] bg-gray-200"></div>
        <button
          onClick={logout}
          className="group flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-xs font-medium text-red-600 transition-colors hover:border-red-600 hover:bg-red-600 hover:text-white"
          title="ออกจากระบบ"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">ออก</span>
        </button>
      </div>
    );
  }

  return (
    <button className="rounded-full border border-blue-200 px-4 py-1.5 text-sm font-medium text-blue-600 transition-colors hover:bg-blue-50 hover:text-blue-800">
      ระบบยื่นขอรับทุน (เดิม)
    </button>
  );
}
