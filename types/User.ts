export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Operator {
  userId: number;
  username: string;
  email: string;
}
export interface CreateUserDto {
  name: string;
  email: string;
}
