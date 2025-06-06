using System;
using System.Runtime.CompilerServices;
using Application.Core;
using Application.Interfaces;
using Domain;
using Domain.Blogs.Assemblers;
using Domain.Blogs.DTOs;
using Domain.Blogs.Entities;
using Domain.Blogs.Interfaces;
using Domain.Blogs.Validators;
using Domain.Users.Entities;
using MediatR;
using Persistence;
using Persistence.Blogs;

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

            if (errors.Count > 0)
            {
                return Result<BlogDto>.Failure(errors, 400);
            }

            User user = await userAccessor.GetUserAsync();
            request.BlogDto.UserId = user.Id;
            
            Blog blog = await blogRepository.AddAsync(blogAssembler.Disassemble(request.BlogDto));

            return Result<BlogDto>.Success(blogAssembler.Assemble(blog));
        }
    }
}
