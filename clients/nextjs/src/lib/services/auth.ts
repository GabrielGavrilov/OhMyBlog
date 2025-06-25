import { User } from '../types/auth';
import clientAgent from '../client-agent';

export function createUser(data: User) {
  return clientAgent.post<User>('/users', data);
}
