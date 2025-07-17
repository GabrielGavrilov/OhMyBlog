import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm } from 'react-hook-form';
import {
  useBlog,
  useCreateBlog,
  useUpdateBlog,
} from '../../hooks/useBlogActions';
import { CreateBlogDto } from '../../lib/types/Blog';
import { ValidationError } from '../../lib/types/ValidationError';
import Input from '../../components/Input';
import InputArea from '../../components/InputArea';

export default function BlogForm() {
  const { id } = useParams();
  const isEditMode: boolean = Boolean(id);
  const { data: blog, isLoading: isLoadingBlog } = useBlog(id);
  const createBlog = useCreateBlog();
  const updateBlog = useUpdateBlog(id);
  const { register, handleSubmit, reset } = useForm<CreateBlogDto>();
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

  async function onSubmit(data: CreateBlogDto) {
    if (isEditMode) {
      await handleUpdateBlog(data);
    } else {
      await handleCreateBlog(data);
    }
  }

  async function handleUpdateBlog(data: CreateBlogDto) {
    await updateBlog.mutateAsync(data as CreateBlogDto, {
      onSuccess: () => navigate(`/blog/${id}`),
      onError: handleError,
    });
  }

  async function handleCreateBlog(data: CreateBlogDto) {
    await createBlog.mutate(data, {
      onSuccess: (createdBlog) => navigate(`/blog/${createdBlog.id}`),
      onError: handleError,
    });
  }

  function handleError(error: unknown) {
    if (Array.isArray(error)) {
      setValidationErrors(error);
    } else {
      setValidationErrors([]);
    }
  }

  return (
    <>
      <div>
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
