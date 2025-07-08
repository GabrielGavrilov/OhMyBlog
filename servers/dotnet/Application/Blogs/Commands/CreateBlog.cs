using Application.Blogs.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain.Blogs;
using Domain.Users;
using MediatR;

namespace Application.Blogs.Commands;

public class CreateBlog
{
    public class Command : IRequest<Result<BlogDto>>
    {
        public required BlogDto BlogDto  { get; set; }
    }

    public class Handler( 
        IUserAccessor userAccessor,
        IBlogRepository blogRepository,
        BlogAssembler blogAssembler,
        BlogValidator blogValidator
    ) : IRequestHandler<Command, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            List<ValidationError> errors = blogValidator.Validate(request.BlogDto);

            if (errors.Count != 0)
            {
                return Result<BlogDto>.Failure(errors, 400);
            }

            User user = await userAccessor.GetUserAsync();
            Blog blog = await blogRepository.AddAsync(blogAssembler.Disassemble(request.BlogDto, user.Id));

            return Result<BlogDto>.Success(blogAssembler.Assemble(blog));
        }
    }
}
