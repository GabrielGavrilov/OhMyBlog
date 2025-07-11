import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../lib/api/agent';
import Blog from '../lib/models/Blog';
import { useLocation } from 'react-router';
import { PageRequestDto, PageResponseDto } from '../lib/models/Pages';

export const endpoints = {
  getAll: '/blogs',
  getBlog: '/blogs/',
  create: '/blogs',
  update: '/blogs/',
  delete: '/blogs/',
};

export function useBlogs(pageRequest: PageRequestDto) {
  const location = useLocation();
  return useQuery({
    queryKey: ['blogs', pageRequest.page, pageRequest.size],
    queryFn: async () => {
      const response = await agent.get<PageResponseDto<Blog>>(
        endpoints.getAll,
        {
          params: {
            page: pageRequest.page,
            size: pageRequest.size,
          },
        }
      );
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

export function useDeleteBlog(id?: string) {
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
