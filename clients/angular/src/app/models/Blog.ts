import { User } from './User';

export interface Blog {
  id: string;
  title: string;
  body: string;
  createdAt: string;
  userDto: User;
}
