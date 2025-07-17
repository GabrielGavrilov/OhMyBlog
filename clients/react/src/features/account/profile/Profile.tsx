import { useParams, useSearchParams } from 'react-router';
import { useProfileById } from '../../../hooks/AccountHooks';
import ProfileInformation from './ProfileInformation';
import BlogList from '../../blog/BlogList';
import { useBlogs } from '../../../hooks/BlogHooks';

export default function Profile() {
  const { id } = useParams();
  const { data: user, isLoading: isLoadingUser } = useProfileById(id!);
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = Number(searchParams.get('page')) || 1;
  const pageSize = Number(searchParams.get('size')) || 10;
  const { data: blogs, isLoading: isLoadingBlogs } = useBlogs({
    page: currentPage,
    size: pageSize,
    userId: [id!],
  });

  if (isLoadingUser || isLoadingBlogs || !blogs) {
    return <p>Loading...</p>;
  }

  return (
    <div className="w-full lg:flex md:block">
      <div className="lg:w-1/3 lg:mr-2 md:w-full">
        <ProfileInformation user={user!} />
      </div>
      <div className="lg:w-2/3 lg:mr-2 md:w-full">
        <BlogList
          blogs={blogs.content}
          currentPage={currentPage}
          totalPages={blogs.totalPages}
          onPageChange={(page) =>
            setSearchParams({ page: String(page), size: String(pageSize) })
          }
        />
      </div>
    </div>
  );
}
