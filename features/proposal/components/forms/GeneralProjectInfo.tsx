"use client";
import { UI_CLASSES } from "@/constants";
import { getFormError } from "@/lib";
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

  return (
    <>
      {/* 1.1 ข้อมูลหน่วยงาน */}
      <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
        <div className="">
          <div className="text-sm font-semibold text-gray-800">
            1.1 ชื่อหน่วยงาน
          </div>
          <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
        </div>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          <div>
            <label className="mb-1 block text-sm text-gray-700">
              ชื่อหน่วยงาน <span className="text-red-600">*</span>
            </label>
            <input
              disabled={disabled}
              {...register("organizationName")}
              className={UI_CLASSES.input}
              placeholder="ระบุชื่อหน่วยงาน"
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "organizationName")}
            </p>
          </div>

          <div>
            <label className="mb-1 block text-sm text-gray-700">
              หน่วยงานย่อย / คณะ
            </label>
            <input
              disabled={disabled}
              {...register("departmentName")}
              className={UI_CLASSES.input}
              placeholder="ระบุหน่วยงานย่อย"
            />
          </div>
        </div>
      </div>

      {/* 1.2 ชื่อโครงการ */}
      <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
        <div className="">
          <div className="text-sm font-semibold text-gray-800">
            1.2 ชื่อโครงการที่เสนอ
          </div>
          <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700">
            ชื่อโครงการที่เสนอ <span className="text-red-600">*</span>
          </label>
          <textarea
            disabled={disabled}
            {...register("name")}
            rows={3}
            className={UI_CLASSES.input}
            placeholder="ระบุชื่อโครงการ"
          />
          <p className="mt-1 text-xs text-red-600">
            {getFormError(errors, "name")}
          </p>
        </div>
      </div>

      {/* 1.3 งบประมาณ */}
      <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
        <div className="">
          <div className="text-sm font-semibold text-gray-800">
            1.3 งบประมาณโครงการ
          </div>
          <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700">
            งบประมาณโครงการ (บาท) <span className="text-red-600">*</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            step="0.01"
            {...register("budget")}
            className={`${UI_CLASSES.input} text-right`}
            placeholder="0.00"
          />
          <p className="mt-1 text-xs text-red-600">
            {getFormError(errors, "budget")}
          </p>
        </div>
      </div>

      {/* 1.4 ระยะเวลา */}
      <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
        <div className="">
          <div className="text-sm font-semibold text-gray-800">
            1.4 ระยะเวลาการดำเนินโครงการ
          </div>
          <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
        </div>

        <div>
          <label className="mb-1 block text-sm text-gray-700">
            ระยะเวลา (วัน) <span className="text-red-600">*</span>
          </label>
          <input
            disabled={disabled}
            type="number"
            {...register("duration")}
            className={`${UI_CLASSES.input} text-right`}
            placeholder="0"
          />
          <p className="mt-1 text-xs text-red-600">
            {getFormError(errors, "duration")}
          </p>
        </div>
      </div>

      {/* 1.5 คุณสมบัติ */}
      <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
        <div className="">
          <div className="text-sm font-semibold text-gray-800">
            1.5 คุณสมบัติผู้ขอรับการส่งเสริมและสนับสนุนเงินจากกองทุน
          </div>
          <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
        </div>

        <div className="space-y-3">
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
                "สมาคม มูลนิธิ หรือนิติบุคคลอื่นที่จัดตั้งขึ้นตามกฎหมายไทย เพื่อประโยชน์สาธารณะ",
            },
          ].map((item) => (
            <label
              key={item.val}
              className="group flex cursor-pointer gap-3 rounded-lg border border-blue-200 bg-white px-4 py-3 transition hover:border-blue-400 hover:bg-blue-50"
            >
              <input
                disabled={disabled}
                type="radio"
                value={item.val}
                {...register("organizationTypeId")}
                className="mt-1 accent-blue-600"
              />
              <span className="text-sm text-gray-800 group-hover:text-blue-900">
                {item.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </>
  );
};
