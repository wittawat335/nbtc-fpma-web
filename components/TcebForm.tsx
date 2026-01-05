"use client";

import React from "react";

interface TcebFormProps {
  fallbackUrl?: string;
}

const TcebForm: React.FC<TcebFormProps> = ({ fallbackUrl }) => {
  const finalUrl =
    process.env.NEXT_PUBLIC_BUDIBASE_FORM_URL || fallbackUrl || "";

  if (!finalUrl) {
    return (
      <div className="rounded border border-red-300 bg-red-50 p-4 text-red-500">
        ⚠️ Error: ไม่พบ URL ของ Form (กรุณาตรวจสอบ .env)
      </div>
    );
  }

  return (
    <div className="flex h-full w-full justify-center">
      <iframe
        title="TCEB_FORM"
        src={finalUrl}
        width="100%"
        height="1000"
        style={{ border: "none" }}
        allow="clipboard-write; camera; geolocation; fullscreen"
      />
    </div>
  );
};

export default TcebForm;
