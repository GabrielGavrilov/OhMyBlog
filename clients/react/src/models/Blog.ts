import User from './User';

export default interface Blog {
  id?: string;
  title: string;
  body: string;
  createdAt?: Date;
  user: User;
}
