import { Link, useNavigate, useParams } from 'react-router';
import useBlogs from '../hooks/useBlogs';
import useAuth from '../hooks/useAuth';

export default function BlogPage() {
  const { id } = useParams();
  const { blog, deleteBlog } = useBlogs(id);
  // const { isAuthorized, userInfo } = useAuth();
  // const isAuthor = isAuthorized && userInfo?.displayName == blog?.author;

  const navigate = useNavigate();

  function handleDelete() {
    deleteBlog.mutate();
    navigate('/');
  }

  return (
    <>
      <div className="flex justify-center">
        <div className="w-10/12 lg:w-2/3 md:w-10/12 sm:w-10/12">
          <div className="pt-8 pb-8 pl-12 pr-12 w-full bg-white rounded border">
            <div>
              <p className="font-semibold">{'{author}'}</p>
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
          {/* {isAuthor && (
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
          )} */}
        </div>
      </div>
    </>
  );
}
