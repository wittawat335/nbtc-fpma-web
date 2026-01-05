"use client";

import React, { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "full";
  className?: string;
  preventCloseOnClickOutside?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = "md",
  className,
  preventCloseOnClickOutside = false,
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden"; 
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset"; 
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (preventCloseOnClickOutside) return;
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!mounted || !isOpen) return null;

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
    full: "max-w-[95vw] h-[90vh]",
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 p-4 backdrop-blur-[4px] transition-all duration-300 animate-in fade-in"
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-2xl bg-white shadow-2xl animate-in zoom-in-95 duration-200",
          sizeClasses[size],
          className
        )}
      >
        {/* Header */}
        {(title || onClose) && (
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div className="text-lg font-semibold text-gray-800">
              {title}
            </div>
            <button
              onClick={onClose}
              className="rounded-full p-2 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 focus:outline-none"
            >
              <X size={20} />
            </button>
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {children}
        </div>

        {/* Footer (Optional) */}
        {footer && (
          <div className="flex items-center justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
            {footer}
          </div>
        )}
      </div>
    </div>,
    document.body 
  );
}