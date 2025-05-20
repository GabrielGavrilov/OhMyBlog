import { useQuery } from '@tanstack/react-query';
import agent from '../api/agent';
import Blog from '../models/Blog';
import { useLocation } from 'react-router';

export const endpoints = {
  getAll: '/blogs',
  getBlog: '/blogs/',
  create: '/blogs',
  update: '/blogs/',
  delete: '/blogs/',
};

export function useGetAllBlogs() {
  const location = useLocation();
  return useQuery({
    queryKey: ['blogs'],
    queryFn: async () => {
      const response = await agent.get<Blog[]>(endpoints.getAll);
      return response.data;
    },
    enabled: location.pathname === '/',
  });
}

export function useGetBlog(id: string) {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: async () => {
      const response = await agent.get<Blog>(endpoints.getBlog + id);
      return response.data;
    },
    enabled: !!id,
  });
}
