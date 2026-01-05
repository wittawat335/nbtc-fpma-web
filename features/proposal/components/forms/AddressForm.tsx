"use client";
import { UI_CLASSES } from "@/constants";
import { useFormContext, useWatch } from "react-hook-form";
import { useEffect, useMemo } from "react";
import { DistrictOption, ProvinceOption, SubDistrictOption } from "@/types";

export interface AddressFormProps {
  prefix: string;
  title?: string;
  disabled?: boolean;
  provinces?: ProvinceOption[];
  districts?: DistrictOption[];
  subDistricts?: SubDistrictOption[];
}

export const AddressForm = ({
  prefix,
  title,
  disabled = false,
  provinces = [],
  districts = [],
  subDistricts = [],
}: AddressFormProps) => {
  const { register, control, setValue } = useFormContext();

  const selectedProvinceCode = useWatch({
    control,
    name: `${prefix}.province`,
  });

  const selectedDistrictCode = useWatch({
    control,
    name: `${prefix}.district`,
  });

  const filteredDistricts = useMemo(() => {
    if (!selectedProvinceCode) return [];

    return districts.filter(
      (d: DistrictOption) => String(d.provinceId) === String(selectedProvinceCode),
    );
  }, [selectedProvinceCode, districts]);

  const filteredSubDistricts = useMemo(() => {
    if (!selectedDistrictCode) return [];

    return subDistricts.filter(
      (s: SubDistrictOption) => String(s.districtsId) === String(selectedDistrictCode),
    );
  }, [selectedDistrictCode, subDistricts]);

  useEffect(() => {
    if (selectedDistrictCode && filteredDistricts.length > 0) {
      const isValid = filteredDistricts.some(
        (d: DistrictOption) => String(d.value) === String(selectedDistrictCode),
      );
      if (!isValid) {
        setValue(`${prefix}.district`, "");
        setValue(`${prefix}.subDistrict`, "");
      }
    } else if (!selectedProvinceCode && selectedDistrictCode) {
      setValue(`${prefix}.district`, "");
      setValue(`${prefix}.subDistrict`, "");
    }
  }, [
    selectedProvinceCode,
    filteredDistricts,
    selectedDistrictCode,
    setValue,
    prefix,
  ]);

  return (
    <div className="mt-4 rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50 via-sky-50 to-red-50/40 bg-[length:200%_200%] bg-[position:0%_0%] p-5 transition-all duration-700 ease-out hover:bg-[position:100%_100%]">
      {title && (
        <h5 className="mb-4 text-sm font-semibold text-blue-900">{title}</h5>
      )}

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <label className="text-sm text-gray-700">
            บ้านเลขที่ <span className="text-red-600">*</span>
          </label>
          <input
            disabled={disabled}
            {...register(`${prefix}.no`)}
            className={UI_CLASSES.input}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">หมู่ที่</label>
          <input
            disabled={disabled}
            {...register(`${prefix}.moo`)}
            className={UI_CLASSES.input}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">อาคาร/หมู่บ้าน</label>
          <input
            disabled={disabled}
            {...register(`${prefix}.village`)}
            className={UI_CLASSES.input}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">ถนน</label>
          <input
            disabled={disabled}
            {...register(`${prefix}.road`)}
            className={UI_CLASSES.input}
          />
        </div>

        <div>
          <label className="text-sm text-gray-700">
            จังหวัด <span className="text-red-600">*</span>
          </label>
          <select
            disabled={disabled}
            {...register(`${prefix}.province`)}
            className={UI_CLASSES.input}
          >
            <option value="">เลือก</option>
            {provinces?.map((option: ProvinceOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700">อำเภอ/เขต</label>
          <select
            disabled={disabled}
            {...register(`${prefix}.district`)}
            className={UI_CLASSES.input}
          >
            <option value="">เลือก</option>
            {filteredDistricts.map((option: DistrictOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700">ตำบล/แขวง</label>
          <select
            disabled={disabled}
            {...register(`${prefix}.subDistrict`)}
            className={UI_CLASSES.input}
          >
            <option value="">เลือก</option>
            {filteredSubDistricts.map((option: SubDistrictOption) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="text-sm text-gray-700">รหัสไปรษณีย์</label>
          <input
            disabled={disabled}
            {...register(`${prefix}.postalCode`)}
            className={UI_CLASSES.input}
          />
        </div>
      </div>
    </div>
  );
};
