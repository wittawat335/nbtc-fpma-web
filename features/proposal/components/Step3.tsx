"use client";
import React, { useEffect, useRef } from "react";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { CreateProposalForm } from "../proposal.schema";
import BudgetForm from "./forms/BudgetForm";
import { UI_CLASSES } from "@/constants";

export default function Step3() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateProposalForm>();

  const quantity = useWatch({
    control,
    name: "budget_01.quantity",
  });

  const unitPrice = useWatch({
    control,
    name: "budget_01.unitPrice",
  });

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "budget_01.details",
  });

  const addItem = () => {
    append({
      note: "",
      quantity: 0,
      unitPrice: 0,
      total: 0,
      education: "1",
      otherEducation: "",
    });
  };

  const removeItem = (index: number) => {
    remove(index);
  };

  useEffect(() => {
    const q = quantity || 0;
    const p = unitPrice || 0;
    setValue("budget_01.total", q * p);
  }, [quantity, unitPrice, setValue]);

  //เพิ่มอัตโนมัติเมื่อยังไม่มี field
  const isInit = useRef(false);
  useEffect(() => {
    if (isInit.current) return;
    if (fields.length === 0) {
      append({
        note: "",
        quantity: 0,
        unitPrice: 0,
        total: 0,
        education: "1",
        otherEducation: "",
      });
    }
    isInit.current = true;
  }, [fields.length, append]);

  return (
    <div className="space-y-8 font-sans">
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="mb-4 flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
          <h4 className="mb-2 text-lg">
            {" "}
            1. หมวดค่าตอบแทนบุคลากรหรือค่าจ้างนักวิจัย
          </h4>
        </div>
        <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
          <div className="">
            <div className="text-sm font-semibold text-gray-800">
              {" "}
              1.1 รายการค่าตอบแทนที่ปรึกษาโครงการ
            </div>
            <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
          </div>
          <div className="space-y-3">
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
              <div>
                <label className="text-sm">
                  จำนวน(คน) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("budget_01.quantity")}
                  className={UI_CLASSES.input}
                  placeholder="0"
                  type="number"
                />
                <p className="text-xs text-red-500">
                  {errors?.budget_01?.quantity?.message as string}
                </p>
              </div>
              <div>
                <label className="text-sm">
                  จำนวนเงินต่อคน(บาท) <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("budget_01.unitPrice")}
                  className={UI_CLASSES.input}
                  placeholder="0"
                  type="number"
                />
                <p className="text-xs text-red-500">
                  {errors?.budget_01?.unitPrice?.message as string}
                </p>
              </div>
              <div>
                <label className="text-sm">จำนวนเงินทั้งหมด</label>
                <input
                  {...register(`budget_01.total`)}
                  className={UI_CLASSES.input}
                  placeholder="0"
                  type="number"
                  disabled
                />
              </div>
              <div>
                <label className="text-sm">
                  หมายเหตุ <span className="text-red-500">*</span>
                </label>
                <input
                  {...register("budget_01.remark")}
                  className={UI_CLASSES.input}
                  placeholder="ระบุหมายเหตุ"
                />
                <p className="text-xs text-red-500">
                  {errors?.budget_01?.remark?.message as string}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* <hr className="m-4" /> */}

        <div className="mx-2 mt-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
          <div className="mb-4 flex items-center justify-between gap-2 pb-3">
            <div className="">
              <div className="text-sm font-semibold text-gray-800">
                {" "}
                1.2 รายการค่าตอบแทนคณะผู้วิจัย
              </div>
              <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
            </div>
            <button
              type="button"
              onClick={addItem}
              className="inline-flex items-center gap-2 rounded-lg border border-blue-400 bg-white px-4 py-2 text-sm font-medium text-blue-700 transition hover:border-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none"
            >
              + เพิ่มรายการ
            </button>
          </div>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <BudgetForm
                key={field.id}
                index={index}
                removeItem={removeItem}
                length={fields.length}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
