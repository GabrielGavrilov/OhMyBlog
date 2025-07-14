import { Link, useNavigate, useParams } from 'react-router';
import { useBlog, useDeleteBlog } from '../../hooks/BlogHooks';
import { useProfile } from '../../hooks/AccountHooks';

export default function Blog() {
  const { id } = useParams();
  const { data: blog, isLoading: isLoadingBlog } = useBlog(id);
  const deleteBlog = useDeleteBlog(id);
  const { data: userInfo } = useProfile();
  const isAuthor = userInfo?.id === blog?.user.id;

  const navigate = useNavigate();

  function handleDelete() {
    deleteBlog.mutate();
    navigate('/');
  }

  if (isLoadingBlog) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <div className="pt-8 pb-8 pl-12 pr-12 w-full bg-white rounded border">
        <div>
          <Link to={`/user/${blog?.user.id}`}>
            <p className="font-semibold">{blog?.user.displayName}</p>
          </Link>
        </div>
        <div className="font-light text-sm mb-4">
          {'Posted on ' + blog?.createdAt?.toString().split('T')[0]}
        </div>
        <div>
          <p className="text-3xl font-bold">{blog?.title}</p>
        </div>
        <div className="mt-4">
          <p>{blog?.body}</p>
        </div>
      </div>
      {isAuthor && (
        <div className="flex justify-end mt-4">
          <div className="mr-2">
            <button className="btn btn-warning" onClick={handleDelete}>
              Delete
            </button>
          </div>
          <div>
            <Link to={`/blog/update/${id}`}>
              <button className="btn btn-primary">Update</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
