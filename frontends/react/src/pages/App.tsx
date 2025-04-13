import Navbar from "../components/Navbar";
import useBlogs from "../hooks/useBlogs";

export default function App() {
  const { blogs, isPending } = useBlogs();

  if (!blogs || isPending) return <p>Loading...</p>;

  return (
    <>
      <Navbar />
      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </>
  );
}
