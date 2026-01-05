"use client";

import React, { Suspense } from "react";
import { useParams } from "next/navigation";
import ProposalFormContainer from "@/features/proposal/components/ProposalFormContainer";
import ProposalFormSkeleton from "@/features/proposal/components/ProposalFormSkeleton";

function EditContent() {
  const params = useParams();
  const proposalId = params?.id ? Number(params.id) : undefined;

  if (!proposalId || isNaN(proposalId)) {
    return null;
  }

  return <ProposalFormContainer proposalId={proposalId} />;
}

export default function EditProposalPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<ProposalFormSkeleton />}>
        <EditContent />
      </Suspense>
    </div>
  );
}
