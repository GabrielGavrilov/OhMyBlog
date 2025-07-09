import { useEffect, useState } from 'react';
import Blog from '../models/Blog';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import ValidationError from '../models/ValidationError';
import { useBlog, useCreateBlog, useUpdateBlog } from '../hooks/BlogHooks';
import Input from './Input';
import InputArea from './InputArea';

export default function BlogForm() {
  const { id } = useParams();
  const isEditMode: boolean = Boolean(id);
  const { data: blog, isLoading: isLoadingBlog } = useBlog(id);
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog(id);
  const { register, handleSubmit, reset } = useForm<Blog>();
  const [validationErrors, setValidationErrors] = useState<ValidationError[]>(
    []
  );
  const navigate = useNavigate();

  useEffect(
    function () {
      if (blog) {
        reset(blog);
      }
    },
    [blog, reset]
  );

  if (id && isLoadingBlog) {
    return <p>Loading...</p>;
  }

  async function onSubmit(data: Blog) {
    if (isEditMode) {
      await handleUpdateBlog(data);
    } else {
      await handleCreateBlog(data);
    }
  }

  async function handleUpdateBlog(data: Blog) {
    await updateBlog.mutateAsync(data, {
      onSuccess: function () {
        navigate(`/blog/${id}`);
      },
      onError: function (error) {
        if (Array.isArray(error)) {
          setValidationErrors(error);
        } else {
          setValidationErrors([]);
        }
      },
    });
  }

  async function handleCreateBlog(data: Blog) {
    await createBlog.mutate(data, {
      onSuccess: function (createdBlog) {
        navigate(`/blog/${createdBlog.id}`);
      },
      onError: function (error) {
        if (Array.isArray(error)) {
          setValidationErrors(error);
        } else {
          setValidationErrors([]);
        }
      },
    });
  }

  return (
    <>
      <div className="w-10/12 lg:w-2/3 md:w-10/12 sm:w-10/12">
        <div className="mb-4">
          <p className="font-mono text-2xl">
            {isEditMode ? 'Update blog' : 'New blog'}
          </p>
        </div>
        <form className="w-full" onSubmit={handleSubmit(onSubmit)}>
          <div className={`pt-6 pb-6 pr-8 pl-8 border bg-white rounded`}>
            <Input
              field="title"
              register={register}
              placeholder="Blog title"
              validationErrors={validationErrors}
              className="blog-form-title"
            />
          </div>
          <div className="pt-6 pb-6 pr-8 pl-8 mt-1 border bg-white rounded">
            <InputArea
              field="body"
              register={register}
              placeholder="Blog content"
              validationErrors={validationErrors}
            />
          </div>
          <div className="w-full flex justify-end mt-4">
            <button
              type="button"
              className="btn btn-warning mr-2"
              onClick={() => reset(blog)}
            >
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              {isEditMode ? 'Update' : 'Publish'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
