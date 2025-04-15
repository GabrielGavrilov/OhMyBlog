import { FormEvent, useEffect, useState } from 'react';
import useBlogs from '../hooks/useBlogs';
import Blog from '../models/Blog';
import { useNavigate, useParams } from 'react-router';

export default function BlogForm() {
  const { id } = useParams();

  const { blog, createBlog, updateBlog, isLoadingActivity } = useBlogs(id);
  const [title, setTitle] = useState<string>('');
  const [body, setBody] = useState<string>('');
  const navigate = useNavigate();

  useEffect(
    function () {
      if (blog) {
        setTitle(blog?.title);
        setBody(blog?.body);
      }
    },
    [blog]
  );

  if (id && isLoadingActivity) {
    return <p>Loading...</p>;
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const submittedBlog: Blog = { title, body };

    if (blog) {
      await updateBlog.mutateAsync(submittedBlog, {
        onSuccess: function () {
          navigate(`/blog/${id}`);
        },
      });
    } else {
      await createBlog.mutate(submittedBlog, {
        onSuccess: function (createdBlog) {
          navigate(`/blog/${createdBlog._id}`);
        },
      });
    }
  }

  return (
    <>
      <div className="w-10/12 lg:w-2/3 md:w-10/12 sm:w-10/12">
        <div className="mb-4">
          <p className="font-mono text-2xl">
            {id ? 'Update blog' : 'New blog'}
          </p>
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
            <button
              type="button"
              className="btn btn-warning mr-2"
              onClick={() => {
                setTitle(blog?.title || '');
                setBody(blog?.body || '');
              }}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
