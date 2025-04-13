import { Outlet, useLocation } from "react-router";
import Navbar from "../components/Navbar";
import BlogList from "../components/BlogList";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Navbar />
      {location.pathname === "/" ? <BlogList /> : <Outlet />}
    </>
  );
}
