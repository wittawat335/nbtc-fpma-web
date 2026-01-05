import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useFetch } from "./useGenericQuery";
import { useGenericMutation } from "./useGenericMutation";
import { LoginResponse, Role, UserProfile } from "@/types/auth";
import { storage } from "@/lib/storage";
import { logout as logoutAction } from "@/actions/auth";
import { useEffect, useState } from "react";

export const useAuth = () => {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const {
    data: user,
    isLoading,
    isError,
  } = useFetch<UserProfile>("/auth/user", ["user"], {
    retry: false,
    staleTime: 1000 * 60 * 5,
    enabled: isClient && !!storage.getToken(),
    initialData: () => {
      if (typeof window === "undefined") return undefined;
      return storage.getUser() ?? undefined;
    },
  });

  useEffect(() => {
    if (user) {
      storage.setUser(user);
    }
  }, [user]);

  const loginMutation = useGenericMutation<LoginResponse, unknown>(
    "/auth/login",
    "POST",
    {
      onSuccess: (data) => {
        storage.setToken(data.access_token);
        storage.setUser(data.user);

        document.cookie = `session_token=${data.access_token}; path=/; max-age=${60 * 60 * 24 * 7}; Secure; SameSite=Strict`;

        queryClient.setQueryData(["user"], data.user);
        router.push("/dashboard");
      },
    },
  );

  const logout = async () => {
    try {
      storage.clearToken();
      storage.clearUser();

      document.cookie =
        "session_token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";

      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      queryClient.clear();

      await logoutAction();
    } catch (error) {
      console.error("Logout error:", error);
      router.push("/login");
    }
  };

  const hasRole = (required: string | string[]) => {
    if (!user?.role) return false;

    const requiredRoles = Array.isArray(required) ? required : [required];

    return requiredRoles.includes(user.role);
  };

  // const hasRole = (requiredRoles: string[]) => {
  //   // เช็คจาก user ที่มาจาก React Query ได้เลย
  //   if (!user?.roles) return false;
  //   return requiredRoles.some((role) => user.roles.includes(role as any));
  // };

  const hasPermission = (permission: string) => {
    return user?.permissions?.includes(permission) || false;
  };

  return {
    user,
    isLoading: isLoading && !user,
    isAuthenticated: !!user,
    login: loginMutation.mutate,
    isLoggingIn: loginMutation.isPending,
    logout,
    hasRole,
    hasPermission,
  };
};
