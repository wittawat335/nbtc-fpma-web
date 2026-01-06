"use client";
import { useFormContext } from "react-hook-form";
import { AddressForm } from "./AddressForm";
import { UI_CLASSES } from "@/constants";
import {
  DistrictOption,
  MasterOption,
  ProvinceOption,
  SubDistrictOption,
} from "@/types";
import { getFormError } from "@/lib";

export interface PersonFormProps {
  prefix: string;
  title: string;
  withAddress?: boolean;
  disabled?: boolean;
  titles?: MasterOption[];
  provinces?: ProvinceOption[];
  districts?: DistrictOption[];
  subDistricts?: SubDistrictOption[];
}

export const PersonForm = ({
  prefix,
  title,
  withAddress = true,
  disabled = false,
  titles = [],
  provinces = [],
  districts = [],
  subDistricts = [],
}: PersonFormProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
      <div className="">
        <div className="text-sm font-semibold text-gray-800">{title}</div>
        <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
      </div>
      <div className="space-y-3">
        {/* ชื่อ-นามสกุล */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm">
              คำนำหน้า <span className="text-red-500">*</span>
            </label>
            <select
              disabled={disabled}
              {...register(`${prefix}.prefix`)}
              className={UI_CLASSES.input}
            >
              <option value="">เลือก</option>
              {titles?.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <p className="text-xs text-red-500">
              {getFormError(errors, "prefix", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              ชื่อ <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.firstname`)}
              className={UI_CLASSES.input}
            />
            <p className="text-xs text-red-500">
              {getFormError(errors, "firstname", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              นามสกุล <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.lastname`)}
              className={UI_CLASSES.input}
            />
            <p className="text-xs text-red-500">
              {getFormError(errors, "lastname", prefix)}
            </p>
          </div>
        </div>

        {/* ข้อมูลส่วนตัว */}
        <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
          <div>
            <label className="text-sm">
              ตำแหน่ง <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.position`)}
              className={UI_CLASSES.input}
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "position", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              โทรศัพท์ <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.tel`)}
              className={UI_CLASSES.input}
              placeholder="0xx-xxxxxxx"
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "tel", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              โทรสาร <span className="text-red-600">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.fax`)}
              className={UI_CLASSES.input}
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "fax", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              อีเมล <span className="text-red-500">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.email`)}
              className={UI_CLASSES.input}
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "email", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              อายุ (ปี) <span className="text-red-600">*</span>
            </label>
            <input
              disabled={disabled}
              type="number"
              {...register(`${prefix}.age`)}
              className={UI_CLASSES.input}
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "age", prefix)}
            </p>
          </div>
          <div>
            <label className="text-sm">
              สัญชาติ <span className="text-red-600">*</span>
            </label>
            <input
              disabled={disabled}
              {...register(`${prefix}.nationality`)}
              className={UI_CLASSES.input}
            />
            <p className="mt-1 text-xs text-red-600">
              {getFormError(errors, "nationality", prefix)}
            </p>
          </div>
        </div>

        {/* บัตรประชาชน */}
        {withAddress && (
          <div className="mb-4 grid grid-cols-1 gap-4 md:grid-cols-3">
            <div>
              <label className="text-sm">
                บัตรที่ใช้เป็นหลักฐาน <span className="text-red-500">*</span>
              </label>
              <select
                disabled={disabled}
                {...register(`${prefix}.identityDocument.type`)}
                className={UI_CLASSES.input}
              >
                <option value="บัตรประจำตัวประชาชน">บัตรประจำตัวประชาชน</option>
                <option value="หนังสือเดินทาง">หนังสือเดินทาง</option>
              </select>
              <p className="mt-1 text-xs text-red-600">
                {getFormError(errors, "type", `${prefix}.identityDocument`)}
              </p>
            </div>
            <div>
              <label className="text-sm">
                เลขที่บัตร/หนังสือเดินทาง{" "}
                <span className="text-red-500">*</span>
              </label>
              <input
                disabled={disabled}
                {...register(`${prefix}.identityDocument.no`)}
                className={UI_CLASSES.input}
                placeholder="x-xxxx-xxxxx-xx-x"
              />
              <p className="mt-1 text-xs text-red-600">
                {getFormError(errors, "no", `${prefix}.identityDocument`)}
              </p>
            </div>
            <div>
              <label className="text-sm">
                ออกให้โดย <span className="text-red-600">*</span>
              </label>
              <input
                disabled={disabled}
                {...register(`${prefix}.identityDocument.issuedBy`)}
                className={UI_CLASSES.input}
              />
              <p className="mt-1 text-xs text-red-600">
                {getFormError(errors, "issuedBy", `${prefix}.identityDocument`)}
              </p>
            </div>
          </div>
        )}

        {withAddress && (
          <AddressForm
            prefix={`${prefix}.address`}
            title="ที่อยู่ตามบัตรประชาชน/ทะเบียนบ้าน"
            disabled={disabled}
            provinces={provinces}
            districts={districts}
            subDistricts={subDistricts}
          />
        )}
      </div>
    </div>
  );
};