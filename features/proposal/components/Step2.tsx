"use client";

import LabelField from "@/components/LabelField";
import { useMasterData } from "@/hooks/useMasterData";
import { useFormContext } from "react-hook-form";
import { CreateProposalForm } from "../proposal.schema";
import { UI_CLASSES } from "@/constants";

export default function Step2() {
  const {
    register,
    setValue,
    control,
    formState: { errors },
  } = useFormContext<CreateProposalForm>();
  const { data: titles } = useMasterData("prefix");

  return (
    <div className="space-y-8 font-sans">
      <div>
        {/* 1. ข้อโครงการ */}
        <div className="rounded-2xl bg-white pb-3 shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              1. ข้อโครงการ <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm">
                  ชื่อโครงการที่เสนอ <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register(`name`)}
                  rows={3}
                  className={UI_CLASSES.input}
                  placeholder="ระบุชื่อโครงการ"
                  disabled
                />
              </div>
              <div>
                <label className="text-sm">
                  ชื่อโครงการที่เสนอ (ภาษาอังกฤษ){" "}
                  <span className="text-red-500">*</span>
                </label>
                <textarea
                  {...register(`nameEn`)}
                  rows={3}
                  className={UI_CLASSES.input}
                  placeholder="ระบุชื่อโครงการ"
                />
                <p className="text-xs text-red-500">
                  {errors?.nameEn?.message as string}
                </p>
              </div>
              <div>
                <label className="text-sm">
                  ชื่อหน่วยงาน <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className={UI_CLASSES.input}
                  {...register(`organizationName`)}
                  disabled
                />
                <p className="text-xs text-red-500">
                  {errors?.organizationName?.message as string}
                </p>
              </div>
              <div>
                <label className="text-sm">
                  หน่วยงานย่อย/คณะ <span className="text-red-500">*</span>
                </label>
                <input
                  {...register(`departmentName`)}
                  type="text"
                  className={UI_CLASSES.input}
                />
                <p className="text-xs text-red-500">
                  {errors?.departmentName?.message as string}
                </p>
              </div>
            </div>
            <div className="mt-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-red-50/40 bg-[length:200%_200%] bg-[position:0%_0%] p-5 transition-all duration-700 ease-out hover:bg-[position:100%_100%]">
              <h5 className="mb-4 text-sm font-semibold text-blue-900">
                ชื่อหัวหน้าโครงการ (ผู้รับผิดชอบโครงการ)
              </h5>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                <div>
                  <label className="text-sm">
                    คำนำหน้า <span className="text-red-500">*</span>
                  </label>
                  <select
                    {...register(`resposiiblePerson.prefix`)}
                    className={UI_CLASSES.input}
                    disabled
                  >
                    <option value="">เลือก</option>
                    {titles?.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                  <p className="text-xs text-red-500">
                    {errors?.resposiiblePerson?.prefix?.message as string}
                  </p>
                </div>
                <div>
                  <label className="text-sm">
                    ชื่อ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={UI_CLASSES.input}
                    {...register(`resposiiblePerson.firstname`)}
                    disabled
                  />
                  <p className="text-xs text-red-500">
                    {errors?.resposiiblePerson?.firstname?.message as string}
                  </p>
                </div>
                <div>
                  <label className="text-sm">
                    นามสกุล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={UI_CLASSES.input}
                    {...register(`resposiiblePerson.lastname`)}
                    disabled
                  />
                  <p className="text-xs text-red-500">
                    {errors?.resposiiblePerson?.lastname?.message as string}
                  </p>
                </div>
                <div>
                  <label className="text-sm">
                    ตำแหน่ง <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    className={UI_CLASSES.input}
                    {...register(`resposiiblePerson.position`)}
                    disabled
                  />
                  <p className="text-xs text-red-500">
                    {errors?.resposiiblePerson?.position?.message as string}
                  </p>
                </div>
                <div>
                  <label className="text-sm">
                    โทรศัพท์ <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    className={UI_CLASSES.input}
                    {...register(`resposiiblePerson.tel`)}
                    placeholder="0812345678"
                    disabled
                  />
                  <p className="text-xs text-red-500">
                    {errors?.resposiiblePerson?.tel?.message as string}
                  </p>
                </div>
                <div>
                  <label className="text-sm">
                    อีเมล <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    className={UI_CLASSES.input}
                    {...register(`resposiiblePerson.email`)}
                    placeholder="example@email.com"
                    disabled
                  />
                  <p className="text-xs text-red-500">
                    {errors?.resposiiblePerson?.email?.message as string}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. ลักษณะโครงการ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              2. ลักษณะโครงการ <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 flex gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <label className="flex items-center gap-2">
              <input type="radio" {...register(`type`)} value={1} />
              โครงการใหม่
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" {...register(`type`)} value={2} />
              โครงการต่อเนื่อง (โปรดระบุ)
            </label>
            <div>
              <input
                {...register("previousProposal")}
                className={UI_CLASSES.input}
                placeholder="ระบุ"
              />
              <p className="text-xs text-red-500">
                {errors?.previousProposal?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/* 3. ความเชื่อมโยงกับโครงการอื่น (ถ้ามี) */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              3. ความเชื่อมโยงกับโครงการอื่น (ถ้ามี)
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุความเกี่ยวข้องหรือความเชื่อมโยง
              </label>
              <textarea
                {...register(`relationWithOther`)}
                rows={3}
                className={UI_CLASSES.input}
              />
              <p className="text-xs text-red-500">
                {errors?.relationWithOther?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/* 6. หลักการและเหตุผล */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              6. หลักการและเหตุผล <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ผู้รับทุนสามารถระบุ หลักการและเหตุผล
                เพิ่มเติมนอกเหนือจากที่ระบุไว้ในขอบเขตของงาน (TOR) ได้{" "}
                <span className="text-red-500">(โดยสังเขป)</span>
              </label>
              <textarea
                {...register(`principlesOf`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder="ระบุหลักการและเหตุผลของโครงการ"
              />
              <p className="text-xs text-red-500">
                {errors?.principlesOf?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/* 7. วัตถุประสงค์ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              7. วัตถุประสงค์ <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ผู้รับทุนสามารถระบุ วัตถุประสงค์ของโครงการ
                เพิ่มเติมนอกเหนือจากที่ระบุไว้ในขอบเขตของงาน (TOR) ได้
              </label>
              <textarea
                {...register(`objective`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.objective?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*  8. ขอบเขตการดําเนินงาน */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              8. ขอบเขตการดําเนินงาน <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุขอบเขตของการทำโครงการ
                อย่างน้อยต้องมีหัวข้อและรายละเอียดต่อไปนี้ (๑) แผนการดำเนินงาน
                ต้องมีรายละเอียดเกี่ยวกับแนวคิด แนวทางและวิธีการดำเนินงาน
                และขั้นตอนการทำงานรวมถึงกรอบระยะเวลาดำเนินงานในแต่ละกิจกรรมที่สอดคล้องกับวัตถุประสงค์ของโครงการในแต่ละข้อ
                เพื่อให้ได้ผลตามที่ระบุไว้ในข้อเสนอโครงการ (TOR) (๒)
                การบริหารโครงการ
                ต้องมีรายละเอียดเกี่ยวกับรูปแบบโครงสร้างการดำเนินงานของโครงการพร้อมภาระหน้าที่
                ความรับผิดชอบ และปริมาณงาน (Man-Month) (โดยสังเขป)
              </label>
              <textarea
                {...register(`scopeOfWork`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.scopeOfWork?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*  9. ผลที่คาดว่าจะได้รับ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              9. ผลที่คาดว่าจะได้รับ <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุประโยชน์ที่ได้รับ สิ่งที่ได้รับ กลุ่มเป้าหมาย
                หากโครงการสำเร็จ
              </label>
              <textarea
                {...register(`expectResult`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.expectResult?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*  10. ตัวชี้วัดผลผลิต */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              10. ตัวชี้วัดผลผลิต <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ตัวชี้วัดที่ใช้ประเมินค่าความสำเร็จของโครงการและค่าเป้าหมายที่แสดงถึงความสำเร็จตามวัตถุประสงค์ที่ตั้งไว้
              </label>
              <textarea
                {...register(`kpiOfSuccess`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.kpiOfSuccess?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*  11. ตัวชี้วัดผลลัพธ์ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              11. ตัวชี้วัดผลลัพธ์ <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ผลลัพธ์หรือประโยชน์ที่เกิดจากการนำผลผลิตจากโครงการไปใช้ให้เกิดประโยชน์
              </label>
              <textarea
                {...register(`otherKpiOfSuccess`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.otherKpiOfSuccess?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   12. ทฤษฎี/งานวิจัย/โครงการที่เกี่ยวข้อง (ถ้ามี) */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              12. ทฤษฎี/งานวิจัย/โครงการที่เกี่ยวข้อง (ถ้ามี)
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุข้อมูลทฤษฎีหลักการหรือข้อเท็จจริงต่าง ๆ
                ที่มีความเกี่ยวข้องกับการดำเนินโครงการ หรือที่จะนำมาใช้ในโครงการ
                หรือโครงการที่ได้มีการดำเนินการแล้วในรูปแบบหรือลักษณะเดียวกัน
                อาจเป็นของตัวเองหรือของผู้อื่นหรือหน่วยงานอื่นดำเนินการ
                พร้อมด้วยข้อมูลผลลัพธ์{" "}
                <span className="text-red-500">(โดยสังเขป)</span>
              </label>
              <textarea
                {...register(`theory`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
            </div>
          </div>
        </div>

        {/*  13. กรอบแนวคิด หรือรายละเอียดด้านเทคนิค */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              13. กรอบแนวคิด หรือรายละเอียดด้านเทคนิค{" "}
              <span className="text-red-500">*</span>
            </h4>
          </div>

          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                กรอบแนวคิดเป็นทิศทาง และแนวทางในการทำโครงการ
                แนวทางในการเก็บรวบรวมข้อมูล และการวิเคราะห์ข้อมูล
                ที่สามารถตอบวัตถุประสงค์ของโครงการได้ครบถ้วน
                หรือเทคนิคหลักการที่จะนำมาใช้ในการทำโครงการ{" "}
                <span className="text-red-500">(โดยสังเขป)</span>
              </label>
              <textarea
                {...register(`technicalConcept`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.technicalConcept?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*  14. วิธีการ/ขั้นตอนการดําเนินโครงการ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              14. วิธีการ/ขั้นตอนการดําเนินโครงการ
              <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                อธิบายถึงการทำงานในขั้นตอนต่างๆของโครงการหรือกิจกรรมอย่างละเอียด
                เช่นวิธีการเก็บข้อมูล/การสุ่มตัวอย่าง/
                การทดลอง/การจัดซื้อจัดจ้าง/การติดตั้ง/การอบรม/การประมวลผลข้อมูลและการวิเคราะห์ข้อมูล
                / การประเมินผลโครงการ/ การนำไปใช้ประโยชน์
                ให้ชัดเจน/เขียนแผนงานขั้นตอนการดำเนินโครงการตั้งแต่เริ่มต้นจนกระทั่งสิ้นสุดโครงการโดยระบุรายละเอียดของขั้นตอน
                และกำหนดระยะเวลาเริ่มต้นและสิ้นสุด
                <span className="text-red-500">(โดยสังเขป)</span>
              </label>
              <textarea
                {...register(`stepOfWork`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.stepOfWork?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*  15. ความเสี่ยงของโครงการ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              15. ความเสี่ยงของโครงการ
              <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุความเสี่ยงหรือปัจจัยเสี่ยงที่อาจทำให้โครงการไม่ประสบความสำเร็จหรือเกิดปัญหา
                ความเสี่ยงเรื่องลิขสิทธิ์ ความเสี่ยงต่อสังคมคุณภาพชีวิต คุณธรรม
                จริยธรรม พร้อมทั้งแนวทางการป้องกันหรือแก้ปัญหานั้น
              </label>
              <textarea
                {...register(`risk`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.risk?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   16. สถานที่ดําเนินโครงการ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              16. สถานที่ดําเนินโครงการ
              <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                กำหนดสถานที่ดำเนินการโครงการ สถานที่ทำการทดลอง
                สถานที่ใช้ในการเก็บรวมข้อมูล สถานที่เกี่ยวข้องอื่น ๆ
              </label>
              <textarea
                {...register(`placeOfWork`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.placeOfWork?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   18. งบประมาณสมทบ (ถ้ามี) */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg"> 18. งบประมาณสมทบ (ถ้ามี)</h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุให้ชัดเจนว่าจะใช้จ่ายอะไรบ้าง (ตามภาคผนวก)
                จะต้องระบุให้ชัดเจนว่าหากมีครุภัณฑ์ที่ใช้หลังจากการวิจัยแล้วจะดำเนินการอย่างไร
                หากมีการสมทบจากหน่วยงานต้นสังกัดให้ระบุด้วย
              </label>
              <textarea
                {...register(`otherBudget`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.otherBudget?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   19. บรรณานุกรม/เอกสารอ้างอิง (ถ้ามี) */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              19. บรรณานุกรม/เอกสารอ้างอิง (ถ้ามี)
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุเอกสารอ้างอิงที่เกี่ยวข้อง อันได้แก่ รายชื่อหนังสือ
                สิ่งพิมพ์อื่น ๆ โสตทัศนวัสดุ ตลอดจนวิธีการ
                ที่ได้ข้อมูลมาเพื่อประกอบการจัดทำโครงการ
              </label>
              <textarea
                {...register(`reference`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.reference?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   22. ความยั่งยืนของโครงการ */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              22. ความยั่งยืนของโครงการ
              <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                อธิบายถึงแนวทางหรือข้อเสนอการบริหารงานหลังสิ้นสุดโครงการ
                เพื่อแสดงให้เห็นถึงความยั่งยืนในการนำผลผลิตและผลลัพธ์ที่ได้จากโครงการไปใช้งานให้เกิดประโยชน์สูงสุด
                เช่น
                มีหน่วยงานที่พร้อมให้ความร่วมมือในการนำผลผลิตโครงการไปใช้ให้เกิดประโยชน์หรือมีผู้สนับสนุนงบประมาณในการซ่อมบำรุงอุปกรณ์ในโครงการอย่างต่อเนื่อง
                เป็นต้น
                ทั้งนี้ในกรณีที่จำเป็นต้องขอรับการสนับสนุนงบประมาณสำหรับการจัดซื้อครุภัณฑ์สำหรับใช้งานในโครงการ
                ให้ระบุแผนการใช้ประโยชน์ครุภัณฑ์เมื่อสิ้นสุดโครงการด้วย
              </label>
              <textarea
                {...register(`sustain`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.sustain?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   25. การวิเคราะห์ SWOT */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg">
              {" "}
              25. การวิเคราะห์ SWOT
              <span className="text-red-500">*</span>
            </h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <textarea
                {...register(`swotAnalysis`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.swotAnalysis?.message as string}
              </p>
            </div>
          </div>
        </div>

        {/*   26. ข้อมูลอื่นๆ เพิ่มเติม (ถ้ามี) */}
        <div className="mt-4 rounded-2xl bg-white shadow-sm">
          <div className="flex rounded border-gray-100 bg-blue-50 p-4 text-blue-800">
            <h4 className="mb-2 text-lg"> 26. ข้อมูลอื่นๆ เพิ่มเติม (ถ้ามี)</h4>
          </div>
          <div className="mx-2 grid grid-cols-1 gap-4 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
            <div>
              <label className="text-sm">
                ระบุรายละเอียดข้อมูลโครงการที่เกี่ยวข้องเพิ่มเติม
                ตามแนวคิดและวิธีดำเนินงานโครงการของผู้ขอรับการส่งเสริมและสนับสนุนจากเงินกองทุน
              </label>
              <textarea
                {...register(`otherNote`)}
                rows={3}
                className={UI_CLASSES.input}
                placeholder=""
              />
              <p className="text-xs text-red-500">
                {errors?.otherNote?.message as string}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
