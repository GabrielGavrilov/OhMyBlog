import { createBlog } from '@/lib/actions/blog.actions';
import { useEffect, useState } from 'react';

export default function BlogForm() {
  return (
    <>
      <div className="w-10/12 lg:w-2/3 md:w-10/12 sm:w-10/12">
        <div className="mb-4">
          <p className="font-mono text-2xl">
            {/* {id ? 'Update blog' : 'New blog'} */}
            New blog
          </p>
        </div>
        <form className="w-full" action={createBlog}>
          <div className={`pt-6 pb-6 pr-8 pl-8 border bg-white rounded`}>
            <input
              placeholder="Blog title"
              className={`title-input`}
              name="title"
            />
          </div>
          <div className="pt-6 pb-6 pr-8 pl-8 mt-1 border bg-white rounded">
            <textarea
              placeholder="Blog content"
              className="w-full h-96 focus:outline-none text-xl"
              name="body"
            ></textarea>
          </div>
          <div className="w-full flex justify-end mt-4">
            <button type="button" className="btn btn-warning mr-2">
              Reset
            </button>
            <button type="submit" className="btn btn-primary">
              {/* {id ? 'Update' : 'Publish'} */}
              Publish
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
