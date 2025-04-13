import BlogCard from "./BlogCard";
import Blog from "../models/Blog";
import useBlogs from "../hooks/useBlogs";

export default function BlogList() {
  const { blogs, isPending } = useBlogs();

  if (!blogs || isPending) return <p>Loading...</p>;

  return (
    <>
      {blogs.map((blog: Blog) => (
        <BlogCard blog={blog} />
      ))}
    </>
  );
}
