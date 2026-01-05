import { axiosInstance } from "@/lib";
import { AxiosRequestConfig } from "axios";

export const apiService = {
  get: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.get<T>(url, config);
    return response.data;
  },

  post: async <T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.post<T>(url, data, config);
    return response.data;
  },

  put: async <T, D = unknown>(
    url: string,
    data: D,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.put<T>(url, data, config);
    return response.data;
  },

  delete: async <T>(url: string, config?: AxiosRequestConfig): Promise<T> => {
    const response = await axiosInstance.delete<T>(url, config);
    return response.data;
  },

  upload: async <T>(
    url: string,
    formData: FormData,
    config?: AxiosRequestConfig,
  ): Promise<T> => {
    const response = await axiosInstance.post<T>(url, formData, {
      ...config,
      headers: {
        "Content-Type": "multipart/form-data",
        ...config?.headers,
      },
    });
    return response.data;
  },
};
