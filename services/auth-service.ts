import { LoginInput, RegisterSchema } from "@/features/auth/schemas";
import { axiosInstance } from "@/lib";
import { LoginResponse } from "@/types/auth";

export const authService = {
  login: async (credentials: LoginInput) => {
    const { data } = await axiosInstance.post<LoginResponse>(
      "/auth/login",
      credentials,
    );  
    return data;
  },
  register: async (data: Omit<RegisterSchema, "confirmPassword">) => {
    const response = await axiosInstance.post("/auth/register", data);
    return response.data;
  },

  logout: () => {
    // Implement logout logic if needed (e.g. clear cookies/storage)
  },
};
