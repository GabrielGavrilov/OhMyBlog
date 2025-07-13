import { BlogUserDto } from './User';

export type Blog = {
  id?: string;
  title: string;
  body: string;
  createdAt?: Date;
  user: BlogUserDto;
};
