"use client";
import { UI_CLASSES } from "@/constants";
import React from "react";
import { useFormContext } from "react-hook-form";

export const TaxInfoForm = ({ disabled = false }: { disabled?: boolean }) => {
  const { register } = useFormContext();

  return (
    <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
      <div className="">
        <div className="text-sm font-semibold text-gray-800">
          1.12 ข้อมูลทางด้านภาษี
        </div>
        <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
      </div>
      <div className="space-y-3">
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm">
              หมายเลขประจำตัวผู้เสียภาษี <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register("taxId")}
              className={UI_CLASSES.input}
            />
          </div>
          <div>
            <label className="text-sm">
              รหัสสาขาทางภาษีผู้ขอทุน <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register("taxBranchCode")}
              className={UI_CLASSES.input}
            />
          </div>
          <div>
            <label className="text-sm">
              ประเภทผู้ขอทุน <span className="text-red-500">*</span>
            </label>
            <select
              disabled={disabled}
              {...register("organizationStatusId")}
              className={UI_CLASSES.input}
            >
              <option value="">เลือก</option>
              <option value="1">นิติบุคคลจดทะเบียน</option>
              <option value="2">บุคคลธรรมดา</option>
              <option value="3">คณะบุคคล</option>
            </select>
          </div>
          <div>
            <label className="text-sm">
              จดทะเบียนภาษีมูลค่าเพิ่ม <span className="text-red-500">*</span>
            </label>
            <select
              disabled={disabled}
              {...register("vat")}
              className={UI_CLASSES.input}
            >
              <option value="">เลือก</option>
              <option value="1">จดทะเบียน</option>
              <option value="0">ไม่จดทะเบียน</option>
            </select>
          </div>
          <div>
            <label className="text-sm">
              หักภาษี ณ ที่จ่าย <span className="text-red-500">*</span>
            </label>
            <select
              disabled={disabled}
              {...register("withholdingTax")}
              className={UI_CLASSES.input}
            >
              <option value="">เลือก</option>
              <option value="1">หักภาษี ณ ที่จ่าย</option>
              <option value="0">ได้รับการยกเว้น</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
