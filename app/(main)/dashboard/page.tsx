"use client";

import React from "react";
import { useAuth } from "@/hooks/useAuth";

import { Role } from "@/types/auth";
import {
  useProposals,
  useProposalAssistants,
  useAssignOperators,
  useReviews,
} from "@/hooks/useProposals";
import { useOperators } from "@/hooks/useOperators";
import Link from "next/link";
import { useState } from "react";
import TableUser from "@/features/dashboard/TableUser";
import { useRouter } from "next/navigation";
import RoleCard from "@/features/auth/components/role-card";
import PermissionsCard from "@/features/auth/components/permissions-card";
import TableOperator from "@/features/dashboard/TableOperator";

export default function DashboardPage() {
  const { user, logout, hasRole, isLoading } = useAuth();
  //const { user, logout, hasRole } = useAuth();
  const { data: proposals } = useProposals();
  const { data: proposalAssistants } = useProposalAssistants();
  const { data: operators } = useOperators();
  const { data: reviewProposals } = useReviews(Number(user?.id));
  const router = useRouter();

  const [isAssignOpen, setIsAssignOpen] = React.useState(false);
  const [currentProposalId, setCurrentProposalId] = useState<number | null>(
    null,
  );
  const [selectedOperators, setSelectedOperators] = React.useState<number[]>(
    [],
  );

  const PAGE_SIZE = 10;
  const [page, setPage] = React.useState(1);

  const total = proposals?.length ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const pagedProposals = (proposals ?? []).slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  React.useEffect(() => {
    // กันกรณีข้อมูลเปลี่ยนแล้วหน้าปัจจุบันเกิน
    if (page > totalPages) setPage(totalPages);
  }, [page, totalPages]);

  const assignOperators = useAssignOperators();

  const canAssign = hasRole(Role.Director);
  const isOperator = hasRole(Role.Operator);
  const isUser = hasRole(Role.User);
  const handleSaveAssign = () => {
    if (currentProposalId == null) return;

    assignOperators.mutate(
      {
        id: currentProposalId,
        operatorIds: selectedOperators,
      },
      {
        onSuccess: () => {
          setIsAssignOpen(false);
          window.location.reload();
        },
      },
    );
  };

  const setAssign = (itemId: number) => {
    const pid = Number(itemId);
    if (!Number.isFinite(pid)) {
      console.error("Invalid itemId:", itemId);
      return;
    }

    const assistants =
      proposalAssistants?.filter((a) => Number(a.proposalId) === pid) ?? [];

    setCurrentProposalId(pid);
    setSelectedOperators(assistants.map((a) => a.userId));
    setIsAssignOpen(true);
  };

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

  const displayRoles: string[] =
    Array.isArray(user?.roles) && user.roles.length > 0
      ? user.roles
      : user?.role
        ? [user.role]
        : ["General User"];

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        Role & Permissions Card
        <div className="grid gap-6 md:grid-cols-2">
          <RoleCard displayRoles={displayRoles} />
          <PermissionsCard canAssign={canAssign} />
        </div>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="mb-4 text-lg font-semibold text-gray-700">
              ตารางงาน (Task Management)
            </h2>
            <div className="mb-4">
              <button
                onClick={() => router.push("/project-type-1/proposal")}
                className="rounded-xl bg-gradient-to-r from-sky-400 via-blue-500 to-indigo-500 px-5 py-2.5 text-base font-semibold text-white shadow-md shadow-blue-300/40 transition-all duration-300 hover:from-sky-500 hover:via-blue-600 hover:to-indigo-600 hover:shadow-lg hover:shadow-blue-400/50 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none active:scale-95"
              >
                สร้างแบบฟอร์มใหม่
              </button>
            </div>
          </div>

          <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
            {!isUser && (
              <div className="overflow-x-auto max-[800px]:overflow-x-auto">
                <div className="min-w-[850px]">
                  <TableOperator
                    items={proposals}
                    setAssign={setAssign}
                    isOperator={isOperator}
                    canAssign={canAssign}
                  />
                </div>
              </div>
            )}

            {/* {!isUser && (
              <div>
                <table className="min-w-full text-sm text-gray-700">
                  <thead>
                    <tr className="border-b border-gray-200 bg-gray-50 text-left text-xs font-semibold tracking-wide text-gray-600 uppercase">
                      <th className="px-4 py-3">ชื่องาน</th>
                      <th className="px-4 py-3">สถานะ</th>
                      <th className="px-4 py-3">Link</th>
                      {isOperator && <th className="px-4 py-3">Review</th>}
                      {!isOperator && <th className="px-4 py-3">Operator</th>}
                      {canAssign && <th className="px-4 py-3">Assign</th>}
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-100">
                    {canAssign &&
                      pagedProposals.map((proposal) => (
                        <tr
                          key={proposal.itemId}
                          className="transition-colors hover:bg-gray-50"
                        >
                          
                          <td className="px-4 py-3 font-normal text-gray-600">
                            {proposal.name}
                          </td>

                         
                          <td className="px-4 py-3">
                            <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                              {proposal.proposalStatusId}
                            </span>
                          </td>

                         
                          <td className="px-4 py-3">
                            <Link
                              href={`/project-type-1/proposal?id=${proposal.itemId}`}
                              className="inline-flex items-center rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                              title="ดูรายละเอียด"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                          </td>

                          
                          <td className="px-4 py-3">
                            {(() => {
                              const pid = Number(proposal.itemId);
                              const assistants =
                                proposalAssistants?.filter(
                                  (a) => Number(a.proposalId) === pid,
                                ) ?? [];

                              if (assistants.length === 0) {
                                return (
                                  <span className="text-[10px] text-gray-400 italic">
                                    ยังไม่ assign
                                  </span>
                                );
                              }

                              const mapped = assistants.map((a) => {
                                const op = operators?.find(
                                  (o) => o.userId === a.userId,
                                );
                                return op?.username ?? `#${a.userId}`;
                              });

                              const visible = mapped.slice(0, 3);
                              const more = mapped.length - visible.length;

                              return (
                                <div className="items-center gap-1.5">
                                  {visible.map((name, idx) => (
                                    <span
                                      key={idx}
                                      className="rounded-full bg-gray-100 px-2.5 py-1 text-[10px] text-gray-700"
                                    >
                                      {name}
                                    </span>
                                  ))}

                                  {more > 0 && (
                                    <span className="rounded-full bg-gray-200 px-2.5 py-1 text-[10px] text-gray-600">
                                      +{more}
                                    </span>
                                  )}
                                </div>
                              );
                            })()}
                          </td>

                        
                          {canAssign && (
                            <td className="px-4 py-3">
                              <button
                                type="button"
                                onClick={()=>setAssign(proposal.itemId)}
                                className="relative inline-flex items-center justify-center rounded-lg border border-gray-300 bg-white p-2 text-indigo-700 shadow-sm hover:bg-gray-50"
                              >
                                Assign
                                <span className="ml-2 rounded-full bg-indigo-50 px-2 text-[10px] font-bold">
                                  {proposalAssistants?.filter(
                                    (a) =>
                                      Number(a.proposalId) ===
                                      Number(proposal.itemId),
                                  ).length || 0}
                                </span>
                              </button>
                            </td>
                          )}
                        </tr>
                      ))}

                    {isOperator &&
                      reviewProposals?.map((proposal) => (
                        <tr
                          key={proposal.itemId}
                          className="transition-colors hover:bg-gray-50"
                        >
                          <td className="px-4 py-3 font-normal text-gray-600">
                            {proposal.name}
                          </td>

                          <td className="px-4 py-3">
                            <span className="inline-flex rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700">
                              {proposal.proposalStatusId}
                            </span>
                          </td>

                          <td className="px-4 py-3">
                            <Link
                              href={`/project-type-1/proposal?id=${proposal.itemId}`}
                              className="inline-flex items-center rounded-lg p-2 text-indigo-600 hover:bg-indigo-50 hover:text-indigo-800"
                              title="ดูรายละเอียด"
                            >
                              <Eye className="h-5 w-5" />
                            </Link>
                          </td>

                          <td className="px-4 py-3">
                            <Link
                              href={`/review/${proposal.itemId}`}
                              className="font-medium text-green-600 hover:text-green-800"
                            >
                              Review
                            </Link>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
                <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3">
                  <p className="text-xs text-gray-500">
                    แสดง {(page - 1) * PAGE_SIZE + 1}-
                    {Math.min(page * PAGE_SIZE, total)} จาก {total} รายการ
                  </p>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ก่อนหน้า
                    </button>

                    <span className="text-xs text-gray-700">
                      หน้า {page} / {totalPages}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setPage((p) => Math.min(totalPages, p + 1))
                      }
                      disabled={page === totalPages}
                      className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs text-gray-700 shadow-sm hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                      ถัดไป
                    </button>
                  </div>
                </div>
              </div>
            )} */}

            {isAssignOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
                <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-lg">
                  <h3 className="mb-4 text-lg font-semibold text-gray-700">
                    Assign Operator
                  </h3>

                  <div className="max-h-64 space-y-2 overflow-y-auto">
                    {operators?.map((op) => {
                      const active = selectedOperators.includes(op.userId);

                      return (
                        <button
                          key={op.userId}
                          type="button"
                          onClick={() => {
                            setSelectedOperators(
                              (prev) =>
                                active
                                  ? prev.filter((id) => id !== op.userId) // remove
                                  : [...prev, op.userId], // add
                            );
                          }}
                          className={`flex w-full items-center justify-between rounded-lg border px-4 py-2 text-sm transition ${
                            active
                              ? "border-indigo-500 bg-indigo-50 text-indigo-700"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          <span>{op.username}</span>
                          {active && (
                            <span className="text-xs font-semibold text-indigo-600">
                              เพิ่มแล้ว
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-6 flex justify-end gap-2">
                    <button
                      onClick={() => setIsAssignOpen(false)}
                      className="rounded-lg px-4 py-2 text-sm text-gray-600 hover:bg-gray-100"
                    >
                      ยกเลิก
                    </button>

                    <button
                      onClick={handleSaveAssign}
                      disabled={assignOperators.isPending}
                      className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700 disabled:opacity-50"
                    >
                      {assignOperators.isPending ? "กำลังบันทึก..." : "บันทึก"}
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isUser && <TableUser />}
          </div>
        </div>
      </div>
    </div>
  );
}
