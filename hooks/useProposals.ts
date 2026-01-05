import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { PaginatedProposalForm, Proposal, Proposal_Assistant, Proposal_Comment, Proposal_Form, Proposal_Status } from "@/types/proposal";
import { useFetch } from "./useGenericQuery";
import { useGenericMutation } from "./useGenericMutation";
import { apiService } from "@/services/api-service";

export const useProposals = () => {
  const queryClient = useQueryClient();

  const proposalsQuery = useFetch<Proposal[]>(
    "/proposal",
    ["proposals"],
  );

  return {
    ...proposalsQuery
  };
};

export const useProposalAssistants = () => {
  return useFetch<Proposal_Assistant[]>(
    "/proposal/assistants",
    ["proposal-assistants"]
  );
};

export const useAssignOperators = () => {
  const queryClient = useQueryClient();

  return useGenericMutation<
    any,
    { id: number; operatorIds: number[] }
  >(
    "/proposal", // base URL ไม่ต้องมี :id
    "POST",
    {
      invalidateKeys: [["proposals"], ["proposal-assistants"]],
      mutationFn: async ({ id, operatorIds }) => {
        // แทนที่ :id ตอนเรียก mutate
        const url = `/proposal/${id}/assign`;
        return apiService.post(url, { operatorIds });
      },
      onSuccess: () => {
        console.log("Assign operators Success");
      },
    }
  );
};

export const useReviews = (userId: number) => {
  return useFetch<Proposal[]>(
    `/proposal/review/my/${userId}`,
    ["my-review-proposals", userId.toString()]
  );
};


// export const useViewForm = (userId: number) => {
//   return useFetch<Proposal_Form[]>(
//     `/proposal/paging/${userId}`,
//     ["paging-proposals", userId.toString()]
//   );
// };

export const useViewForm = (
  userId: number,
  page: number,
  pageSize: number
) => {
  return useFetch<PaginatedProposalForm>(
    `/proposal/paging/${userId}?page=${page}&pageSize=${pageSize}`,
    ["paging-proposals", userId.toString(), page.toString(), pageSize.toString()]
  );
};


export const useStatus = () => {
  return useFetch<Proposal_Status[]>(
    "proposal/master/status",
    ["proposal-status"]
  );
};

export const useSubmitReview = () => {
  const queryClient = useQueryClient();

  return useGenericMutation<
    any,
    {
      id: number;
      proposalStatusId: number;
      comment: string;
    }
  >(
    "/proposal",
    "POST",
    {
      mutationFn: async ({ id, proposalStatusId, comment }) => {
        const url = `/proposal/${id}/reviewProposal`;
        return apiService.post(url, {
          proposalStatusId,
          comment,
        });
      },

      onSuccess: (_data, variables) => {
        // ✅ ใช้ id จาก variables
        queryClient.invalidateQueries({
          queryKey: ["my-review-comment-proposals", variables.id],
        });

        queryClient.invalidateQueries({
          queryKey: ["proposals"],
        });

        console.log("Submit review success");
      },
    }
  );
};

export const useComment = (proposalId: number) => {
  return useFetch<Proposal_Comment[]>(
    `proposal/review/comment/${proposalId}`,
    ["review-comment", proposalId.toString()]
  );
};