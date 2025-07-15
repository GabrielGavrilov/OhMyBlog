import BlogCard from './BlogCard';
import { BlogDto } from '../../lib/types/Blog';
import Pagination from '../../components/Pagination';

interface Props {
  blogs: BlogDto[];
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogList({
  blogs,
  currentPage,
  totalPages,
  onPageChange,
}: Props) {
  return (
    <div className="w-full">
      {blogs.map((blog: BlogDto) => (
        <div className="mb-2">
          <BlogCard blog={blog} />
        </div>
      ))}
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        onPageChange={onPageChange}
      />
    </div>
  );
}
