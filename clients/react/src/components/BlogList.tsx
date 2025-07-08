import BlogCard from './BlogCard';
import Blog from '../models/Blog';
import { useBlogs } from '../hooks/BlogHooks';

export default function BlogList() {
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs();

  console.log(blogs);

  if (!blogs || isLoadingBlogs) return <p>Loading...</p>;

  return (
    <>
      <div className="w-10/12 lg:w-2/3 md:10/12 sm:10/12">
        {blogs.map((blog: Blog) => (
          <div className="mb-2">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </>
  );
}
