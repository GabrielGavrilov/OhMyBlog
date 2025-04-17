import { useEffect, useState } from 'react';
import useBlogs from '../hooks/useBlogs';
import Blog from '../models/Blog';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';

export default function BlogForm() {
  const { id } = useParams();
  const { blog, createBlog, updateBlog, isLoadingActivity } = useBlogs(id);
  const { register, handleSubmit, reset } = useForm();
  const [validationErrors, setValidationErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(
    function () {
      if (blog) {
        reset({
          ...blog,
        });
      }
    },
    [blog, reset]
  );

  if (id && isLoadingActivity) {
    return <p>Loading...</p>;
  }

  async function onSubmit(data: Blog) {
    if (blog) {
      await updateBlog.mutateAsync(data, {
        onSuccess: function () {
          navigate(`/blog/${id}`);
        },
      });
    } else {
      await createBlog.mutate(data, {
        onSuccess: function (createdBlog) {
          navigate(`/blog/${createdBlog._id}`);
        },
        onError: function (error) {
          if (Array.isArray(error)) {
            setValidationErrors(error);
          } else {
            setValidationErrors([]);
          }
          console.log(validationErrors);
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
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div
            className={`pt-6 pb-6 pr-8 pl-8 border bg-white rounded ${
              validationErrors.length > 0 ? 'border-red-500' : 'border'
            }`}
          >
            <input
              placeholder="New post title here..."
              className={`title-input`}
              {...register('title')}
            />
          </div>
          <div className="pt-6 pb-6 pr-8 pl-8 mt-1 border bg-white rounded">
            <textarea
              placeholder="Write your post content here..."
              className="w-full h-96 focus:outline-none text-xl"
              {...register('body')}
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="button"
              className="btn btn-warning mr-2"
              onClick={() => reset({ ...blog })}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              {id ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
        {validationErrors.map((err, i) => (
          <p key={i}>{err}</p>
        ))}
      </div>
    </>
  );
}
