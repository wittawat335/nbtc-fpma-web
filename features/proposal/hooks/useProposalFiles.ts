import { useState, useEffect } from "react";
import { toast } from "sonner";
import { apiService } from "@/services/api-service";
import { ProposalFile, UploadedFileRecord } from "@/types/file";

export type InitialFileItem = ProposalFile | { file: ProposalFile };

export const useProposalFiles = (initialFiles?: InitialFileItem[]) => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFileRecord[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Map initial files
  useEffect(() => {
    if (initialFiles && Array.isArray(initialFiles)) {
      const mappedFiles = initialFiles
        .map((pf) => {
          const item = pf as any;
          const fileData = item.file || item;
          if (!fileData) return null;

          return {
            itemId: fileData.itemId,
            name: fileData.name || fileData.fileName,
            type: fileData.type || fileData.fileType,
            size: fileData.size || fileData.fileSize,
            itemCreatedWhen: fileData.itemCreatedWhen,
            extension: fileData.extension,
            path: fileData.path || fileData.filePath,
            itemCreatedBy: fileData.itemCreatedBy,
          } as UploadedFileRecord;
        })
        .filter(Boolean) as UploadedFileRecord[];

      setUploadedFiles(mappedFiles);
    }
  }, [initialFiles]);

  const uploadFile = async (
    file: File,
    docLabel: string,
    description: string,
    userId?: number | string,
    proposalId?: number | string | null,
  ) => {
    const MAX_SIZE_MB = 25;
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      toast.error(`ขนาดไฟล์เกิน ${MAX_SIZE_MB} MB`);
      return false;
    }

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("documentType", docLabel.substring(0, 100));
      formData.append("description", description || "");

      if (userId) formData.append("userId", userId.toString());
      if (proposalId) formData.append("proposalId", proposalId.toString());

      const result = await apiService.post<UploadedFileRecord>(
        "/files/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      setUploadedFiles((prev) => [...prev, result]);
      toast.success("บันทึกไฟล์เรียบร้อย");
      return true;
    } catch (error) {
      console.error("Upload failed", error);
      toast.error("เกิดข้อผิดพลาดในการอัปโหลด");
      return false;
    } finally {
      setIsUploading(false);
    }
  };

  const deleteFile = async (fileId: number) => {
    try {
      await apiService.delete(`/files/${fileId}`);
      setUploadedFiles((prev) => prev.filter((f) => f.itemId !== fileId));
      toast.success("ลบไฟล์เรียบร้อย");
      return true;
    } catch (error) {
      console.error("Delete failed", error);
      toast.error("ลบไฟล์ไม่สำเร็จ", {
        description: "กรุณาลองใหม่อีกครั้ง",
      });
      return false;
    }
  };

  return {
    uploadedFiles,
    isUploading,
    uploadFile,
    deleteFile,
  };
};
