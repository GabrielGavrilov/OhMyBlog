using System;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Application.Core;
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

        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            if (request.BlogDto.Title.Length < 4)
            {
                return Result<BlogDto>.Failure("Blog title too small", 400);
            }

            User user = await userAccessor.GetUserAsync();
            Blog blog = _blogAssembler.Disassemble(request.BlogDto);

            blog.UserId = user.Id;

            context.Blogs.Add(blog);
            await context.SaveChangesAsync();
            
            return Result<BlogDto>.Success(_blogAssembler.Assemble(blog));
        }
    }
}
