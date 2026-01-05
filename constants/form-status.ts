export const FormStatus = {
  ProposalStep1: {
    SAVE_DRAFT: 1,
    REVIEW: 2,
    REVIEW_FOR_ATTACHMENT: "3",
    REVIEW_FOR_EDIT: "4",
  },

  ProposalStep2: {
    REVIEW: "5",
    SUSPEND_FOR_ATTACHMENT: "6",
    SUSPEND_FOR_LATE: "7",
    PASS: "8",
  },

  ProposalStep3: {
    REVIEW: "9",
    SUSPEND_FOR_EDIT: "10",
    PASS: "11",
  },

  ProposalStep4: {
    REVIEW: "12",
    SUSPEND_FOR_EDIT: "13",
    PASS: "14",
  },

  ProposalStep5: {
    REVIEW: "15",
    SUSPEND_FOR_EDIT: "16",
    DISAPPROVE: "17",
    APPROVE: "18",
  },
} as const;
