import React, { useState } from "react";
import { Trash2, Eye } from "lucide-react";
import { UploadedFileRecord } from "@/types/file";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { viewFile } from "@/lib";

interface UploadedFilesTableProps {
  files: UploadedFileRecord[];
  onDelete: (id: number) => Promise<boolean>;
}

export const UploadedFilesTable = ({
  files,
  onDelete,
}: UploadedFilesTableProps) => {
  const [fileToDelete, setFileToDelete] = useState<number | null>(null);

  const confirmDelete = async () => {
    if (fileToDelete) {
      await onDelete(fileToDelete);
      setFileToDelete(null);
    }
  };

  return (
    <>
      <div className="mt-8 overflow-hidden rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-700 text-white">
              <tr>
                <th className="p-3 font-medium">ลำดับ</th>
                <th className="p-3 font-medium">ประเภทเอกสาร</th>
                <th className="p-3 font-medium">ชื่อไฟล์</th>
                <th className="p-3 font-medium">ขนาด</th>
                <th className="p-3 font-medium">วัน - เวลาที่นำส่ง</th>
                <th className="p-3 text-center font-medium">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 bg-white">
              {files.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="bg-gray-50 p-8 text-center text-gray-400"
                  >
                    No Data
                  </td>
                </tr>
              ) : (
                files.map((file, index) => (
                  <tr
                    key={file.itemId || index}
                    className="transition-colors hover:bg-gray-50"
                  >
                    <td className="p-3">{index + 1}</td>
                    <td className="max-w-xs truncate p-3" title={file.type}>
                      {file.type}
                    </td>
                    <td
                      className="max-w-xs cursor-pointer truncate p-3 text-blue-600 hover:underline"
                      title="คลิกเพื่อดูไฟล์"
                      onClick={() => viewFile(file)}
                    >
                      {file.name}
                    </td>
                    <td className="p-3">
                      {file.size
                        ? (parseInt(file.size) / 1024 / 1024).toFixed(2)
                        : "0"}{" "}
                      MB
                    </td>
                    <td className="p-3">
                      {file.itemCreatedWhen
                        ? new Date(file.itemCreatedWhen).toLocaleString()
                        : "-"}
                    </td>
                    <td className="p-3 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button
                          type="button"
                          onClick={() => viewFile(file)}
                          className="rounded-full p-2 text-gray-500 transition-all hover:bg-blue-50 hover:text-blue-600"
                          title="ดูไฟล์"
                        >
                          <Eye size={18} />
                        </button>

                        <button
                          type="button"
                          onClick={() => setFileToDelete(file.itemId)}
                          className="rounded-full p-2 text-gray-500 transition-all hover:bg-red-50 hover:text-red-600"
                          title="ลบไฟล์"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AlertDialog
        open={!!fileToDelete}
        onOpenChange={(open) => !open && setFileToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการลบข้อมูล</AlertDialogTitle>
            <AlertDialogDescription>
              ต้องการลบไฟล์นี้ใช่หรือไม่? การกระทำนี้ไม่สามารถย้อนกลับได้
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              ลบไฟล์
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default UploadedFilesTable;
