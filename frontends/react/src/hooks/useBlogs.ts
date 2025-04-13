import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Blog from "../models/Blog";
import agent from "../api/agent";

export default function useBlogs() {
  const queryClient = useQueryClient();

  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await agent.get<Blog[]>("blogs");
      return response.data;
    },
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

  return {
    blogs,
    isPending,
    createBlog,
  };
}
