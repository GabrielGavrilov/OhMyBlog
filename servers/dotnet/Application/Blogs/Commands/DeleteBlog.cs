using System.Net;
using Application.Common;
using Domain.Blogs;
using MediatR;

namespace Application.Blogs.Commands;

public class DeleteBlog
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(IBlogRepository blogRepository) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var blog = await blogRepository.GetByIdAsync(request.Id);
            
            if (blog == null)
            {
                return Result<Unit>.Failure((int)HttpStatusCode.BadRequest);
            }

            await blogRepository.DeleteAsync(blog);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}
