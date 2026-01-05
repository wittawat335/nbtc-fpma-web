export interface Proposal {
  itemId: string;
  name: string;
  proposalStatusId: number;
  assignedOperatorId?: string;
  assignedOperatorName?: string;
}

export interface Proposal_Assistant {
  proposalId: string;
  userId: number;
}

export interface Proposal_Status {
  itemId: number;
  proposalStepId: number;
  nameStaff: string;
  nameEnduser: string;
}

export interface Proposal_Form {
  itemId: number;
  name: string;
  itemCreateBy: number;
  itemCreatedWhen: string;
  itemModifiedWhen: string;
}

export interface PaginatedProposalForm {
  items: Proposal_Form[];
  total: number;
  page: number;
  pageSize: number;
}

export interface Proposal_Comment {
  itemId: number;
  proposalId: number;
  proposalStatusId: number;
  message: string;
  itemCreatedWhen: Date;
}
