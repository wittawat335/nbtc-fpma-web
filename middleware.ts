import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("session_token")?.value;
  const { pathname, search } = request.nextUrl;

  // 1. กำหนด Path ที่เป็นข้อยกเว้น (เข้าได้แม้ไม่มี Token)
  // หมายเหตุ: ไม่ใส่ "/" เพราะเราต้องการให้หน้าแรกเด้งไป Login ด้วยถ้าไม่มี Token
  const publicPaths = ["/login", "/register"];
  
  // เช็คว่า path ปัจจุบันอยู่ในรายการข้อยกเว้นหรือไม่
  const isPublicPath = publicPaths.some((path) => pathname.startsWith(path));

  // -------------------------------------------------------------
  // CASE A: ไม่มี Token (ยังไม่ได้ Login)
  // -------------------------------------------------------------
  if (!token) {
    // ถ้าพยายามเข้าหน้าที่ไม่ใช่ Public Path (เช่น /dashboard, /, /proposal)
    if (!isPublicPath) {
      const loginUrl = new URL("/login", request.url);
      
      // สร้าง callbackUrl โดยเอา Path ปัจจุบัน + Query Params (ถ้ามี)
      // เช่น user เข้า /proposal/create?id=1 จะถูกเก็บไว้
      const callbackUrl = encodeURIComponent(pathname + search);
      
      // แนบไปกับ url ของหน้า login: /login?callbackUrl=...
      loginUrl.searchParams.set("callbackUrl", callbackUrl);

      return NextResponse.redirect(loginUrl);
    }
    // ถ้าเข้าหน้า Login/Register อยู่แล้ว ก็ปล่อยผ่าน (NextResponse.next())
  }

  // -------------------------------------------------------------
  // CASE B: มี Token แล้ว (Login ค้างอยู่)
  // -------------------------------------------------------------
  if (token) {
    // ถ้ามี Token แต่พยายามเข้าหน้า Login, Register หรือหน้าแรก (/)
    // ให้ดีดเข้าไปหน้า Dashboard เลย (ไม่ต้อง Login ซ้ำ)
    if (isPublicPath || pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  return NextResponse.next();
}

// Config เดิมของคุณ (Matcher)
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};