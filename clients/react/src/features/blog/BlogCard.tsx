import { Link } from 'react-router';
import { BlogDto } from '../../lib/types/Blog';

interface Props {
  blog: BlogDto;
}

export default function BlogCard({ blog }: Props) {
  return (
    <>
      <div className="bg-white rounded border pt-6 pb-6 pl-8 pr-8 ">
        <Link to={`/user/${blog.user.id}`}>
          <p className="font-semibold">{blog.user.displayName}</p>
        </Link>
        <p className="text-sm font-light mb-4">
          {'Posted on ' + String(blog.createdAt).split('T')[0]}
        </p>
        <Link to={`/blog/${blog.id}`}>
          <p className="text-2xl font-bold mb-3">{blog.title}</p>
        </Link>
      </div>
    </>
  );
}
