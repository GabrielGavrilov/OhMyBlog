import { FormEvent, useState } from "react";
import useBlogs from "../hooks/useBlogs";
import Blog from "../models/Blog";
import { useNavigate } from "react-router";

export default function BlogForm() {
  const { createBlog } = useBlogs();

  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const navigate = useNavigate();

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const blog: Blog = { title, body };

    createBlog.mutate(blog, {
      onSuccess: () => {
        navigate("/");
      },
    });
  }

  return (
    <>
      <div className="w-1/2">
        <div className="mb-4">
          <p className="font-mono text-2xl">New blog</p>
        </div>
        <form className="w-full" onSubmit={handleSubmit}>
          <div className="pt-6 pb-6 pr-8 pl-8 border bg-white rounded">
            <input
              placeholder="New post title here..."
              className="title-input"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="pt-6 pb-6 pr-8 pl-8 mt-1 border bg-white rounded">
            <textarea
              placeholder="Write your post content here..."
              className="w-full h-96 focus:outline-none text-xl"
              value={body}
              onChange={(e) => setBody(e.target.value)}
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button className="btn mr-2">Reset</button>
            <button type="submit" className="btn btn-primary-filled">
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
