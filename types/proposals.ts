import { ProposalFile } from "./file";

export interface ProposalPerson {
  prefix?: string | number;
  firstName?: string;
  lastName?: string;
  position?: string;
  phone?: string;
  email?: string;
  lineId?: string;
  isCheck?: boolean;
  docNo?: string;
}

export interface ProposalAddress {
  no?: string;
  moo?: string;
  soi?: string;
  road?: string;
  village?: string;
  subDistrict?: string | number;
  district?: string | number;
  province?: string | number;
  postalCode?: string;
  tel?: string;
  fax?: string;
  email?: string;
  webSite?: string;
  isCheck?: boolean;
}

export interface BudgetRow {
  list: string;
  amount: number;
  price: number;
  total: number;
}

export interface ProposalBudget {
  items: BudgetRow[];
  grandTotal?: number;
}

export interface ProjectParams {
  nameTh?: string;
  nameEn?: string;
  rationale?: string;
  objective?: string;
  targetGroup?: string;
}

export interface Proposals {
  itemId?: string | number;
  proposalStatusId?: number;

  projectParams?: ProjectParams;

  resposiiblePerson?: ProposalPerson;
  authorityPerson?: ProposalPerson;
  attorneyPerson?: ProposalPerson;
  contactPerson?: ProposalPerson;

  projectAddress?: ProposalAddress;
  contactAddress?: ProposalAddress;

  budget?: ProposalBudget;
  taxId?: string;

  proposalFiles?: ProposalFile[];
}
