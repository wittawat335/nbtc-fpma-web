"use client";

import React from "react";
import { FormProvider } from "react-hook-form";
import ProposalFormSkeleton from "@/features/proposal/components/ProposalFormSkeleton";
import { useCreateProposal } from "@/features/proposal/hooks/useCreateProposal";
import Stepper from "@/features/proposal/components/Stepper";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

interface ProposalFormContainerProps {
  proposalId?: number;
}

export default function ProposalFormContainer({
  proposalId,
}: ProposalFormContainerProps) {
  const {
    methods,
    currentStep,
    initialData,
    isDataLoaded,
    showConfirmModal,
    setShowConfirmModal,
    showSuccessModal,
    setShowSuccessModal,
    onSubmitForm,
    onValidationErr,
    handleConfirmSubmit,
    handleBack,
    handleSaveDraft,
    handleNext,
    router,
  } = useCreateProposal(proposalId);

  if (!isDataLoaded) return <ProposalFormSkeleton />;

  return (
    <div className="animate-fade-in container mx-auto p-6">
      {/* Stepper */}
      <div className="mb-8">
        <Stepper currentStep={currentStep} />
      </div>

      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmitForm as any, onValidationErr)}
        >
          {currentStep === 1 && (
            <Step1 data={initialData} proposalId={proposalId} />
          )}
          {currentStep === 2 && <Step2 />}
          {currentStep === 3 && <Step3 />}

          <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
            {/* ซ้าย: ย้อนกลับ */}
            {currentStep > 1 && (
              <button
                type="button"
                onClick={handleBack}
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
              >
                ย้อนกลับ
              </button>
            )}

            {/* กลาง: ยกเลิก / บันทึกแบบร่าง */}
            <div className="flex gap-3">
              {currentStep === 1 && (
                <button
                  type="button"
                  onClick={() => router.push("/dashboard")}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:border-gray-400 hover:bg-gray-50 focus:ring-2 focus:ring-gray-200 focus:outline-none"
                >
                  ยกเลิก
                </button>
              )}

              <button
                type="button"
                onClick={handleSaveDraft}
                className="inline-flex items-center rounded-lg border border-blue-400 bg-white px-5 py-2.5 text-sm font-medium text-blue-700 transition hover:border-blue-500 hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 focus:outline-none"
              >
                บันทึกแบบร่าง
              </button>
            </div>

            {/* ขวา: ถัดไป / ยืนยัน */}
            {currentStep < 3 ? (
              <button
                type="button"
                onClick={handleNext}
                className="inline-flex items-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                ถัดไป
              </button>
            ) : (
              <button
                type="submit"
                className="inline-flex items-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 px-6 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:from-blue-700 hover:to-blue-800 focus:ring-2 focus:ring-blue-300 focus:outline-none"
              >
                ยืนยันการส่ง
              </button>
            )}
          </div>
        </form>
      </FormProvider>

      {/* [UPDATED] ใช้ AlertDialog แทน Modal เดิม */}
      <AlertDialog open={showConfirmModal} onOpenChange={setShowConfirmModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>ยืนยันการส่งข้อมูล</AlertDialogTitle>
            <AlertDialogDescription>
              คุณต้องการยืนยันการส่งข้อมูลใช่หรือไม่? ข้อมูลจะถูกส่งไปยังเจ้าหน้าที่เพื่อดำเนินการตรวจสอบ
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>ยกเลิก</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirmSubmit}
              className="bg-blue-600 hover:bg-blue-700"
            >
              ยืนยัน
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* [UPDATED] Success Dialog */}
      <AlertDialog 
        open={showSuccessModal} 
        onOpenChange={(open) => {
          if (!open) {
            setShowSuccessModal(false);
            router.push("/dashboard");
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="text-green-600">ส่งข้อมูลสำเร็จ</AlertDialogTitle>
            <AlertDialogDescription>
              ข้อมูลถูกส่งให้เจ้าหน้าที่เรียบร้อยแล้ว
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => {
                setShowSuccessModal(false);
                router.push("/dashboard");
              }}
              className="bg-green-600 hover:bg-green-700"
            >
              รับทราบ
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}