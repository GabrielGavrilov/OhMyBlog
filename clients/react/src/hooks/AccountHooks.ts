import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../lib/api/agent';
import User from '../lib/types/User';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export const endpoints = {
  authorized: '/users',
  profile: '/users',
  login: '/login',
  register: '/users',
  logout: '/users/logout',
};

export function useAuthorized() {
  return useQuery({
    queryKey: ['authorized'],
    queryFn: async () => {
      const response = await agent.get<User>(endpoints.authorized);
      return response.status ? true : false;
    },
    retry: false,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await agent.get<User>(endpoints.profile);
      return response.data;
    },
    retry: (_, error) => {
      if (error instanceof AxiosError && error.response?.status === 401) {
        return false;
      }
      return true;
    },
  });
}

export function useLogin() {
  const client = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (user: User) => {
      const response = await agent.post(endpoints.login, user, {
        params: {
          useCookies: true,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      client.resetQueries();
      navigate('/');
    },
  });
}

export function useRegister() {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (user: User) => {
      const response = await agent.post(endpoints.register, user);
      return response.data;
    },
    onSuccess: () => navigate('/login'),
  });
}

export function useLogout() {
  const client = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      const response = await agent.post(endpoints.logout);
      client.resetQueries();
      return response.data();
    },
    onSuccess: () => {
      console.log('logging out');
      navigate('/login');
    },
  });
}
