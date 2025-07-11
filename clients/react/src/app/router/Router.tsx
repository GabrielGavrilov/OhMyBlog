import { createBrowserRouter } from 'react-router';

import App from '../pages/App';
import BlogPage from '../pages/BlogPage';
import RequireAuth from './RequireAuth';
import RequireNoAuth from './RequireNoAuth';
import AuthForm from '../../features/account/AuthForm';
import BlogForm from '../../features/blog/BlogForm';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/blog/:id',
        element: <BlogPage />,
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
