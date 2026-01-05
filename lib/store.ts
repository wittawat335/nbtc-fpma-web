import { CreateProposalForm } from "@/features/proposal/proposal.schema";
import { create } from "zustand";

interface ProposalStore {
  currentStep: number;
  formData: Partial<CreateProposalForm>;
  setStep: (step: number) => void;
  updateFormData: (data: Partial<CreateProposalForm>) => void;
  reset: () => void;
}

export const useProposalStore = create<ProposalStore>((set) => ({
  currentStep: 1,
  formData: {
    resposiiblePerson: { prefix: "", firstname: "", lastname: "" },
    projectAddress: {},
    budgetDetails: [],
  },
  setStep: (step) => set({ currentStep: step }),
  updateFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),
  reset: () => set({ currentStep: 1, formData: {} }),
}));
