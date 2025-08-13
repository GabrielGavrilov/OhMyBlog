export interface User {
  userId: string;
  email: string;
  displayName: string;
  description: string;
}

export interface LoginUser {
  email: string;
  password: string;
}
