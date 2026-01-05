import { UserProfile } from "@/types/auth";

const TOKEN_KEY = "access_token";
const USER_KEY = "user_profile";

export const storage = {
  getToken: () => {
    if (typeof window !== "undefined") {
      return localStorage.getItem(TOKEN_KEY);
    }
    return null;
  },
  setToken: (token: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(TOKEN_KEY, token);
    }
  },
  clearToken: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(TOKEN_KEY);
    }
  },
  // --- เพิ่มส่วนจัดการ User ---
  getUser: (): UserProfile | null => {
    if (typeof window !== "undefined") {
      const userStr = localStorage.getItem(USER_KEY);
      return userStr ? JSON.parse(userStr) : null;
    }
    return null;
  },
  setUser: (user: UserProfile) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
    }
  },
  clearUser: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(USER_KEY);
    }
  },
};
