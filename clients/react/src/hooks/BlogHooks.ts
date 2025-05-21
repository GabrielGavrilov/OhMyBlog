import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
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

export function useBlogs() {
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

export function useBlog(id?: string) {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: async () => {
      const response = await agent.get<Blog>(endpoints.getBlog + id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (blog: Blog) => {
      const response = await agent.post(endpoints.create, blog);
      return response.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ['blogs'],
      });
    },
  });
}

export function useUpdateBlog(id?: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (blog: Blog) => {
      const response = await agent.put(endpoints.update + id, blog);
      return response.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ['blogs'],
      });
    },
  });
}

export function udeDeleteBlog(id: string) {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async () => {
      const response = await agent.delete(endpoints.delete + id);
      return response.data;
    },
    onSuccess: async () => {
      await client.invalidateQueries({
        queryKey: ['blogs'],
      });
    },
  });
}
