import { Blog } from '@/lib/types/blog';

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <>
      <div className="bg-white rounded border pt-6 pb-6 pl-8 pr-8 ">
        <p className="font-semibold">USERNAME</p>
        <p className="text-sm font-light mb-4">
          {'Posted on ' + String(blog.createdAt)}
        </p>
        {/* <Link to={`/blog/${blog.id}`}> */}
        <p className="text-2xl font-bold mb-3">{blog.title}</p>
        {/* </Link> */}
      </div>
    </>
  );
}
