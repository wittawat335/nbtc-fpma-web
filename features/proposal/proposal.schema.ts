import { z } from "zod";
import { Msg } from "@/constants";

// --- Shared Schemas ---

export const IdentityDocumentSchema = z.object({
  type: z.string().min(1, Msg.selection),
  no: z.string().min(1, Msg.required),
  issuedBy: z.string().min(1, Msg.required),
  issuedProvince: z.string().optional(),
});

export const AddressSchema = z.object({
  province: z.string().min(1, Msg.proposal.location.province),
  no: z.string().min(1, Msg.required),
  moo: z.string().min(1, Msg.required),
  village: z.string().min(1, Msg.required),
  road: z.string().min(1, Msg.required),
  district: z.string().min(1, Msg.proposal.location.district),
  subDistrict: z.string().min(1, Msg.proposal.location.subDistrict),
  postalCode: z.string().min(1, Msg.required),
});

// Extends AddressDto
export const LocationAddressSchema = AddressSchema.extend({
  tel: z.string().min(1, Msg.required),
  fax: z.string().min(1, Msg.required),
  email: z.string().min(1, Msg.required).email(Msg.email),
  webSite: z.string().min(1, Msg.required),
});

// Extends LocationAddressDto
export const ContactAddressSchema = LocationAddressSchema.extend({
  isCheck: z.boolean().optional(),
});

export const PersonSchema = z.object({
  prefix: z.string().min(1, Msg.person.prefix),
  firstname: z.string().min(1, Msg.person.firstname),
  lastname: z.string().min(1, Msg.person.lastname),
  position: z.string().min(1, Msg.person.position),
  tel: z.string().min(1, Msg.required),
  fax: z.string().min(1, Msg.required),
  email: z.string().min(1, Msg.required).email(Msg.email),
  age: z.coerce.number().min(1, Msg.required),
  nationality: z.string().min(1, Msg.required),
  identityDocument: IdentityDocumentSchema,
  address: AddressSchema,
});

// --- Modified: MandatePersonSchema ---
export const MandatePersonSchema = z
  .object({
    isCheck: z.boolean().optional(),
    prefix: z.string().optional(),
    firstname: z.string().optional(),
    lastname: z.string().optional(),
    position: z.string().optional(),
    tel: z.string().optional(),
    fax: z.string().optional(),
    email: z.string().optional(),
    age: z.coerce.number().optional(),
    nationality: z.string().optional(),
    identityDocument: IdentityDocumentSchema.optional(),
    address: AddressSchema.optional(),
  })
  .superRefine((data, ctx) => {
    if (data.isCheck) {
      if (!data.prefix || data.prefix.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: Msg.person.prefix,
          path: ["prefix"],
        });
      }
      if (!data.firstname || data.firstname.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: Msg.person.firstname,
          path: ["firstname"],
        });
      }
      if (!data.lastname || data.lastname.trim() === "") {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: Msg.person.lastname,
          path: ["lastname"],
        });
      }

      if (data.email && data.email.trim() !== "") {
        const emailResult = z.string().email().safeParse(data.email);
        if (!emailResult.success) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: Msg.email,
            path: ["email"],
          });
        }
      }
    }
  });

export const ContactPersonSchema = PersonSchema.pick({
  prefix: true,
  firstname: true,
  lastname: true,
  position: true,
  tel: true,
  email: true,
});

// --- Step 3: Location Schema ---
export const ProposalLocationSchema = z.object({
  provinceId: z.coerce.string().min(1, Msg.proposal.location.provinceId),
  districtId: z.coerce.string().min(1, Msg.proposal.location.districtId),
  subDistrictId: z.coerce.string().min(1, Msg.proposal.location.subDistrictId),
  moo: z.string().optional(),
  community: z.string().optional(),
});

