import { useState, useMemo, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { toast } from "sonner";

import { FormStatus } from "@/constants/form-status";
import { Msg } from "@/constants/message";
import { useProposalStore } from "@/lib";
import { useAuth } from "@/hooks/useAuth";
import { CreateProposalForm, CreateProposalSchema } from "../proposal.schema";
import { useProposalActions } from "./useProposalActions";
import { useProposalData } from "./useProposalData";

const STEP_FIELDS: Record<number, (keyof CreateProposalForm)[]> = {
  1: [
    "organizationName",
    "departmentName",
    "name",
    "budget",
    "duration",
    "organizationTypeId",
    "resposiiblePerson",
    "projectAddress",
    "contactAddress",
    "taxId",
    "taxBranchCode",
    "organizationStatusId",
    "vat",
    "withholdingTax",
  ],
  2: [
    "principlesOf",
    "objective",
    "scopeOfWork",
    "expectResult",
    "kpiOfSuccess",
    "technicalConcept",
    "stepOfWork",
    "risk",
    "placeOfWork",
    "sustain",
    "swotAnalysis",
  ],
  3: ["locations", "budget_01"],
};

export const useCreateProposal = (idProp?: number) => {
  const { currentStep, setStep, formData } = useProposalStore();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const proposalId = useMemo(() => idProp || null, [idProp]);

  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [pendingData, setPendingData] = useState<CreateProposalForm | null>(
    null,
  );

  const methods = useForm<CreateProposalForm>({
    resolver: zodResolver(CreateProposalSchema),
    defaultValues: formData,
    mode: "onChange",
    shouldUnregister: false,
  });

  const { isDataLoaded, initialData } = useProposalData(proposalId, methods);
  const { saveProposal } = useProposalActions();

  useEffect(() => {
    const stepFromUrl = searchParams.get("step");
    if (stepFromUrl) {
      const step = parseInt(stepFromUrl);
      if (!isNaN(step) && step >= 1 && step <= 3 && step !== currentStep) {
        setStep(step);
      }
    } else {
      if (currentStep !== 1) {
        setStep(1);
      }
    }
  }, [searchParams, setStep, currentStep]);

  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (currentStep === 1 && params.get("step") === "1") {
      params.delete("step");
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [currentStep, pathname, router, searchParams]);

  const handleBack = () => {
    const prevStep = currentStep - 1;
    if (prevStep >= 1) {
      const params = new URLSearchParams(searchParams.toString());

      if (prevStep === 1) {
        params.delete("step");
      } else {
        params.set("step", prevStep.toString());
      }

      router.push(`${pathname}?${params.toString()}`);
      window.scrollTo(0, 0);
    }
  };

  const handleSaveDraft = async () => {
    const data = methods.getValues();
    data.proposalStatusId = FormStatus.ProposalStep1.SAVE_DRAFT;

    const newId = await saveProposal(
      data,
      proposalId,
      user?.id,
      false,
      "กำลังบันทึกแบบร่าง...",
    );

    if (!proposalId && newId) {
      const query = currentStep === 1 ? "" : `?step=${currentStep}`;
      router.push(`/project-type-1/${newId}${query}`);
      toast.success(Msg.alert.savedSuccess);
    } else {
      toast.success(Msg.alert.savedSuccess);
    }
  };

  const handleNext = async () => {
    const fieldsToValidate = STEP_FIELDS[currentStep] || [];
    if (fieldsToValidate.length > 0) {
      const isValid = await methods.trigger(fieldsToValidate, {
        shouldFocus: true,
      });
      if (!isValid) {
        toast.error(Msg.error.validationFailed);
        return;
      }
    }

    const data = methods.getValues();
    data.proposalStatusId = FormStatus.ProposalStep1.SAVE_DRAFT;

    try {
      const savedId = await saveProposal(
        data,
        proposalId,
        user?.id,
        true,
        "กำลังบันทึกและดำเนินการต่อ...",
      );

      if (savedId) {
        const nextStep = currentStep + 1;

        const params = new URLSearchParams(searchParams.toString());
        params.set("step", nextStep.toString());

        const path = proposalId ? pathname : `/project-type-1/${savedId}`;

        router.push(`${path}?${params.toString()}`);
        window.scrollTo(0, 0);
      }
    } catch (e) {
      // Error handled in saveProposal
    }
  };

  const onSubmitForm = (data: CreateProposalForm) => {
    setPendingData(data);
    setShowConfirmModal(true);
  };

  const onValidationErr = (errors: any) => {
    console.error("Validation Error:", errors);
    toast.error(Msg.error.validationFailed);
  };

  const handleConfirmSubmit = async () => {
    if (!pendingData) return;
    try {
      setShowConfirmModal(false);
      const finalData = { ...pendingData };

      finalData.proposalStatusId = FormStatus.ProposalStep1.REVIEW;

      await saveProposal(
        finalData,
        proposalId,
        user?.id,
        false,
        "กำลังส่งข้อมูล...",
      );

      setShowSuccessModal(true);
    } catch (error) {
      // Error handled in saveProposal action
    }
  };

  return {
    methods,
    currentStep,
    setStep,
    initialData,
    proposalId,
    isDataLoaded,
    showConfirmModal,
    setShowConfirmModal,
    showSuccessModal,
    setShowSuccessModal,
    onSubmitForm,
    onValidationErr,
    handleConfirmSubmit,
    handleBack,
    handleSaveDraft,
    handleNext,
    router,
  };
};