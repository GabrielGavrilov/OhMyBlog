export type UserDto = {
  id: string;
  displayName: string;
  email: string;
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
