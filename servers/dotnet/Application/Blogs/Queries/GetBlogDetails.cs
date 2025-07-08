using Application.Blogs.DTOs;
using Application.Core;
using Domain.Blogs;
using MediatR;

namespace Application.Blogs.Queries;

public class GetBlogDetails
{
    public class Query : IRequest<Result<BlogDto>> 
    {
        public required string Id { get; set; }
    }

    public class Handler(IBlogRepository blogRepository, BlogAssembler blogAssembler) : IRequestHandler<Query, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Query request, CancellationToken cancellationToken)
        {
            Blog? blog = await blogRepository.GetById(request.Id, cancellationToken);
            return Result<BlogDto>.Success(blogAssembler.Assemble(blog!)) ?? Result<BlogDto>.Failure(404);
        }
    }
}
