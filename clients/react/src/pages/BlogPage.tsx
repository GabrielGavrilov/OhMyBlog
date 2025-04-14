import { Link, useNavigate, useParams } from "react-router";
import useBlogs from "../hooks/useBlogs";

export default function BlogPage() {
  const { id } = useParams();
  const { blog, deleteBlog } = useBlogs(id);
  const navigate = useNavigate();

  function handleDelete() {
    deleteBlog.mutate();
    navigate("/");
  }

  return (
    <>
      <p>{blog?.title}</p>
      <p>{blog?.body}</p>
      <button onClick={handleDelete}>Delete</button>
      <Link to={`/blog/update/${id}`}>
        <button>Update</button>
      </Link>
    </>
  );
}
