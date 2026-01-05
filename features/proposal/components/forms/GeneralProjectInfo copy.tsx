"use client";
import React from "react";
import { useFormContext } from "react-hook-form";

export const GeneralProjectInfo = ({
  disabled = false,
}: {
  disabled?: boolean;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  // Helper เพื่อลดการเขียนซ้ำ
  const getError = (name: string) => (errors as any)?.[name]?.message;

  return (
    <>
      {/* 1.1 ข้อมูลหน่วยงาน */}
      <div className="card rounded border bg-white shadow-sm">
        <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800">
          1.1 ชื่อหน่วยงาน
        </div>
        <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
          <div>
            <label className="text-sm">
              ชื่อหน่วยงาน <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register("organizationName")}
              className="form-control w-full rounded border p-2 text-sm"
              placeholder="ระบุชื่อหน่วยงาน"
            />
            <p className="text-xs text-red-500">
              {getError("organizationName")}
            </p>
          </div>
          <div>
            <label className="text-sm">หน่วยงานย่อย/คณะ</label>
            <input
              disabled={disabled}
              {...register("departmentName")}
              className="form-control w-full rounded border p-2 text-sm"
              placeholder="ระบุหน่วยงานย่อย"
            />
          </div>
        </div>
      </div>

      {/* 1.2 ชื่อโครงการ */}
      <div className="card rounded border bg-white shadow-sm">
        <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800">
          1.2 ชื่อโครงการที่เสนอ
        </div>
        <div className="p-4">
          <label className="text-sm">
            ชื่อโครงการที่เสนอ <span className="text-red-500">*</span>
          </label>
          <textarea
            disabled={disabled}
            {...register("name")}
            rows={3}
            className="form-control w-full rounded border p-2 text-sm"
            placeholder="ระบุชื่อโครงการ"
          />
          <p className="text-xs text-red-500">{getError("name")}</p>
        </div>
      </div>

      {/* 1.3 & 1.4 งบประมาณและระยะเวลา */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="card rounded border bg-white shadow-sm">
          <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800">
            1.3 งบประมาณโครงการ
          </div>
          <div className="p-4">
            <label className="text-sm">
              งบประมาณโครงการ (บาท) <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              type="number"
              step="0.01"
              {...register("budget")}
              className="form-control w-full rounded border p-2 text-right text-sm"
              placeholder="0.00"
            />
            <p className="text-xs text-red-500">{getError("budget")}</p>
          </div>
        </div>
        <div className="card rounded border bg-white shadow-sm">
          <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800">
            1.4 ระยะเวลาการดำเนินโครงการ
          </div>
          <div className="p-4">
            <label className="text-sm">
              ระยะเวลา (วัน) <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              type="number"
              {...register("duration")}
              className="form-control w-full rounded border p-2 text-right text-sm"
              placeholder="0"
            />
            <p className="text-xs text-red-500">{getError("duration")}</p>
          </div>
        </div>
      </div>

      {/* 1.5 คุณสมบัติผู้ขอรับการส่งเสริม */}
      <div className="card rounded border bg-white shadow-sm">
        <div className="bg-gray-100 px-4 py-2 font-bold text-gray-800">
          1.5 คุณสมบัติผู้ขอรับการส่งเสริมและสนับสนุนเงินจากกองทุน
        </div>
        <div className="p-4">
          <div className="space-y-2">
            {[
              {
                val: "1",
                label:
                  "ผู้ประกอบการในอุตสาหกรรมกระจายเสียง อุตสาหกรรมโทรทัศน์ อุตสาหกรรมโทรคมนาคมฯ",
              },
              { val: "2", label: "หน่วยงานของรัฐ" },
              { val: "3", label: "สถานศึกษา" },
              {
                val: "4",
                label:
                  "สมาคม มูลนิธิ หรือนิติบุคคลอื่นที่จัดตั้งขึ้นตามกฎหมายไทย ที่มีวัตถุประสงค์ในการดำเนินกิจการเพื่อประโยชน์สาธารณะ",
              },
            ].map((item) => (
              <label
                key={item.val}
                className="flex cursor-pointer items-start gap-2"
              >
                <input
                  disabled={disabled}
                  type="radio"
                  value={item.val}
                  {...register("organizationTypeId")}
                  className="mt-1"
                />
                <span className="text-sm">{item.label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};
