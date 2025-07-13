using System.Net;
using Application.Blogs.DTOs;
using Application.Common;
using Application.Interfaces;
using Domain.Blogs;
using Domain.Users;
using MediatR;

namespace Application.Blogs.Commands;

public class CreateBlog
{
    public class Command : IRequest<Result<BlogDto>>
    {
        public required CreateBlogDto CreateBlogDto  { get; set; }
    }

    public class Handler( 
        IUserAccessor userAccessor,
        IBlogRepository blogRepository,
        ICreateBlogAssembler blogAssembler,
        IBlogValidator blogValidator
    ) : IRequestHandler<Command, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            List<ValidationError> errors = blogValidator.Validate(request.CreateBlogDto);

            if (errors.Count != 0)
            {
                return Result<BlogDto>.Failure(errors, (int)HttpStatusCode.BadRequest);
            }

            User user = await userAccessor.GetUserAsync();
            Blog blog = await blogRepository.AddAsync(blogAssembler.Disassemble(request.CreateBlogDto, user.Id));

            return Result<BlogDto>.Success(blogAssembler.Assemble(blog));
        }
    }
}
