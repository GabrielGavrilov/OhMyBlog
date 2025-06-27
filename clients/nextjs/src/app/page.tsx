import BlogCard from '@/components/blog-card';
import { fetchAllBlogs } from '@/lib/actions/blog.actions';
import { Blog } from '@/lib/types/blog';

export default async function Page() {
  const blogs = await fetchAllBlogs();

  return (
    <div className="flex justify-center">
      <div className="w-10/12 lg:w-2/3 md:10/12 sm:10/12">
        {blogs.map((blog: Blog) => (
          <div className="mb-2">
            <BlogCard blog={blog} />
          </div>
        ))}
      </div>
    </div>
  );
}
