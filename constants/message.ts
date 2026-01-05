export const Msg = {
  // ข้อความทั่วไป (Generic)
  required: "กรุณาระบุข้อมูล",
  emailFormat: "รูปแบบอีเมลไม่ถูกต้อง",
  select: "กรุณาเลือกข้อมูล",

  // [NEW] ข้อความสำหรับ Label หรือ Placeholder ทั่วไป
  label: {
    username: "ชื่อผู้ใช้งาน",
    password: "รหัสผ่าน",
    rememberMe: "บันทึกการใช้งาน",
    forgotPassword: "ลืมรหัสผ่าน?",
    exampleUser: "เช่น operator01",
    maskPassword: "••••••••",
  },

  // [NEW] ข้อความสำหรับปุ่มกด (Buttons)
  button: {
    login: "เข้าสู่ระบบ",
    loggingIn: "กำลังเข้าสู่ระบบ...",
    back: "ย้อนกลับ",
    next: "ถัดไป",
    cancel: "ยกเลิก",
    saveDraft: "บันทึกแบบร่าง",
    submit: "ยืนยันการส่ง",
    acknowledge: "รับทราบ",
    confirm: "ยืนยัน",
    delete: "ลบรายการ",
  },

  // เกี่ยวกับ Authentication
  auth: {
    username: "กรุณากรอกชื่อผู้ใช้งาน",
    password: "กรุณากรอกรหัสผ่าน",
    passwordMinLength: (min: number) =>
      `รหัสผ่านต้องมีความยาวอย่างน้อย ${min} ตัวอักษร`,
    passwordMismatch: "รหัสผ่านไม่ตรงกัน",
    confirmPassword: "กรุณายืนยันรหัสผ่าน",
    firstName: "กรุณากรอกชื่อจริง",
    lastName: "กรุณากรอกนามสกุล",
    email: "กรุณากรอกอีเมล",
    loginFailed: "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง",
    registerSuccess: "ลงทะเบียนสำเร็จ",
  },

  // เกี่ยวกับข้อมูลบุคคล (Proposal / Person)
  person: {
    prefix: "ระบุคำนำหน้า",
    firstname: "ระบุชื่อจริง", // Updated from ProposalValidation
    lastname: "ระบุนามสกุล",
    position: "ระบุตำแหน่ง",
  },

  // เกี่ยวกับโครงการ (Proposal)
  proposal: {
    orgName: "ระบุชื่อหน่วยงาน",
    projectName: "ระบุชื่อโครงการ",
    budget: "ระบุงบประมาณ",
    duration: "ระบุระยะเวลา",
    taxBranchCode: "ระบุรหัสสาขาภาษี", // [NEW] from ProposalValidation

    // Step 2: รายละเอียดโครงการ (Merged from ProposalValidation)
    step2: {
      principlesOf: "ระบุหลักการและเหตุผล",
      objective: "ระบุวัตถุประสงค์",
      scopeOfWork: "ระบุขอบเขตการดำเนินงาน",
      expectResult: "ระบุผลที่คาดว่าจะได้รับ",
      kpiOfSuccess: "ระบุตัวชี้วัด (Output)",
      otherKpiOfSuccess: "ระบุตัวชี้วัด (Outcome)",
      technicalConcept: "ระบุกรอบแนวคิด",
      stepOfWork: "ระบุขั้นตอนการดำเนินงาน",
      risk: "ระบุความเสี่ยง",
      placeOfWork: "ระบุสถานที่",
      sustain: "ระบุความยั่งยืน",
      swotAnalysis: "ระบุ SWOT Analysis",
    },

    // Location
    location: {
      province: "กรุณาเลือกจังหวัด", // or "เลือกจังหวัด"
      district: "กรุณาเลือกอำเภอ", // or "เลือกอำเภอ"
      subDistrict: "กรุณาเลือกตำบล", // or "เลือกตำบล"
      requireOne: "กรุณาระบุพื้นที่อย่างน้อย 1 แห่ง",
      provinceId: "เลือกจังหวัด", // [NEW] for validation usage
      districtId: "เลือกอำเภอ", // [NEW] for validation usage
      subDistrictId: "เลือกตำบล", // [NEW] for validation usage
    },

    // Budget 01 (Merged from ProposalValidation)
    budget01: {
      quantity: "ระบุจำนวน (คน)",
      unitPrice: "ระบุราคาต่อหน่วย",
      remark: "ระบุหมายเหตุ",
      details: "ต้องมีอย่างน้อย 1 รายการ",
    },

    // Budget Detail (Merged from ProposalValidation)
    budgetDetail: {
      note: "ระบุรายการ",
      quantity: "ระบุจำนวน",
      unitPrice: "ระบุราคา",
      other: "ระบุอื่นๆ",
      remark: "ระบุหมายเหตุ", // Legacy support
      price: "ระบุจำนวนเงินต่อคน(บาท)", // Legacy support
      itemRequired: "ต้องมีอย่างน้อย 1 รายการ", // Legacy support
    },
  },

  // เกี่ยวกับเอกสาร (Document)
  document: {
    fileRequired: "ต้องมีไฟล์อย่างน้อย 1 ไฟล์",
    fileUploadSuccess: "อัปโหลดสำเร็จ",
    fileUploadFailed: "อัปโหลดไม่สำเร็จ",
    fileUploadWarning: "กรุณาเลือกไฟล์ก่อนกดปุ่ม Add",
  },

  // เกี่ยวกับสถานะ (Status)
  status: {
    draft: "แบบคำขอฉบับร่าง",
    submitted: "แบบคำขอฉบับส่ง",
    approved: "แบบคำขอฉบับอนุมัติ",
    rejected: "แบบคำขอฉบับไม่อนุมัติ",
    cancelled: "แบบคำขอฉบับยกเลิก",
  },

  // เกี่ยวกับข้อผิดพลาด (Error)
  error: {
    unknown: "เกิดข้อผิดพลาดไม่ทราบสาเหตุ",
    network: "ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้",
    timeout: "การเชื่อมต่อหมดเวลา",
    notFound: "ไม่พบข้อมูล",
    forbidden: "ไม่สามารถเข้าถึงข้อมูลได้",
    serverError: "เกิดข้อผิดพลาดในเซิร์ฟเวอร์",
    saveFailed: "เกิดข้อผิดพลาดในการบันทึก",
    validationFailed: "กรุณากรอกข้อมูลให้ครบถ้วน",
  },

  // เกี่ยวกับข้อความแจ้งเตือน (Alert)
  alert: {
    success: "สำเร็จ",
    error: "เกิดข้อผิดพลาด",
    warning: "คำเตือน",
    info: "ข้อมูล",
    loading: "กำลังเตรียมข้อมูล...",
    saving: "กำลังบันทึกข้อมูล",
    savingFailed: "เกิดข้อผิดพลาดในการบันทึก",
    savingSuccess: "บันทึกข้อมูลสำเร็จ",
    savedDraftSuccess: "บันทึกฉบับร่างเรียบร้อยแล้ว",
    savedSuccess: "บันทึกข้อมูลเรียบร้อยแล้ว",
    confirm: "ยืนยัน",
    confirmMessage: "คุณต้องการบันทึกข้อมูลใช่หรือไม่",

    // [NEW] Modal Messages
    confirmSubmitTitle: "ยืนยันการส่งข้อมูล",
    confirmSubmitMessage: "คุณต้องการยืนยันการส่งข้อมูลใช่หรือไม่?",
    submitSuccessTitle: "ส่งข้อมูลสำเร็จ",
    submitSuccessMessage: "ข้อมูลถูกส่งให้เจ้าหน้าที่เรียบร้อยแล้ว",
  },

  // Common (Legacy support)
  email: "อีเมลไม่ถูกต้อง",
  number: "ระบุเป็นตัวเลข",
  selection: "กรุณาเลือกข้อมูล",

  // States
  saving: "กำลังบันทึก...",
  saved: "บันทึกสำเร็จ",
  loading: "กำลังโหลด...",

  // Errors (Legacy support)
  saveFailed: "บันทึกไม่สำเร็จ",
  loadFailed: "โหลดข้อมูลไม่สำเร็จ",
  validationFailed: "ข้อมูลไม่ถูกต้อง กรุณาตรวจสอบ",
  loginFailed: "User/Password ไม่ถูกต้อง",
  notFound: "ไม่พบข้อมูล",

  // Specific Actions
  delete: "ลบรายการ",
  confirmDelete: "ยืนยันการลบข้อมูล?",
  deleted: "ลบข้อมูลสำเร็จ",
} as const;
