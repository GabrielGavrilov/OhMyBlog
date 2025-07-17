import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import agent from '../lib/api/agent';
import { BlogDto, BlogSearchCriteria, CreateBlogDto } from '../lib/types/Blog';
import { PageRequestDto, PageResponseDto } from '../lib/types/Pages';

export const endpoints = {
  getAll: '/blogs',
  getBlog: '/blogs/',
  create: '/blogs',
  update: '/blogs/',
  delete: '/blogs/',
};

export function useBlogs(pageRequest: PageRequestDto & BlogSearchCriteria) {
  return useQuery({
    queryKey: ['blogs', pageRequest.page, pageRequest.size, pageRequest.search],
    queryFn: async () => {
      const response = await agent.get<PageResponseDto<BlogDto>>(
        endpoints.getAll,
        { params: pageRequest, paramsSerializer: { indexes: null } }
      );
      return response.data;
    },
  });
}

export function useBlog(id?: string) {
  return useQuery({
    queryKey: ['blogs', id],
    queryFn: async () => {
      const response = await agent.get<BlogDto>(endpoints.getBlog + id);
      return response.data;
    },
    enabled: !!id,
  });
}

export function useCreateBlog() {
  const client = useQueryClient();
  return useMutation({
    mutationFn: async (blog: CreateBlogDto) => {
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
    mutationFn: async (blog: CreateBlogDto) => {
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
