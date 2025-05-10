using System;
using Application.Core;
using Domain;
using Domain.Blogs.Assemblers;
using Domain.Blogs.DTOs;
using Domain.Blogs.Entities;
using Domain.Blogs.Validators;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Commands;

public class UpdateBlog
{
    public class Command : IRequest<Result<BlogDto>>
    {
        public required string Id { get; set; }
        public required BlogDto BlogDto { get; set; }
    }

    public class Handler(AppDbContext context, BlogAssembler blogAssembler, BlogValidator blogValidator) : IRequestHandler<Command, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            Dictionary<string, string> errors = blogValidator.Validate(request.BlogDto);

            if (errors.Count > 0) 
            {
                return Result<BlogDto>.Failure(errors, 400);
            }

            Blog? foundBlog = await context.Blogs.FindAsync([request.Id], cancellationToken);

            if (foundBlog == null)
            {
                return Result<BlogDto>.Failure(404);
            }
            
            Blog updatedBlog = blogAssembler.DisassembleInto(request.BlogDto, foundBlog);
            await context.SaveChangesAsync(cancellationToken);

            return Result<BlogDto>.Success(blogAssembler.Assemble(updatedBlog));
        }
    }

}
