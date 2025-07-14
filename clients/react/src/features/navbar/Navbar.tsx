import { Link } from 'react-router';
import { useAuthorized, useLogout } from '../../hooks/AccountHooks';

export default function Navbar() {
  const { data: authorized } = useAuthorized();
  const logout = useLogout();

  return (
    <>
      <header className="bg-white w-full h-16 border border-b flex justify-center">
        <div className="w-4/5 h-full flex">
          <div className="flex justify-start w-1/2 h-full items-center">
            <Link to={'/'} className="font-mono text-2xl tracking-wider">
              OhMyBlog
            </Link>
          </div>
          <div className="flex justify-end w-1/2 h-full items-center">
            {authorized ? (
              <>
                <button className="btn" onClick={() => logout.mutate()}>
                  Log out
                </button>
                <Link to={'/blog/new'}>
                  <button className="btn btn-primary">New Blog</button>
                </Link>
              </>
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
