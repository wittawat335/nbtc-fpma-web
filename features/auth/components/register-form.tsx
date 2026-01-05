"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { registerSchema, RegisterSchema } from "../schemas";
import { authService } from "@/services/auth-service";
import { User, Mail, Lock, Eye, EyeOff, Loader2, AlertCircle, CheckCircle, FileText } from "lucide-react";
import { useLoadingStore } from "@/lib/loading-store";
import Modal from "@/components/ui/Modal";

export default function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);

  const { showLoading, hideLoading } = useLoadingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    showLoading("กำลังลงทะเบียน");
    setError(null);
    try {
      const { confirmPassword, ...registerData } = data;
      await authService.register(registerData);
      
      setShowSuccessModal(true);

    } catch (err: any) {
      console.error("Registration failed", err);
      setError(
        err.response?.data?.message ||
          "เกิดข้อผิดพลาดในการลงทะเบียน กรุณาลองใหม่อีกครั้ง",
      );
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const handleCloseSuccess = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const getInputClass = (hasError: any) => 
    `block w-full rounded-lg border bg-gray-50 py-2.5 pr-3 pl-10 text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:text-sm ${
      hasError
        ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
        : "border-gray-200 focus:border-blue-500"
    }`;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 animate-fade-in">
        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-2.5 text-sm text-red-600">
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        {/* ชื่อ - นามสกุล (2 Columns) */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="ml-1 text-sm font-medium text-gray-700">ชื่อจริง</label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
                <User size={18} />
              </div>
              <input
                type="text"
                {...register("firstName")}
                className={getInputClass(errors.firstName)}
                placeholder="ชื่อจริง"
              />
            </div>
            {errors.firstName && (
              <p className="ml-1 text-xs text-red-500">{errors.firstName.message}</p>
            )}
          </div>

          <div className="space-y-1">
            <label className="ml-1 text-sm font-medium text-gray-700">นามสกุล</label>
            <div className="group relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
                <User size={18} />
              </div>
              <input
                type="text"
                {...register("lastName")}
                className={getInputClass(errors.lastName)}
                placeholder="นามสกุล"
              />
            </div>
            {errors.lastName && (
              <p className="ml-1 text-xs text-red-500">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="space-y-1">
          <label className="ml-1 text-sm font-medium text-gray-700">ชื่อผู้ใช้งาน</label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <User size={18} />
            </div>
            <input
              type="text"
              {...register("username")}
              className={getInputClass(errors.username)}
              placeholder="Username"
            />
          </div>
          {errors.username && (
            <p className="ml-1 text-xs text-red-500">{errors.username.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="ml-1 text-sm font-medium text-gray-700">อีเมล</label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Mail size={18} />
            </div>
            <input
              type="email"
              {...register("email")}
              className={getInputClass(errors.email)}
              placeholder="example@mail.com"
            />
          </div>
          {errors.email && (
            <p className="ml-1 text-xs text-red-500">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="ml-1 text-sm font-medium text-gray-700">รหัสผ่าน</label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Lock size={18} />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              {...register("password")}
              className={`${getInputClass(errors.password)} pr-10`}
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {errors.password && (
            <p className="ml-1 text-xs text-red-500">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="ml-1 text-sm font-medium text-gray-700">ยืนยันรหัสผ่าน</label>
          <div className="group relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
              <Lock size={18} />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              {...register("confirmPassword")}
              className={`${getInputClass(errors.confirmPassword)} pr-10`}
              placeholder="••••••••"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="text-gray-400 hover:text-gray-600 focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {errors.confirmPassword && (
            <p className="ml-1 text-xs text-red-500">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Terms Checkbox (Optional UI) */}
        <div className="flex items-start">
          <div className="flex h-5 items-center">
            <input
              id="terms"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              required 
            />
          </div>
          <div className="ml-2 text-sm">
            <label htmlFor="terms" className="font-medium text-gray-700">
              ฉันยอมรับ{" "}
              <button
                type="button"
                onClick={() => setShowTermsModal(true)}
                className="text-blue-600 hover:underline"
              >
                ข้อกำหนดและเงื่อนไข
              </button>
            </label>
          </div>
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className="flex w-full transform items-center justify-center gap-2 rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin" size={18} />
                กำลังบันทึก...
              </>
            ) : (
              "ลงทะเบียน"
            )}
          </button>
        </div>
      </form>

      {/* --- ✅ Modal 1: แจ้งเตือนลงทะเบียนสำเร็จ --- */}
      <Modal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccess}
        size="sm"
        preventCloseOnClickOutside={true} // บังคับให้กดปุ่มตกลงเท่านั้น
      >
        <div className="flex flex-col items-center justify-center py-4 text-center">
          <div className="mb-4 rounded-full bg-green-50 p-4 ring-8 ring-green-50/50">
            <CheckCircle className="h-12 w-12 text-green-500" />
          </div>
          <h3 className="mb-2 text-xl font-bold text-gray-900">
            ลงทะเบียนสำเร็จ!
          </h3>
          <p className="mb-6 text-sm text-gray-500">
            บัญชีของคุณถูกสร้างเรียบร้อยแล้ว <br />
            กรุณาเข้าสู่ระบบเพื่อเริ่มต้นใช้งาน
          </p>
          <button
            onClick={handleCloseSuccess}
            className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            เข้าสู่ระบบทันที
          </button>
        </div>
      </Modal>

      {/* --- ✅ Modal 2: ข้อกำหนดและเงื่อนไข (ตัวอย่าง) --- */}
      <Modal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title={
          <div className="flex items-center gap-2">
            <FileText className="text-blue-600" size={20} />
            <span>ข้อกำหนดและเงื่อนไขการใช้งาน</span>
          </div>
        }
        size="lg"
        footer={
          <button
            onClick={() => setShowTermsModal(false)}
            className="rounded-lg bg-gray-900 px-4 py-2 text-sm text-white hover:bg-gray-800"
          >
            รับทราบ
          </button>
        }
      >
        <div className="space-y-4 text-sm text-gray-600">
          <p>
            <strong>1. บทนำ</strong><br />
            ยินดีต้อนรับสู่ระบบกองทุนวิจัย... การใช้งานระบบนี้ถือว่าท่านยอมรับข้อตกลง...
          </p>
          <p>
            <strong>2. ข้อมูลส่วนบุคคล</strong><br />
            เราให้ความสำคัญกับข้อมูลส่วนบุคคลของท่าน... (ใส่เนื้อหาตรงนี้ยาวๆ ได้ Modal จะมี Scrollbar เอง)
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam...
          </p>
          {/* ... เนื้อหาอื่นๆ ... */}
        </div>
      </Modal>
    </>
  );
}