export const BudgetDetailSchema = z
  .object({
    note: z.string().min(1, Msg.proposal.budgetDetail.note),
    quantity: z.coerce.number().min(1, Msg.proposal.budgetDetail.quantity),
    unitPrice: z.coerce.number().min(1, Msg.proposal.budgetDetail.unitPrice),
    total: z.coerce.number(),
    education: z.string().min(1, Msg.selection),
    otherEducation: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    if (data.education === "4") {
      if (!data.otherEducation || data.otherEducation.trim() === "") {
        ctx.addIssue({
          path: ["otherEducation"],
          message: Msg.proposal.budgetDetail.other,
          code: z.ZodIssueCode.custom,
        });
      }
    }
  });

export const Budget01Schema = z.object({
  quantity: z.coerce.number().min(1, Msg.proposal.budget01.quantity),
  unitPrice: z.coerce.number().min(1, Msg.proposal.budget01.unitPrice),
  total: z.coerce.number(),
  remark: z.string().min(1, Msg.proposal.budget01.remark),
  details: z.array(BudgetDetailSchema).min(1, Msg.proposal.budget01.details),
});

export const CreateProposalSchema = z.object({
  // 1.1
  organizationName: z.string().min(1, Msg.proposal.orgName),
  departmentName: z.string().min(1, Msg.proposal.departmentName),

  // 1.2
  name: z.string().min(1, Msg.proposal.projectName),
  nameEn: z.string().min(1, Msg.proposal.projectName),

  // 1.3 & 1.4
  budget: z.coerce.number().min(1, Msg.proposal.budget),
  duration: z.coerce.number().min(1, Msg.proposal.duration),

  // 1.5
  organizationTypeId: z.string().min(1, Msg.selection),

  // 1.6 - 1.11
  resposiiblePerson: PersonSchema,

  // 1.7
  authorityPerson: PersonSchema,

  // 1.8
  attorneyPerson: MandatePersonSchema.optional(),

  contactPerson: ContactPersonSchema.optional(),

  projectAddress: LocationAddressSchema,
  contactAddress: ContactAddressSchema,

  // 1.12
  taxId: z.string().min(1, Msg.required),
  taxBranchCode: z.string().min(1, Msg.proposal.taxBranchCode),
  organizationStatusId: z.coerce.string().min(1, Msg.selection),
  vat: z.coerce.string().min(1, Msg.selection),
  withholdingTax: z.coerce.string().min(1, Msg.selection),
  taxExemption: z.coerce.number().optional(),

  proposalStatusId: z.coerce.number().optional(),

  // Step 3
  locations: z.array(ProposalLocationSchema).optional(),

  // Budget 01
  budget_01: Budget01Schema,

  // Budget
  budgetDetails: z
    .array(
      z.object({
        section: z.number(),
        description: z.string(),
        unit: z.coerce.number(),
        price: z.coerce.number(),
        total: z.coerce.number(),
      }),
    )
    .optional(),

  // Step 2
  principlesOf: z.string().min(1, Msg.proposal.step2.principlesOf),
  objective: z.string().min(1, Msg.proposal.step2.objective),
  scopeOfWork: z.string().min(1, Msg.proposal.step2.scopeOfWork),
  expectResult: z.string().min(1, Msg.proposal.step2.expectResult),
  kpiOfSuccess: z.string().min(1, Msg.proposal.step2.kpiOfSuccess),
  otherKpiOfSuccess: z.string().min(1, Msg.proposal.step2.otherKpiOfSuccess),
  technicalConcept: z.string().min(1, Msg.proposal.step2.technicalConcept),
  stepOfWork: z.string().min(1, Msg.proposal.step2.stepOfWork),
  risk: z.string().min(1, Msg.proposal.step2.risk),
  placeOfWork: z.string().min(1, Msg.proposal.step2.placeOfWork),
  sustain: z.string().min(1, Msg.proposal.step2.sustain),
  swotAnalysis: z.string().min(1, Msg.proposal.step2.swotAnalysis),
});

export type CreateProposalForm = z.infer<typeof CreateProposalSchema>;
