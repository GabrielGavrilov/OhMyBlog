import { createBrowserRouter } from 'react-router';

import App from '../pages/App';
import NewBlogPage from '../pages/NewBlogPage';
import BlogPage from '../pages/BlogPage';
import UpdateBlogPage from '../pages/UpdateBlogPage';
import RegisterPage from '../pages/RegisterPage';
import LoginPage from '../pages/LoginPage';
import RequireAuth from './RequireAuth';
import RequireNoAuth from './RequireNoAuth';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/blog/new',
            element: <NewBlogPage />,
          },
          {
            path: '/blog/:id',
            element: <BlogPage />,
          },
          {
            path: '/blog/update/:id',
            element: <UpdateBlogPage />,
          },
        ],
      },
      {
        element: <RequireNoAuth />,
        children: [
          {
            path: '/register',
            element: <RegisterPage />,
          },
          {
            path: '/login',
            element: <LoginPage />,
          },
        ],
      },
    ],
  },
]);
