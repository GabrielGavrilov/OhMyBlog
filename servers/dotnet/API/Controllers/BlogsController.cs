using Application.Blogs.Commands;
using Application.Blogs.DTOs;
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
        public async Task<ActionResult<BlogDto>> CreateBlog(BlogDto blogDto)
        {
            return await Mediator.Send(new CreateBlog.Command{BlogDto = blogDto});
        }

    }
}
