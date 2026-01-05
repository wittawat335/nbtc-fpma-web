export enum Role {
  Director = "Director",
  User = "User",
  Operator = "Operator",
}

export interface Permission {
  action: "create" | "read" | "update" | "delete";
  resource: string;
}

export interface UserProfile {
  id: string;
  username: string;
  email: string;
  firstName?: string;
  lastName?: string;
  role?: string;
  roles: Role[];
  permissions: string[];
}

export interface LoginResponse {
  access_token: string;
  refreshToken: string;
  user: UserProfile;
}
