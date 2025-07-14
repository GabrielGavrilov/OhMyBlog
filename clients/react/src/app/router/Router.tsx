import { createBrowserRouter } from 'react-router';

import App from '../layout/App';
import Blog from '../../features/blog/Blog';
import RequireAuth from './RequireAuth';
import RequireNoAuth from './RequireNoAuth';
import AuthForm from '../../features/account/form/AuthForm';
import BlogForm from '../../features/blog/BlogForm';
import Profile from '../../features/account/profile/Profile';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/user/:id',
        element: <Profile />,
      },
      {
        path: '/blog/:id',
        element: <Blog />,
      },
      {
        element: <RequireAuth />,
        children: [
          {
            path: '/blog/new',
            element: <BlogForm />,
          },
          {
            path: '/blog/update/:id',
            element: <BlogForm />,
          },
        ],
      },
      {
        element: <RequireNoAuth />,
        children: [
          {
            path: '/register',
            element: <AuthForm mode="register" />,
          },
          {
            path: '/login',
            element: <AuthForm mode="login" />,
          },
        ],
      },
    ],
  },
]);
