import { z } from "zod";

export const LoginSchema = z.object({
  username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้งาน" }),
  password: z.string().min(1, { message: "กรุณากรอกรหัสผ่าน" }),
});

// ส่วนที่เพิ่มใหม่สำหรับหน้าลงทะเบียน
export const registerSchema = z.object({
  firstName: z.string().min(1, { message: "กรุณากรอกชื่อจริง" }),
  lastName: z.string().min(1, { message: "กรุณากรอกนามสกุล" }),
  username: z.string().min(1, { message: "กรุณากรอกชื่อผู้ใช้งาน" }),
  email: z.string().min(1, { message: "กรุณากรอกอีเมล" }).email({ message: "รูปแบบอีเมลไม่ถูกต้อง" }),
  password: z.string().min(6, { message: "รหัสผ่านต้องมีความยาวอย่างน้อย 6 ตัวอักษร" }),
  confirmPassword: z.string().min(1, { message: "กรุณายืนยันรหัสผ่าน" }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "รหัสผ่านไม่ตรงกัน",
  path: ["confirmPassword"], // แสดง error ที่ช่อง confirmPassword
});

export type RegisterSchema = z.infer<typeof registerSchema>;

export type LoginInput = z.infer<typeof LoginSchema>;
