import { Link } from "react-router";
import Blog from "../models/Blog";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <>
      <div className="bg-white rounded border pt-6 pb-6 pr-8 pl-8">
        {/* <p className="mb-1">John Doe</p> */}
        <p className="text-xs mb-3 text-gray-600">
          {String(blog.createdAt).split("T")[0]}
        </p>
        <Link to={`/blog/${blog._id}`}>
          <p className="text-2xl font-bold mb-3">{blog.title}</p>
        </Link>
      </div>
    </>
  );
}
