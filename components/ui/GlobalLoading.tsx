"use client";

import React, { useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { useLoadingStore } from "@/lib/loading-store";

const GlobalLoading = () => {
  const { isLoading, message, description } = useLoadingStore();
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isLoading) {
      setShow(true);
    } else {
      const timer = setTimeout(() => setShow(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isLoading]);

  if (!show && !isLoading) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md transition-all duration-300 dark:bg-black/60 ${
        isLoading ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="animate-in zoom-in-95 relative flex flex-col items-center gap-4 rounded-2xl border border-white/20 bg-white/40 p-8 shadow-2xl dark:border-white/10 dark:bg-black/40">
        <div className="relative">
          <div className="h-16 w-16 animate-spin rounded-full border-4 border-indigo-100 border-t-indigo-600 dark:border-indigo-900 dark:border-t-indigo-400"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-pulse text-indigo-600 dark:text-indigo-400" />
          </div>
          <div className="absolute inset-0 animate-ping rounded-full bg-indigo-400 opacity-20"></div>
        </div>

        <div className="flex flex-col items-center gap-1">
          <h3 className="max-w-[250px] animate-pulse bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-center text-lg font-bold text-transparent dark:from-indigo-400 dark:to-purple-400">
            {message}
          </h3>

          <p className="text-center text-xs font-medium tracking-wider text-gray-500 uppercase dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default GlobalLoading;
