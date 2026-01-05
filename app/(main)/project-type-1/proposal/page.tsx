"use client";

import { Suspense } from "react";
import ProposalFormContainer from "@/features/proposal/components/ProposalFormContainer";
import ProposalFormSkeleton from "@/features/proposal/components/ProposalFormSkeleton";

export default function CreateProposalPage() {
  return (
    <div className="container mx-auto p-6">
      <Suspense fallback={<ProposalFormSkeleton />}>
        <ProposalFormContainer />
      </Suspense>
    </div>
  );
}
