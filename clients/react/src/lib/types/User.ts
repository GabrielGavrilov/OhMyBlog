export type UserDto = {
  id: string;
  email: string;
  displayName: string;
  description?: string;
};

export type AuthUserDto = {
  displayName: string;
  email: string;
  password: string;
  confirmPassword?: string;
};

export type BlogUserDto = {
  id: string;
  displayName: string;
};
