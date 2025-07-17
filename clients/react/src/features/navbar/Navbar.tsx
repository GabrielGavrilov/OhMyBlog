import { Link, useSearchParams } from 'react-router';
import { useAuthorized } from '../../hooks/AccountHooks';

export default function Navbar() {
  const { data: authorized } = useAuthorized();
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <>
      <header className="bg-white w-full h-16 border border-b flex justify-center">
        <div className="w-4/5 h-full flex">
          <div className="flex justify-start w-1/4 h-full items-center">
            <Link to={'/'} className="font-mono text-2xl tracking-wider">
              OhMyBlog
            </Link>
          </div>
          <div className="flex justify-center w-3/4 h-full items-center">
            <input
              type="text"
              placeholder="Search"
              className="border rounded w-full pt-2 pb-2 pl-4 pr-4 focus:outline-none"
              onChange={(e) =>
                setSearchParams({
                  ...Object.fromEntries(searchParams.entries()),
                  search: e.target.value,
                })
              }
            />
          </div>
          <div className="flex justify-end w-1/4 h-full items-center">
            {authorized ? (
              <Link to={'/blog/new'}>
                <button className="btn btn-primary">New Blog</button>
              </Link>
            ) : (
              <>
                <Link to={'/login'}>
                  <button className="btn">Log in</button>
                </Link>
                <Link to={'/register'}>
                  <button className="btn btn-primary">Create account</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
