using Application.Blogs.Commands;
using Application.Blogs.DTOs;
using Application.Blogs.Queries;
using Application.Common;
using Domain.Blogs;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BlogsController : BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<BlogDto>>> GetBlogs([FromQuery] BlogSearchCriteriaDto blogSearchCriteriaDto, [FromQuery] PageRequestDto pageRequestDto)
        {
            return HandleResult(await Mediator.Send(new FindBlogs.Query
            {
                BlogSearchCriteriaDto = blogSearchCriteriaDto,
                PageRequestDto = pageRequestDto
            }));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BlogDto>> GetBlogDetails(string id)
        {
            return HandleResult(await Mediator.Send(new GetBlogById.Query { Id = id }));
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<BlogDto>> CreateBlog(CreateBlogDto createBlogDto)
        {
            return HandleResult(await Mediator.Send(new CreateBlog.Command { CreateBlogDto = createBlogDto }));
        }

        [HttpPut("{id}")]
        [Authorize(Policy = "BlogAuthorPolicy")]
        public async Task<ActionResult<BlogDto>> UpdateBlog(string id, CreateBlogDto createBlogDto)
        {
            return HandleResult(await Mediator.Send(new UpdateBlog.Command { Id = id, CreateBlogDto = createBlogDto }));
        }

        [HttpDelete("{id}")]
        [Authorize(Policy = "BlogAuthorPolicy")]
        public async Task<ActionResult<Unit>> DeleteBlog(string id)
        {
            return HandleResult(await Mediator.Send(new DeleteBlog.Command { Id = id }));
        }
    }
}
