import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../lib/api/agent';
import { AuthUserDto, UserDto } from '../lib/types/User';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';

export const endpoints = {
  authorized: '/v1/users',
  profile: '/v1/users',
  profileById: '/v1/users/',
  login: '/login', // dotnet's login uses /api/login?useCookies instead of /api/v1/
  register: '/v1/users',
  logout: '/v1/users/logout',
  update: '/v1/users',
};

export function useAuthorized() {
  return useQuery({
    queryKey: ['authorized'],
    queryFn: async () => {
      const response = await agent.get<UserDto>(endpoints.authorized);
      return response.status ? true : false;
    },
    retry: false,
  });
}

export function useProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: async () => {
      const response = await agent.get<UserDto>(endpoints.profile);
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

export function useProfileById(id: string) {
  return useQuery({
    queryKey: ['profile', id],
    queryFn: async () => {
      const response = await agent.get<UserDto>(endpoints.profileById + id);
      return response.data;
    },
    retry: false,
  });
}

export function useLogin() {
  const client = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async (user: AuthUserDto) => {
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
    mutationFn: async (user: AuthUserDto) => {
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
      navigate('/login');
    },
  });
}

export function useUpdateUser() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (user: UserDto) => {
      const response = await agent.put(endpoints.update, user);
      client.resetQueries();
      return response.data;
    },
  });
}
