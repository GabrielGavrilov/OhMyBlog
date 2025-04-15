import { Link } from 'react-router';

export default function Navbar() {
  return (
    <>
      <header className="bg-white w-full h-16 border border-b flex justify-center mb-8">
        <div className="w-4/5 h-full flex">
          <div className="flex justify-start w-1/2 h-full items-center">
            <Link to={'/'} className="font-mono text-2xl tracking-wider">
              OhMyBlog
            </Link>
          </div>
          <div className="flex justify-end w-1/2 h-full items-center">
            <Link to={'/blog/new'}>
              <button className="btn btn-primary">New Blog</button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
}
