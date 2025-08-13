import { User } from './User';

export interface Blog {
  blogId: string;
  title: string;
  body: string;
  createdAt: number;
  userDto: User;
}
