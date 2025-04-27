using Application.Blogs.Commands;
using Application.Blogs.Queries;
using Domain;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Blog>>> GetBlogs()
        {
            return await Mediator.Send(new GetBlogList.Query());
        }

        [HttpPost]
        public async Task<ActionResult<Blog>> CreateBlog(Blog blog)
        {
            return await Mediator.Send(new CreateBlog.Command{Blog = blog});
        }

    }
}
