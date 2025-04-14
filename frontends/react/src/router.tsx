import { createBrowserRouter } from "react-router";

import App from "./pages/App";
import NewBlogPage from "./pages/NewBlogPage";
import BlogPage from "./pages/BlogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/blog/new",
        element: <NewBlogPage />,
      },
      {
        path: "/blog/:id",
        element: <BlogPage />,
      },
    ],
  },
]);
