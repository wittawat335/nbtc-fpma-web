"use client";

import React, { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { Role } from "@/types/auth";
import {
  useReviews,
  useStatus,
  useSubmitReview,
  useComment,
} from "@/hooks/useProposals";
import { useOperators } from "@/hooks/useOperators";
import { useParams } from "next/navigation";
import RoleCard from "@/features/auth/components/role-card";
import PermissionsCard from "@/features/auth/components/permissions-card";
import TableReview from "@/features/review/TableReview";

export default function ReviewPage() {
  const { id } = useParams<{ id: string }>();
  const { user, logout, hasRole, isLoading } = useAuth();
  const { data: status } = useStatus();
  const canAssign = hasRole(Role.Director);
  const [selectedStatusId, setSelectedStatusId] = useState<number | null>(null);
  const [comment, setComment] = useState("");
  const submitReview = useSubmitReview();
  const { data: comments } = useComment(Number(id));

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
          <p className="text-gray-500">กำลังโหลดข้อมูล...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const { data: proposals } = useReviews(Number(user?.id));

  const displayRoles: string[] =
    Array.isArray(user?.roles) && user.roles.length > 0
      ? user.roles
      : user?.role
        ? [user.role]
        : ["General User"];

  const handleSaveReview = () => {
    if (selectedStatusId == null) return;
    submitReview.mutate(
      {
        id: Number(id),
        proposalStatusId: selectedStatusId,
        comment,
      },
      {
        onSuccess: () => {
          window.location.reload();
        },
      },
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        Role & Permissions Card
        <div className="grid gap-6 md:grid-cols-2">
          <RoleCard displayRoles={displayRoles} />
          <PermissionsCard canAssign={canAssign} />
        </div>
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            {" "}
            Review {id}
          </h3>
          <select
            className="form-control w-full rounded border p-2 text-sm"
            value={selectedStatusId ?? ""}
            onChange={(e) =>
              setSelectedStatusId(
                e.target.value ? Number(e.target.value) : null,
              )
            }
          >
            <option value="">เลือกสถานะ</option>

            {status?.map((s) => (
              <option key={s.itemId} value={s.itemId}>
                {s.nameStaff} (Step {s.proposalStepId})
              </option>
            ))}
          </select>
          <div>
            <label className="mt-4 mb-1 block text-sm font-medium">
              Comment
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full rounded border px-3 py-2"
              rows={4}
            />
          </div>

          <button
            className={`mt-4 rounded px-4 py-2 font-bold ${
              selectedStatusId
                ? "border-blue-500 bg-blue-500 text-white hover:bg-blue-700"
                : "border-gray-200 bg-gray-200"
            }`}
            disabled={selectedStatusId === null || submitReview.isPending}
            onClick={handleSaveReview}
          >
            {submitReview.isPending ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-lg font-semibold text-gray-700">
            ประวัติความคิดเห็น (Comment History)
          </h3>

          <div className="overflow-x-auto max-[800px]:overflow-x-auto">
            <div className="min-w-[850px]">
              <TableReview items={comments} />
              {/* <table className="min-w-full border border-gray-200 text-sm">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="p-3 text-left">วันที่</th>
                  <th className="p-3 text-left">สถานะ</th>
                  <th className="p-3 text-left">ความคิดเห็น</th>
                </tr>
              </thead>

              <tbody>
                {comments && comments.length > 0 ? (
                  comments.map((c) => (
                    <tr key={c.itemId} className="border-t">
                      <td className="p-3 text-gray-600">
                        {new Date(c.itemCreatedWhen).toLocaleString()}
                      </td>

                      <td className="p-3 font-medium text-indigo-600">
                        {c.proposalStatusId}
                      </td>

                      <td className="p-3 whitespace-pre-wrap text-gray-700">
                        {c.message}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-4 text-center text-gray-400">
                      ยังไม่มีความคิดเห็น
                    </td>
                  </tr>
                )}
              </tbody>
            </table> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
