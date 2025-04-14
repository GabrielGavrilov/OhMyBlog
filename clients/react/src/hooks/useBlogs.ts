import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Blog from "../models/Blog";
import agent from "../api/agent";

export default function useBlogs(id?: string) {
  const queryClient = useQueryClient();

  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await agent.get<Blog[]>("blogs");
      return response.data;
    },
    enabled: !id,
  });

  const { data: blog, isLoading: isLoadingActivity } = useQuery({
    queryKey: ["blogs", id],
    queryFn: async () => {
      const response = await agent.get<Blog>(`blogs/${id}`);
      return response.data;
    },
    enabled: !!id,
  });

  const createBlog = useMutation({
    mutationFn: async (blog: Blog) => {
      const response = await agent.post("blogs", blog);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  const updateBlog = useMutation({
    mutationFn: async (blog: Blog) => {
      const response = await agent.put(`blogs/${id}`, blog);
      return response.data;
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  const deleteBlog = useMutation({
    mutationFn: async () => {
      await agent.delete(`blogs/${id}`);
    },
    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["blogs"],
      });
    },
  });

  return {
    blogs,
    blog,
    isPending,
    isLoadingActivity,
    createBlog,
    updateBlog,
    deleteBlog,
  };
}
