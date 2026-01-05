"use client";
import { FileText } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import { PROPOSAL_DOCUMENTS } from "../constants";
import { InitialFileItem, useProposalFiles } from "../hooks/useProposalFiles";
import { DocumentUploadRow } from "./DocumentUploadRow";
import { UploadedFilesTable } from "./tables/UploadedFilesTable";

interface ProposalDocumentsProps {
  initialFiles?: InitialFileItem[];
  proposalId?: number | string | null;
}

export const ProposalDocuments = ({
  initialFiles,
  proposalId,
}: ProposalDocumentsProps) => {
  const { user } = useAuth();

  const { uploadedFiles, isUploading, uploadFile, deleteFile } =
    useProposalFiles(initialFiles);

  const handleUploadWrapper = async (
    file: File,
    docLabel: string,
    description: string,
  ) => {
    return await uploadFile(file, docLabel, description, user?.id, proposalId);
  };

  return (
    <div className="rounded-2xl bg-white shadow-sm">
      {/* Header ส่วนที่ 2 */}
      <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
        <h4 className="mb-2 text-lg">
          ส่วนที่ 2
          รายการข้อมูลเอกสารหลักฐานประกอบแบบคำขอรับการส่งเสริมและสนับสนุนเงินจากกองทุน
        </h4>
      </div>

      <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
        <p className="mb-4 font-semibold text-gray-700">
          ข้าพเจ้าได้จัดส่งเอกสารและหลักฐานที่สำคัญ
          เพื่อประกอบการขอรับการส่งเสริมสนับสนุนเงินจากกองทุน ดังต่อไปนี้
        </p>

        {/* Banner คำแนะนำ */}
        <div className="mb-6 flex flex-col items-center gap-4 rounded-lg border border-blue-100 bg-blue-50 p-4 md:flex-row">
          <div className="flex gap-2">
            <FileText className="h-10 w-10 text-blue-500" strokeWidth={1.5} />
            <FileText className="h-10 w-10 text-blue-400" strokeWidth={1.5} />
            <FileText className="h-10 w-10 text-blue-300" strokeWidth={1.5} />
          </div>
          <div className="text-sm text-gray-600">
            <p className="mb-1 text-base font-bold text-blue-800">คำแนะนำ</p>
            <p>
              ไฟล์ที่อนุญาตให้อัพโหลด : .doc, .docx, .pdf, .xls, .xlsx, .jpg,
              .png เท่านั้น
            </p>
            <p>ขนาดไฟล์รวมกันทั้งหมดไม่เกิน 25 MB</p>
          </div>
        </div>

        {/* Document Input List */}
        <div className="space-y-6">
          {PROPOSAL_DOCUMENTS.map((doc) => (
            <DocumentUploadRow
              key={doc.id}
              doc={doc}
              onUpload={(file, desc) =>
                handleUploadWrapper(file, doc.label, desc)
              }
              isGlobalUploading={isUploading}
            />
          ))}
        </div>

        {/* Uploaded Files Table */}
        <UploadedFilesTable files={uploadedFiles} onDelete={deleteFile} />
      </div>
    </div>
  );
};

export default ProposalDocuments;
