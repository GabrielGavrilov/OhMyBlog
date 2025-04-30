using System;
using System.Runtime.CompilerServices;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Application.Core;
using Application.Core.Blogs.Validators;
using Application.Interfaces;
using Domain;
using MediatR;
using Persistence;

namespace Application.Blogs.Commands;

public class CreateBlog
{

    public class Command : IRequest<Result<BlogDto>>
    {
        public required BlogDto BlogDto  { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<BlogDto>>
    {

        private readonly BlogAssembler _blogAssembler = new BlogAssembler();
        private readonly BlogValidator _blogValidator = new BlogValidator();

        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            Dictionary<string, string> errors = _blogValidator.Validate(request.BlogDto);

            if (errors.Count > 0)
            {
                return Result<BlogDto>.Failure(errors, 400);
            }

            User user = await userAccessor.GetUserAsync();
            request.BlogDto.UserId = user.Id;
            
            Blog blog = _blogAssembler.Disassemble(request.BlogDto);

            context.Blogs.Add(blog);
            await context.SaveChangesAsync();

            return Result<BlogDto>.Success(_blogAssembler.Assemble(blog));
        }
    }
}
