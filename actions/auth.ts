"use server";

import { LoginSchema } from "@/lib/definitions";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import * as z from "zod";

export async function login(values: z.infer<typeof LoginSchema>) {
  // 1. Validate ฝั่ง Server อีกครั้งเพื่อความชัวร์
  const validatedFields = LoginSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "ข้อมูลไม่ถูกต้อง" };
  }

  const { email, password } = validatedFields.data;

  try {
    // สมมติว่า Backend ส่ง Token กลับมา
    const fakeToken = "1703a68b3684c425c4ea1f4bd3986e371c9f2f556fb59397cc9702f0cc8cd394";

    // 3. ฝัง Cookie (HTTP Only) เพื่อความปลอดภัย
    // การใช้ cookies() ใน Server Action จะทำได้ทันที
    cookies().set("session_token", fakeToken, {
      httpOnly: true, // Client อ่านไม่ได้ (ป้องกัน XSS)
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60 * 24 * 7, // 1 สัปดาห์
      path: "/",
    });
  } catch (error) {
    return { error: "เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์" };
  }

  // 4. Redirect ไปหน้า Dashboard (ต้องทำนอก try/catch ใน Next.js)
  redirect("/dashboard");
}

export async function logout() {
  const cookieStore = await cookies();
  
  cookieStore.delete("session_token");

  redirect("/login");
}
