"use client";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateProposalForm } from "../../proposal.schema";
import { useEffect } from "react";
import { UI_CLASSES } from "@/constants";

type BudgetRowProps = {
  index: number;
  removeItem: (index: number) => void;
  length: number;
};

export default function BudgetForm({
  index,
  removeItem,
  length,
}: BudgetRowProps) {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateProposalForm>();

  const education = useWatch({
    control,
    name: `budget_01.details.${index}.education`,
  });

  const quantity = useWatch({
    control,
    name: `budget_01.details.${index}.quantity`,
  });

  const unitPrice = useWatch({
    control,
    name: `budget_01.details.${index}.unitPrice`,
  });

  useEffect(() => {
    const q = quantity || 0;
    const p = unitPrice || 0;
    setValue(`budget_01.details.${index}.total`, q * p);
  }, [quantity, unitPrice, setValue]);

  return (
    <div key={index}>
      <div className="flex items-center p-2">
        <div className="flex-1">
          <label className="text-sm">
            1.2.{index + 1} โปรดระบุ <span className="text-red-500">*</span>
          </label>
          <div className="flex items-center gap-4">
            <input
              {...register(`budget_01.details.${index}.note`)}
              className={UI_CLASSES.input}
              placeholder="ระบุ"
            />
            {length > 1 && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="flex items-center gap-2 rounded-lg border border-red-500 px-4 py-2 text-sm text-red-500 hover:bg-red-50"
              >
                ลบ
              </button>
            )}
          </div>
          <p className="text-xs text-red-500">
            {errors.budget_01?.details?.[index]?.note?.message as string}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 p-2 md:grid-cols-3">
        <div>
          <label className="text-sm">
            จำนวน(เดือน) <span className="text-red-500">*</span>
          </label>
          <input
            {...register(`budget_01.details.${index}.quantity`)}
            className={UI_CLASSES.input}
            placeholder="0"
            type="number"
          />
          <p className="text-xs text-red-500">
            {errors.budget_01?.details?.[index]?.quantity?.message as string}
          </p>
        </div>
        <div>
          <label className="text-sm">
            จำนวนเงินที่ได้รับ <span className="text-red-500">*</span>
          </label>
          <input
            {...register(`budget_01.details.${index}.unitPrice`)}
            className={UI_CLASSES.input}
            placeholder="0"
            type="number"
          />
          <p className="text-xs text-red-500">
            {errors.budget_01?.details?.[index]?.unitPrice?.message as string}
          </p>
        </div>
        <div>
          <label className="text-sm">จำนวนเงินทั้งหมด</label>
          <input
            {...register(`budget_01.details.${index}.total`)}
            className={UI_CLASSES.input}
            placeholder="0"
            type="number"
            disabled
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4 p-2">
        <div>
          <label className="text-sm">วุฒิการศึกษา </label>
          <select
            {...register(`budget_01.details.${index}.education`)}
            className={UI_CLASSES.input}
          >
            <option value="1">ปริญญาตรี</option>
            <option value="2">ปริญญาโท</option>
            <option value="3">ปริญญาเอก</option>
            <option value="4">อื่นๆ (โปรดระบุ)</option>
          </select>
          <p className="text-xs text-red-500">
            {errors.budget_01?.details?.[index]?.education?.message as string}
          </p>
        </div>
        {education === "4" && (
          <div>
            <label className="text-sm">อื่นๆ </label>
            <input
              {...register(`budget_01.details.${index}.otherEducation`)}
              className={UI_CLASSES.input}
              placeholder="โปรระบุ"
            />
            <p className="text-xs text-red-500">
              {
                errors.budget_01?.details?.[index]?.otherEducation
                  ?.message as string
              }
            </p>
          </div>
        )}
      </div>
      {index + 1 < length && <hr className="mt-4 border-gray-200" />}
    </div>
  );
}
