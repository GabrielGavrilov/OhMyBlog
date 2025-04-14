import { useParams } from "react-router";

export default function BlogPage() {
  const { id } = useParams();

  return (
    <>
      <p>{id}</p>
    </>
  );
}
