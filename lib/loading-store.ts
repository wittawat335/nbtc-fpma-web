import { create } from "zustand";

interface LoadingState {
  isLoading: boolean;
  message: string;
  description: string; 
  showLoading: (message?: string, description?: string) => void;
  hideLoading: () => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isLoading: false,
  message: "",
  description: "", 
  showLoading: (
    message = "",
    description = "กรุณารอสักครู่...", 
  ) => set({ isLoading: true, message, description }),

  hideLoading: () => set({ isLoading: false, message: "", description: "" }),
}));
