import {
  axiosInstance,
  cleanPayload,
  useLoadingStore,
  useProposalStore,
} from "@/lib";
import { toast } from "sonner";
import { Msg } from "@/constants/message";
import { CreateProposalForm } from "../proposal.schema";

export const useProposalActions = () => {
  const { showLoading, hideLoading } = useLoadingStore();
  const { updateFormData } = useProposalStore();

  const saveProposal = async (
    data: CreateProposalForm,
    proposalId: number | null,
    userId?: string,
    isNextAction: boolean = false,
    loadingMessage?: string,
  ) => {
    updateFormData(data);

    const cleanedData = cleanPayload(data);

    const payload = {
      ...cleanedData,
      itemCreatedBy: userId ? Number(userId) : undefined,
      itemModifiedBy: userId ? Number(userId) : undefined,
    };

    try {
      showLoading(loadingMessage || Msg.alert.saving);

      let resultId = proposalId;

      if (resultId) {
        await axiosInstance.patch(`/proposal/${resultId}`, payload);
      } else {
        const res = await axiosInstance.post(`/proposal`, payload);
        if (res.data?.itemId) {
          resultId = res.data.itemId;
        }
      }
      return resultId;
    } catch (error) {
      console.error("Error saving proposal:", error);
      toast.error(Msg.error.saveFailed);
      throw error;
    } finally {
      hideLoading();
    }
  };

  return { saveProposal };
};
