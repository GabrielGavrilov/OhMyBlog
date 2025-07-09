import BlogCard from './BlogCard';
import Blog from '../models/Blog';
import { useBlogs } from '../hooks/BlogHooks';
import { useSearchParams } from 'react-router';
import Pagination from './Pagination';

export default function BlogList() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('size')) || 10;
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs({
    page: currentPage,
    size: pageSize,
  });

  if (!blogs || isLoadingBlogs) return <p>Loading...</p>;

  return (
    <div className="w-10/12 lg:w-2/3 md:10/12 sm:10/12 mb-8">
      {blogs.content.map((blog: Blog) => (
        <div className="mb-2">
          <BlogCard blog={blog} />
        </div>
      ))}
      <Pagination
        totalPages={blogs.totalPages}
        currentPage={currentPage}
        onPageChange={(page) =>
          setSearchParams({ page: String(page), size: String(pageSize) })
        }
      />
    </div>
  );
}
