export interface AppFile {
  itemId?: string | number;
  fileName?: string;
  fileSize?: number;
  fileType?: string;
  filePath?: string;
  url?: string;
}

export interface ProposalFile extends AppFile {
  proposalId?: number;
  documentType?: string;
}

export interface UploadedFileRecord {
  itemId: number;
  name: string;
  type: string;
  size: string;
  itemCreatedWhen: string;
  extension: string;
  path?: string;
  itemCreatedBy?: number;
}
