import { useSearchParams } from 'react-router';
import { useBlogs } from '../../hooks/useBlogActions';
import BlogList from './BlogList';

export default function ListAllBlogs() {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('size')) || 10;
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs({
    search: searchParams.get('search'),
    page: currentPage,
    size: pageSize,
  });

  console.log(searchParams);

  if (!blogs || isLoadingBlogs) return <p>Loading...</p>;

  return (
    <BlogList
      blogs={blogs.content}
      currentPage={currentPage}
      totalPages={blogs.totalPages}
      onPageChange={(page) =>
        setSearchParams({
          page: String(page),
          size: String(pageSize),
          ...Object.fromEntries(searchParams.entries()),
        })
      }
    />
  );
}
