import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../api/agent';
import User from '../models/User';
import { useLocation, useNavigate } from 'react-router';

export default function useAuth() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const location = useLocation();

  const { data: userInfo, isLoading: loadingUserInfo } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>(`/auth`);
      return response.data;
    },
    enabled:
      !queryClient.getQueryData(['user']) &&
      location.pathname !== '/login' &&
      location.pathname !== '/register',
  });

  const { data: isAuthorized } = useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const response = await agent.get<User>(`/auth`);
      return response.status === 401 ? false : true;
    },
  });

  const loginUser = useMutation({
    mutationFn: async (user: User) => {
      await agent.post(`/auth`, user);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['user'],
      });
    },
  });

  const registerUser = useMutation({
    mutationFn: async (user: User) => {
      await agent.post(`/auth/register`, user);
    },
  });

  const logoutUser = useMutation({
    mutationFn: async () => {
      await agent.delete(`/auth`);
    },
    onSuccess: () => {
      queryClient.removeQueries({
        queryKey: ['user'],
      });
      navigate('/');
    },
  });

  return {
    isAuthorized,
    userInfo,
    loadingUserInfo,
    loginUser,
    registerUser,
    logoutUser,
  };
}
