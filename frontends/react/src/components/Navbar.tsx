export default function Navbar() {
  return (
    <>
      <header className="bg-white w-full h-16 border border-b flex justify-center">
        <div className="w-4/5 h-full flex">
          <div className="flex justify-start w-1/2 h-full items-center">
            <p className="font-mono text-2xl tracking-wider">OhMyBlog</p>
          </div>
          <div className="flex justify-end w-1/2 h-full items-center">
            <div className="mr-4">
              <button className="btn">Log in</button>
            </div>

            <button className="btn btn-primary">New Blog</button>
          </div>
        </div>
      </header>
    </>
  );
}
