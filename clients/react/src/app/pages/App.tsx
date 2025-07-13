import { Outlet, useLocation } from 'react-router';
import Navbar from '../../features/navbar/Navbar';
import BlogList from '../../features/blog/BlogList';

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <div className="w-full flex justify-center">
        <div className="w-10/12 flex justify-center lg:w-2/3 md:w-10/12 sm:w-10/12">
          {location.pathname === '/' ? (
            <BlogList />
          ) : (
            <div className="w-full">
              <Outlet />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
