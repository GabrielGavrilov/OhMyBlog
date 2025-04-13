import { useQuery } from "@tanstack/react-query";
import Blog from "../models/Blog";
import agent from "../api/agent";

export default function useBlogs() {
  const { data: blogs, isPending } = useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response = await agent.get<Blog[]>("api/blogs");
      return response.data;
    },
  });

  return {
    blogs,
    isPending,
  };
}
