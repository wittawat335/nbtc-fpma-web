import React, { useState, useRef } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

interface DocumentUploadRowProps {
  doc: {
    id: number;
    label: string;
    note?: string[];
  };
  onUpload: (file: File, desc: string) => Promise<boolean>;
  isGlobalUploading: boolean;
}

export const DocumentUploadRow = ({
  doc,
  onUpload,
  isGlobalUploading,
}: DocumentUploadRowProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localLoading, setLocalLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSelectFileClick = () => {
    fileInputRef.current?.click();
  };

  const handleUploadClick = async () => {
    if (!selectedFile) {
      toast.warning("กรุณาเลือกไฟล์", {
        description: "คุณต้องเลือกไฟล์ก่อนกดปุ่ม Add",
      });
      return;
    }

    setLocalLoading(true);
    const success = await onUpload(selectedFile, description);

    if (success) {
      // Reset inputs on success
      setSelectedFile(null);
      setDescription("");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
    setLocalLoading(false);
  };

  const inputBase =
    "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none transition focus:border-blue-600 focus:ring-1 focus:ring-blue-200 disabled:bg-gray-100 disabled:text-gray-500";

  return (
    <div className="border-b border-gray-100 pb-6 last:border-0">
      <div className="mb-2 flex items-start gap-3">
        <div className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-green-500 text-[10px] text-white">
          ✓
        </div>
        <div>
          <p className="text-sm text-gray-800">{doc.label}</p>
          {doc.note && (
            <ul className="mt-1 list-inside list-disc text-xs text-blue-600">
              {doc.note.map((n, i) => (
                <li key={i} className="cursor-pointer hover:underline">
                  {n}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="ml-8 flex flex-col gap-2 md:flex-row">
        <input
          className={inputBase}
          placeholder="ชื่อเอกสาร (ถ้ามี)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          disabled={isGlobalUploading || localLoading}
        />
        <input
          type="file"
          className="hidden"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".doc,.docx,.pdf,.xls,.xlsx,.jpg,.png"
        />
        <div className="flex items-center gap-2">
          {selectedFile && (
            <span className="max-w-[150px] truncate text-xs text-blue-600">
              {selectedFile.name}
            </span>
          )}
          <button
            type="button"
            onClick={handleSelectFileClick}
            disabled={isGlobalUploading || localLoading}
            className="inline-flex min-w-[110px] items-center justify-center rounded-lg border border-blue-300 bg-gradient-to-br from-blue-50 to-sky-100 px-4 py-2 text-sm font-medium whitespace-nowrap text-blue-700 transition-all duration-300 hover:border-blue-400 hover:from-blue-100 hover:to-sky-200 focus:ring-2 focus:ring-blue-200 focus:outline-none disabled:opacity-50"
          >
            เลือกไฟล์
          </button>
          <button
            type="button"
            onClick={handleUploadClick}
            disabled={isGlobalUploading || localLoading || !selectedFile}
            className="inline-flex min-w-[80px] items-center justify-center rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 px-6 py-2 text-sm font-medium text-white shadow-sm transition-all duration-300 hover:from-green-600 hover:to-emerald-700 hover:shadow-md focus:ring-2 focus:ring-green-300 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50"
          >
            {localLoading ? (
              <Loader2 className="h-5 w-5 animate-spin" />
            ) : (
              "เพิ่ม"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadRow;
