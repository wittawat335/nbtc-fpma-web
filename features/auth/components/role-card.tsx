"use client";
import { Shield } from "lucide-react";

type RoleCardProps = {
  displayRoles: string[];
};

export default function RoleCard({ displayRoles }: RoleCardProps) {
  return (
    <div className="rounded-2xl bg-white p-6 shadow-sm">
      <div className="mb-4 flex items-center gap-2 border-b border-gray-100 pb-3">
        <Shield className="text-indigo-500" size={20} />
        <h2 className="font-semibold text-gray-700">สิทธิ์การใช้งาน (Roles)</h2>
      </div>
      <div className="flex flex-wrap gap-2">
        {/* ใช้ displayRoles แทน user.roles โดยตรง */}
        {displayRoles.map((role, index) => (
          <span
            key={index}
            className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-600"
          >
            {role}
          </span>
        ))}
      </div>
    </div>
  );
}
