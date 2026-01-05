"use client";
import React from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { CreateProposalForm } from "../proposal.schema";
import { useMasterData } from "@/hooks/useMasterData";
import { ProposalDocuments } from "./ProposalDocuments";
import { AddressForm } from "./forms/AddressForm";
import { PersonForm } from "./forms/PersonForm";
import { GeneralProjectInfo } from "./forms/GeneralProjectInfo";
import { TaxInfoForm } from "./forms/TaxInfoForm";
import { CertificationSection } from "./sections/CertificationSection";
import ProposalFormSkeleton from "./ProposalFormSkeleton";
import { useSyncAddress } from "../hooks";
import { UI_CLASSES } from "@/constants";
import { Proposals } from "@/types";

interface Step1Props {
  data?: Proposals;
  proposalId?: number | string | null;
}

export default function Step1({ data, proposalId }: Step1Props) {
  const { register, control } = useFormContext<CreateProposalForm>();
  const { data: titles } = useMasterData("prefix");
  const { data: provinces } = useMasterData("province");
  const { data: districts } = useMasterData("district");
  const { data: subDistricts } = useMasterData("subDistrict");
  const isMasterDataReady = titles && provinces && districts && subDistricts;
  const { sameContactAddress } = useSyncAddress();
  const hasAttorney = useWatch({ control, name: "attorneyPerson.isCheck" });

  if (!isMasterDataReady) {
    return <ProposalFormSkeleton />;
  }

  return (
    <div className="animate-fade-in space-y-8 font-sans">
      <div className="rounded-2xl bg-white shadow-sm">
        <div className="flex rounded border-gray-100 bg-blue-50 p-4 pb-3 text-blue-800">
          <h4 className="mb-2 text-lg">
            {" "}
            ส่วนที่ 1 ข้อมูลขอรับการส่งเสริมและสนับสนุนเงินจากกองทุน
          </h4>
        </div>

        {/* 1.1 - 1.5 ข้อมูลทั่วไป */}
        <GeneralProjectInfo />

        {/* 1.6 หัวหน้าโครงการ */}
        <PersonForm
          prefix="resposiiblePerson"
          title="1.6 ชื่อหัวหน้าโครงการ (ผู้รับผิดชอบโครงการ)"
          titles={titles}
          provinces={provinces}
          districts={districts}
          subDistricts={subDistricts}
        />

        {/* 1.7 ผู้มีอำนาจกระทำการ */}
        <PersonForm
          prefix="authorityPerson"
          title="1.7 ชื่อผู้มีอำนาจกระทำการ"
          titles={titles}
          provinces={provinces}
          districts={districts}
          subDistricts={subDistricts}
        />

        {/* 1.8 ผู้รับมอบอำนาจ */}
        <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
          <div className="mb-4 flex items-center gap-2 pb-3">
            <div className="">
              <div className="text-sm font-semibold text-gray-800">
                {" "}
                1.8 ชื่อผู้รับมอบอำนาจ
              </div>
              <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
            </div>
            <label className="flex cursor-pointer items-center gap-2 rounded border border-blue-200 bg-blue-50 px-3 py-1">
              <input type="checkbox" {...register("attorneyPerson.isCheck")} />
              <span className="text-sm text-blue-800">มีผู้รับมอบอำนาจ</span>
            </label>
          </div>

          {hasAttorney && (
            <div className="animate-fade-in-down">
              <PersonForm
                prefix="attorneyPerson"
                title="ข้อมูลผู้รับมอบอำนาจ"
                titles={titles}
                provinces={provinces}
                districts={districts}
                subDistricts={subDistricts}
              />
            </div>
          )}
        </div>

        {/* 1.9 ผู้ติดต่อประสานงาน */}
        <PersonForm
          prefix="contactPerson"
          title="1.9 ชื่อบุคคลที่สามารถติดต่อได้ (ผู้ประสานงาน)"
          withAddress={false}
          titles={titles}
          provinces={provinces}
          districts={districts}
          subDistricts={subDistricts}
        />

        {/* 1.10 สถานที่ตั้งของโครงการ */}
        <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
          <div className="">
            <div className="text-sm font-semibold text-gray-800">
              {" "}
              1.10 สถานที่ตั้งของโครงการ
            </div>
            <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
          </div>
          <div className="space-y-3">
            <AddressForm
              prefix="projectAddress"
              provinces={provinces}
              districts={districts}
              subDistricts={subDistricts}
            />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-4">
              <div>
                <label className="text-sm">โทรศัพท์</label>
                <input
                  {...register("projectAddress.tel")}
                  className={UI_CLASSES.input}
                />
              </div>
              <div>
                <label className="text-sm">โทรสาร</label>
                <input
                  {...register("projectAddress.fax")}
                  className={UI_CLASSES.input}
                />
              </div>
              <div>
                <label className="text-sm">อีเมล</label>
                <input
                  {...register("projectAddress.email")}
                  className={UI_CLASSES.input}
                />
              </div>
              <div>
                <label className="text-sm">เว็บไซต์</label>
                <input
                  {...register("projectAddress.webSite")}
                  className={UI_CLASSES.input}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 1.11 สถานที่ติดต่อ */}
        <div className="mx-2 space-y-6 rounded-xl bg-white px-6 py-4 md:mx-5">
          <div className="mb-4 flex items-end justify-between gap-4">
            <div>
              <div className="text-sm font-semibold text-gray-800">
                1.11 สถานที่ติดต่อ
              </div>
              <div className="mt-1 h-[2px] w-10 rounded bg-blue-500/70" />
            </div>

            <label className="flex cursor-pointer items-center gap-2">
              <input
                type="checkbox"
                {...register("contactAddress.isCheck")}
                className="accent-blue-600"
              />
              <span className="text-xs text-gray-600">
                ที่อยู่เดียวกับสถานที่ตั้งของโครงการ
              </span>
            </label>
          </div>

          <div className="space-y-3">
            <AddressForm
              prefix="contactAddress"
              disabled={sameContactAddress}
              provinces={provinces}
              districts={districts}
              subDistricts={subDistricts}
            />
            <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
              <div>
                <label className="text-sm">โทรศัพท์</label>
                <input
                  disabled={sameContactAddress}
                  {...register("contactAddress.tel")}
                  className={UI_CLASSES.input}
                />
              </div>
              <div>
                <label className="text-sm">โทรสาร</label>
                <input
                  disabled={sameContactAddress}
                  {...register("contactAddress.fax")}
                  className={UI_CLASSES.input}
                />
              </div>
            </div>
          </div>
        </div>

        {/* 1.12 ข้อมูลภาษี */}
        <TaxInfoForm />
      </div>
      {/* ส่วนที่ 2 รายการเอกสาร */}
      <ProposalDocuments
        proposalId={proposalId}
        initialFiles={data?.proposalFiles}
      />

      {/* ส่วนที่ 3 คำรับรอง */}
      <CertificationSection />

      <div className="mt-6 text-center">
        <p className="text-sm font-bold text-red-600">
          กรุณาเซ็นเอกสารในส่วนนี้หลังจากพิมพ์แบบคำขอ
        </p>
      </div>
    </div>
  );
}
