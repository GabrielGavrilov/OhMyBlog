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
        public required BlogDto BlogDto  { get; set; }
    }

    public class Handler( 
        IUserAccessor userAccessor,
        IBlogRepository repository,
        IBlogAssembler assembler,
        IBlogValidator validator
    ) : IRequestHandler<Command, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            List<ValidationError> errors = validator.Validate(request.BlogDto);

            if (errors.Count != 0)
            {
                return Result<BlogDto>.Failure(errors, (int)HttpStatusCode.BadRequest);
            }

            User user = await userAccessor.GetUserAsync();
            Blog blog = await repository.AddAsync(assembler.Disassemble(request.BlogDto, user.Id));

            return Result<BlogDto>.Success(assembler.Assemble(blog));
        }
    }
}
