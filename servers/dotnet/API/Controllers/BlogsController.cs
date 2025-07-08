using Application.Blogs.Commands;
using Application.Blogs.DTOs;
using Application.Blogs.Queries;
using Application.Common;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<BlogDto>>> GetBlogs([FromQuery] PageRequestDto pageRequestDto)
        {
            return HandleResult(await Mediator.Send(new FindBlogs.Query { PageRequestDto = pageRequestDto }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDto>> GetBlogDetails(string id)
        {
            return HandleResult(await Mediator.Send(new GetBlogById.Query { Id = id }));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BlogDto>> CreateBlog(BlogDto blogDto)
        {
            return HandleResult(await Mediator.Send(new CreateBlog.Command { BlogDto = blogDto }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "BlogAuthorPolicy")]
        public async Task<ActionResult<BlogDto>> UpdateBlog(string id, BlogDto blogDto)
        {
            return HandleResult(await Mediator.Send(new UpdateBlog.Command { Id = id, BlogDto = blogDto }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "BlogAuthorPolicy")]
        public async Task<ActionResult<Unit>> DeleteBlog(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteBlog.Command { Id = id }));
        }
    }
}
