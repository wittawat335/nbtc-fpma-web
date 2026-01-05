"use client";

import { LoginForm, RegisterForm } from "@/features/auth";
import React, { useState } from "react";

export default function LoginPage() {
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  return (
    <main className="relative flex flex-grow items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-blue-900/70 backdrop-blur-[2px]"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 container mx-auto flex flex-col items-center justify-center gap-12 lg:flex-row lg:justify-end lg:gap-20">
        {/* Left Side: Welcome Text */}
        <div className="animate-fade-in-up hidden max-w-lg text-white lg:block">
          <h2 className="mb-4 text-4xl leading-tight font-bold">
            ยินดีต้อนรับเข้าสู่ระบบ
            <br />
            กองทุนวิจัยและพัฒนาฯ
          </h2>
          <p className="text-lg font-light text-blue-100">
            ระบบบริหารจัดการโครงการที่มีประสิทธิภาพ โปร่งใส และตรวจสอบได้
            เพื่อการพัฒนาที่ยั่งยืน
          </p>
        </div>

        {/* Right Side: Login Card */}
        <div className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white shadow-2xl transition-all duration-300 hover:scale-[1.01]">
          {/* Tabs Header */}
          <div className="flex border-b border-gray-100 text-center">
            <button
              onClick={() => setActiveTab("login")}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "login"
                  ? "border-b-2 border-blue-600 bg-white text-blue-600"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
            >
              เข้าสู่ระบบ
            </button>
            <button
              onClick={() => setActiveTab("register")}
              className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 ${
                activeTab === "register"
                  ? "border-b-2 border-blue-600 bg-white text-blue-600"
                  : "bg-gray-50 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              }`}
            >
              ลงทะเบียน
            </button>
          </div>

          {/* Form Container */}
          <div className="p-8">
            {activeTab === "login" ? (
              <LoginForm />
            ) : (
              <div className="animate-fade-in text-center">
                <RegisterForm />
              </div>
            )}
          </div>

          <div className="flex items-center justify-center border-t border-gray-100 bg-gray-50 px-8 py-4">
            <p className="text-xs text-gray-500">
              ติดปัญหาการใช้งาน?{" "}
              <a href="#" className="font-medium text-blue-600 hover:underline">
                แจ้งปัญหา
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
