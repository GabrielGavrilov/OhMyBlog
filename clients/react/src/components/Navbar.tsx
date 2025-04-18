import { Link } from 'react-router';
import useAuth from '../hooks/useAuth';
import { useEffect } from 'react';

export default function Navbar() {
  const { userInfo } = useAuth();

  useEffect(() => {
    console.log(userInfo);
  }, []);

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
            {userInfo !== undefined ? (
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
