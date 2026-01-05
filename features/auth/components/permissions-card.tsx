"use client";
import { CheckCircle } from "lucide-react";

type PermissionsCardProps = {
  canAssign: boolean;
};

export default function PermissionsCard({ canAssign }: PermissionsCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <CheckCircle className="text-green-500" size={20} />
        <h2 className="font-semibold text-gray-700">ทดสอบระบบ Permission</h2>
      </div>

      <div className="space-y-3">
        <div className="flex items-center justify-between rounded-lg border border-gray-100 p-3">
          <span className="text-sm text-gray-600">Director Access</span>
          {/* ลองเช็ค Role ที่คุณมีจริงๆ เช่น "Director" */}
          {canAssign ? (
            <span className="text-xs font-bold text-green-600">
              อนุญาต (Allow)
            </span>
          ) : (
            <span className="text-xs font-bold text-red-500">
              ไม่อนุญาต (Deny)
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
