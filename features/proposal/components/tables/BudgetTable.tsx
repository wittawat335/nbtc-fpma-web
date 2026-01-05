"use client";
import { useFieldArray, useFormContext, useWatch } from "react-hook-form";
import { useEffect } from "react";

interface Props {
  sectionIndex: number; // 1, 2, 3
  title: string;
}

export default function BudgetTable({ sectionIndex, title }: Props) {
  const { register, control, setValue } = useFormContext();

  // ใช้ field array เดียวรวมกัน แต่ตอนแสดงผลอาจจะ filter เอา หรือแยก array ใน schema ก็ได้
  // ในที่นี้สมมติว่าแยก Schema เป็น budgets.section1, budgets.section2 จะจัดการง่ายกว่า
  // แต่ถ้าตาม DTO รวม ให้ใช้ logic filter

  const { fields, append, remove } = useFieldArray({
    control,
    name: "budgetDetails",
  });

  // Logic การคำนวณแต่ละแถว
  const BudgetRow = ({ index, item }: { index: number; item: any }) => {
    // useWatch จะเฝ้าดูค่าที่เปลี่ยนแบบ Realtime
    const unit = useWatch({ control, name: `budgetDetails.${index}.unit` });
    const price = useWatch({ control, name: `budgetDetails.${index}.price` });

    useEffect(() => {
      const total = (Number(unit) || 0) * (Number(price) || 0);
      // Set ค่ากลับเข้าไปใน Form state โดยไม่ต้อง re-render ทั้งหน้า
      setValue(`budgetDetails.${index}.total`, total);
    }, [unit, price, setValue, index]);

    // กรองแสดงเฉพาะ Section ที่ต้องการ
    if (item.section !== sectionIndex) return null;

    return (
      <tr className="border-b">
        <td>
          {/* Hidden field เก็บ section */}
          <input
            type="hidden"
            {...register(`budgetDetails.${index}.section`)}
            value={sectionIndex}
          />
          <input
            {...register(`budgetDetails.${index}.description`)}
            className="w-full border p-1"
          />
        </td>
        <td>
          <input
            type="number"
            {...register(`budgetDetails.${index}.unit`)}
            className="w-full border p-1 text-right"
          />
        </td>
        <td>
          <input
            type="number"
            {...register(`budgetDetails.${index}.price`)}
            className="w-full border p-1 text-right"
          />
        </td>
        <td>
          <input
            type="number"
            {...register(`budgetDetails.${index}.total`)}
            readOnly
            className="w-full border bg-gray-100 p-1 text-right"
          />
        </td>
        <td>
          <button
            type="button"
            onClick={() => remove(index)}
            className="text-red-500"
          >
            ลบ
          </button>
        </td>
      </tr>
    );
  };

  return (
    <div className="mb-6">
      <h4 className="bg-gray-100 p-2 font-bold">{title}</h4>
      <table className="w-full">
        <thead>
          <tr>
            <th>รายการ</th>
            <th width="15%">จำนวน</th>
            <th width="15%">ราคา/หน่วย</th>
            <th width="15%">รวม</th>
            <th width="5%"></th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <BudgetRow key={field.id} index={index} item={field} />
          ))}
        </tbody>
      </table>
      <button
        type="button"
        onClick={() =>
          append({
            section: sectionIndex,
            description: "",
            unit: 0,
            price: 0,
            total: 0,
          })
        }
        className="mt-2 text-blue-600 hover:underline"
      >
        + เพิ่มรายการ
      </button>
    </div>
  );
}
