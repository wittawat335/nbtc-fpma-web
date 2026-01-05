"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, User, Loader2, AlertCircle } from "lucide-react";
import { LoginSchema, LoginInput } from "@/features/auth/schemas";
import { useLoadingStore } from "@/lib/loading-store";
import { useAuth } from "@/hooks";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingIn } = useAuth();
  const { showLoading, hideLoading } = useLoadingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError: setFormError,
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    showLoading("กำลังเข้าสู่ระบบ");
    login(data, {
      onError: (error: any) => {
        const msg =
          error?.response?.data?.message ||
          "ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง";
        setFormError("root", { message: msg });
        hideLoading();
      },
      onSuccess: () => {
        hideLoading();
      },
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="animate-fade-in space-y-6">
      {errors.root && (
        <div className="flex items-center gap-2 rounded-lg border border-red-100 bg-red-50 p-2.5 text-sm text-red-600">
          <AlertCircle size={16} />
          <span>{errors.root.message}</span>
        </div>
      )}

      {/* Username Field */}
      <div className="space-y-1">
        <label className="ml-1 text-sm font-medium text-gray-700">
          ชื่อผู้ใช้งาน
        </label>
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
            <User size={18} />
          </div>
          <input
            {...register("username")}
            type="text"
            disabled={isLoggingIn}
            className={`block w-full rounded-lg border bg-gray-50 py-2.5 pr-3 pl-10 text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:text-sm ${
              errors.username
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-blue-500"
            }`}
            placeholder="เช่น operator01"
          />
        </div>
        {errors.username && (
          <p className="ml-1 text-xs text-red-500">{errors.username.message}</p>
        )}
      </div>

      {/* Password Field */}
      <div className="space-y-1">
        <label className="ml-1 text-sm font-medium text-gray-700">
          รหัสผ่าน
        </label>
        <div className="group relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 transition-colors group-focus-within:text-blue-500">
            <Lock size={18} />
          </div>
          <input
            {...register("password")}
            type={showPassword ? "text" : "password"}
            disabled={isLoggingIn}
            className={`block w-full rounded-lg border bg-gray-50 py-2.5 pr-10 pl-10 text-gray-900 placeholder-gray-400 transition-all focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:outline-none sm:text-sm ${
              errors.password
                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20"
                : "border-gray-200 focus:border-blue-500"
            }`}
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

      {/* Remember Me & Forgot Password */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center">
          <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 cursor-pointer rounded border-gray-300 text-blue-600 focus:ring-blue-500"
          />
          <label
            htmlFor="remember-me"
            className="ml-2 block cursor-pointer text-gray-600 select-none"
          >
            บันทึกการใช้งาน
          </label>
        </div>
        <div className="text-sm">
          <a
            href="#"
            className="font-medium text-blue-600 hover:text-blue-500 hover:underline"
          >
            ลืมรหัสผ่าน?
          </a>
        </div>
      </div>

      {/* Submit Button */}
      <div>
        <button
          type="submit"
          disabled={isLoggingIn}
          className="flex w-full transform items-center justify-center gap-2 rounded-lg border border-transparent bg-gradient-to-r from-blue-600 to-blue-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-500/30 transition-all hover:-translate-y-0.5 hover:from-blue-700 hover:to-blue-600 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
          {isLoggingIn ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              กำลังเข้าสู่ระบบ...
            </>
          ) : (
            "เข้าสู่ระบบ"
          )}
        </button>
      </div>
    </form>
  );
}