import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useProposalStore, axiosInstance } from "@/lib";
import { Msg } from "@/constants/message";
import { CreateProposalForm } from "../proposal.schema";
import { RESET_FORM_DATA } from "../constants";
import { toStr, mapPerson, mapAddress } from "@/lib/utils";

export const useProposalData = (
  proposalId: number | null,
  methods: UseFormReturn<CreateProposalForm>
) => {
  const router = useRouter();
  const { formData, updateFormData } = useProposalStore();
  
  const [isDataLoaded, setIsDataLoaded] = useState<boolean>(!proposalId);
  const [initialData, setInitialData] = useState<any>(null);

  useEffect(() => {
    const initData = async () => {
      // กรณี Edit Mode (มี ID)
      if (proposalId) {
        // ถ้ามีข้อมูลเดิมอยู่แล้วและเป็น ID เดียวกัน ไม่ต้องโหลดใหม่
        if (initialData?.itemId === proposalId) return;

        try {
          const res = await axiosInstance.get(`/proposal/${proposalId}`);
          if (res.data) {
            const apiData = res.data;
            setInitialData(apiData);

            // Map ข้อมูลทั้งหมดเพื่อป้องกัน null
            const mappedData = {
              ...apiData,
              // 1.1 - 1.2
              organizationName: toStr(apiData.organizationName),
              departmentName: toStr(apiData.departmentName),
              name: toStr(apiData.name),
              nameEn: toStr(apiData.nameEn),
              
              // 1.12
              taxId: toStr(apiData.taxId),
              taxBranchCode: toStr(apiData.taxBranchCode),

              // Step 2 Fields
              principlesOf: toStr(apiData.principlesOf),
              objective: toStr(apiData.objective),
              scopeOfWork: toStr(apiData.scopeOfWork),
              expectResult: toStr(apiData.expectResult),
              kpiOfSuccess: toStr(apiData.kpiOfSuccess),
              otherKpiOfSuccess: toStr(apiData.otherKpiOfSuccess),
              technicalConcept: toStr(apiData.technicalConcept),
              stepOfWork: toStr(apiData.stepOfWork),
              risk: toStr(apiData.risk),
              placeOfWork: toStr(apiData.placeOfWork),
              sustain: toStr(apiData.sustain),
              swotAnalysis: toStr(apiData.swotAnalysis),

              // Person & Address
              resposiiblePerson: mapPerson(apiData.resposiiblePerson),
              authorityPerson: mapPerson(apiData.authorityPerson),
              attorneyPerson: mapPerson(apiData.attorneyPerson),
              contactPerson: mapPerson(apiData.contactPerson),
              
              projectAddress: mapAddress(apiData.projectAddress),
              contactAddress: mapAddress(apiData.contactAddress),

              // IDs & Numbers
              organizationTypeId:
                apiData.organizationTypeId?.toString() || null,
              organizationStatusId:
                apiData.organizationStatusId?.toString() || null,
              vat: apiData.vat?.toString() || null,
              withholdingTax: apiData.withholdingTax?.toString() || null,
              
              // Arrays & Nested Lists
              locations: (apiData.locations || []).map((loc: any) => ({
                ...loc,
                provinceId: toStr(loc.provinceId),
                districtId: toStr(loc.districtId),
                subDistrictId: toStr(loc.subDistrictId),
                moo: toStr(loc.moo),
                community: toStr(loc.community),
              })),

              budget_01: {
                ...apiData.budget_01,
                remark: toStr(apiData.budget_01?.remark),
                details: (apiData.budget_01?.details || []).map((d: any) => ({
                    ...d,
                    note: toStr(d.note),
                    education: toStr(d.education),
                    otherEducation: toStr(d.otherEducation),
                }))
              }
            };

            // อัปเดต Store และ Form
            updateFormData(mappedData);
            methods.reset(mappedData);
          }
        } catch (error) {
          console.error("Fetch error:", error);
          toast.error(Msg.error.notFound);
          router.push("/dashboard");
        } finally {
          setIsDataLoaded(true);
        }
      } else {
        // กรณี Create Mode (ไม่มี ID)
        const currentName = methods.getValues("organizationName");
        if (currentName || formData.organizationName) {
          updateFormData(RESET_FORM_DATA);
          methods.reset(RESET_FORM_DATA);
        }
        setIsDataLoaded(true);
      }
    };

    initData();
  }, [proposalId, methods, updateFormData, router, formData.organizationName, initialData]);

  return { isDataLoaded, initialData };
};