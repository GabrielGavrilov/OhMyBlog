import { createBrowserRouter } from "react-router";

import App from "./pages/App";
import NewBlogPage from "./pages/NewBlogPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/blog/new",
        element: <NewBlogPage />,
      },
    ],
  },
]);
