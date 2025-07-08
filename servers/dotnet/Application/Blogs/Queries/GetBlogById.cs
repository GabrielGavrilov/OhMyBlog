using System.Net;
using Application.Blogs.DTOs;
using Application.Core;
using Domain.Blogs;
using MediatR;

namespace Application.Blogs.Queries;

public class GetBlogById
{
    public class Query : IRequest<Result<BlogDto>> 
    {
        public required string Id { get; set; }
    }

    public class Handler(IBlogRepository blogRepository, BlogAssembler blogAssembler) : IRequestHandler<Query, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            var blog = await blogRepository.GetById(request.Id);
            return blog == null
                ? Result<BlogDto>.Failure((int)HttpStatusCode.BadRequest)
                : Result<BlogDto>.Success(blogAssembler.Assemble(blog));
        }
    }
}
