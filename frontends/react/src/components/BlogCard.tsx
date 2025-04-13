import Blog from "../models/Blog";

interface Props {
  blog: Blog;
}

export default function BlogCard({ blog }: Props) {
  return (
    <>
      <div className="bg-white rounded border pt-6 pb-6 pr-8 pl-8">
        <p className="text-3xl font-bold">{blog.title}</p>
      </div>
    </>
  );
}
