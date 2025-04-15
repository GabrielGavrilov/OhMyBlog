import BlogCard from './BlogCard';
import Blog from '../models/Blog';
import useBlogs from '../hooks/useBlogs';

export default function BlogList() {
  const { blogs, isPending } = useBlogs();

  if (!blogs || isPending) return <p>Loading...</p>;

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
