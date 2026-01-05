import { CreateProposalForm } from "./proposal.schema";

// --- Helper Constants for Reset ---
const EMPTY_PERSON = {
  prefix: "",
  firstname: "",
  lastname: "",
  position: "",
  tel: "",
  fax: "",
  email: "",
  age: null as any,
  nationality: "",
  identityDocument: { type: "", no: "", issuedBy: "", issuedProvince: "" },
  address: {
    province: "",
    no: "",
    moo: "",
    village: "",
    road: "",
    district: "",
    subDistrict: "",
    postalCode: "",
  },
};

const EMPTY_ADDRESS = {
  province: "",
  no: "",
  moo: "",
  village: "",
  road: "",
  district: "",
  subDistrict: "",
  postalCode: "",
  tel: "",
  fax: "",
  email: "",
  webSite: "",
};

// --- DATA CONSTANTS (ค่าเริ่มต้นของ Form) ---
export const RESET_FORM_DATA: CreateProposalForm = {
  organizationName: "",
  departmentName: "",
  name: "",
  nameEn: "", // เพิ่ม field นี้เพื่อให้ครบตาม Type CreateProposalForm (ถ้าใน Type มี)
  budget: null as any,
  duration: null as any,
  organizationTypeId: null as any,

  // 1.6 หัวหน้าโครงการ
  resposiiblePerson: { ...EMPTY_PERSON },

  // 1.7 ผู้มีอำนาจกระทำการ (แก้ไข: ลบ isCheck ออก)
  authorityPerson: { ...EMPTY_PERSON },

  // 1.8 ผู้รับมอบอำนาจ (ยังมี Checkbox)
  attorneyPerson: { isCheck: false, ...EMPTY_PERSON },

  // 1.9 ผู้ประสานงาน
  contactPerson: {
    prefix: "",
    firstname: "",
    lastname: "",
    position: "",
    tel: "",
    email: "",
    age: null as any, // เพิ่มเพื่อให้แน่ใจว่าล้างค่า
    nationality: "",
  },

  projectAddress: { ...EMPTY_ADDRESS },
  contactAddress: { isCheck: false, ...EMPTY_ADDRESS },

  taxId: "",
  taxBranchCode: "",
  organizationStatusId: null as any,
  vat: null as any,
  withholdingTax: null as any,
  taxExemption: null as any,

  proposalStatusId: undefined,
  locations: [],

  budget_01: {
    quantity: null as any,
    unitPrice: null as any,
    total: null as any,
    remark: "",
    details: [],
  },
  budgetDetails: [],

  // Step 2 Fields (เพิ่มให้ครบตาม Type)
  principlesOf: "",
  objective: "",
  scopeOfWork: "",
  expectResult: "",
  kpiOfSuccess: "",
  otherKpiOfSuccess: "",
  technicalConcept: "",
  stepOfWork: "",
  risk: "",
  placeOfWork: "",
  sustain: "",
  swotAnalysis: "",
};

export const PROPOSAL_DOCUMENTS = [
  {
    id: 1,
    label:
      "เอกสารแสดงสถานะของหน่วยงานผู้ขอรับทุน ได้แก่ พรบ.จัดตั้งองค์กร หนังสือจดทะเบียนนิติบุคคล หรือ หนังสือจดทะเบียนมูลนิธิหรือสมาคม (ที่ออกโดยหน่วยงานของรัฐ)",
  },
  {
    id: 2,
    label:
      "กรณีผู้มีอำนาจกระทำการด้วยตนเอง หรือ กรณีมอบอำนาจให้ผู้อื่นกระทำการแทน",
    note: [
      "กรณีผู้มีอำนาจกระทำการ เอกสารแนบดังนี้",
      "กรณีมอบอำนาจให้ผู้อื่นกระทำการแทน เอกสารแนบดังนี้",
    ],
  },
  {
    id: 3,
    label:
      "เอกสารแสดงประวัติผู้รับผิดชอบและบุคลากรที่จะดำเนินโครงการหรือกิจกรรม พร้อมส่งรายละเอียดคุณวุฒิประสบการณ์การทำงาน และผลงาน พร้อมลงลายมือชื่อเจ้าของประวัติและวัน เดือน ปี",
  },
  { id: 4, label: "สถานที่ดำเนินโครงการ หมายเหตุ โปรดแนบรูปแผนที่" },
  {
    id: 5,
    label:
      "สรุปผลการดำเนินการที่เกี่ยวข้องกับองค์กร และ/หรือกิจการที่เกี่ยวข้องกับภารกิจด้านกระจายเสียง กิจการโทรทัศน์ และกิจการโทรคมนาคมย้อนหลังไม่น้อยกว่าหนึ่งปี",
  },
  {
    id: 6,
    label:
      "เอกสารรับรองสถานภาพทางการเงินขององค์กร ที่เชื่อถือได้ (หน่วยงานภาครัฐได้รับการยกเว้น)(ข้อมูลด้านภาษี)",
  },
  {
    id: 7,
    label:
      "บัญชีรายชื่อบุคคลซึ่งเป็นกรรมการหรือผู้บริหารขององค์กร พร้อมรายละเอียดเกี่ยวกับ ชื่อ เลขที่บัตรประจำตัวประชาชน ที่อยู่ พร้อมทั้งประวัติรายบุคคล และลงลายมือชื่อเจ้าของประวัติ (หน่วยงานภาครัฐได้รับการยกเว้น)",
  },
  {
    id: 8,
    label: "ข้อมูลรายละเอียดข้อเสนอโครงการตามที่กำหนดในแบบ ทบ.002",
    note: ["แบบแสดงรายละเอียดโครงการ เอกสารแนบดังนี้"],
  },
  { id: 9, label: "เอกสารอื่น ๆ" },
];
