import { BlogUserDto } from './User';

export type BlogDto = {
  id: string;
  title: string;
  body: string;
  createdAt: Date;
  user: BlogUserDto;
};

export type CreateBlogDto = {
  title: string;
  body: string;
};

export type BlogSearchCriteria = {
  userId?: Array<string>;
};
