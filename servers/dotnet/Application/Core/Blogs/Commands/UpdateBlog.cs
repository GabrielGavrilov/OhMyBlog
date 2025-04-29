using System;
using Application.Blogs.Assemblers;
using Application.Blogs.DTOs;
using Domain;
using MediatR;
using Persistence;

namespace Application.Blogs.Commands;

public class UpdateBlog
{
    public class Command : IRequest<BlogDto>
    {
        public required string Id { get; set; }
        public required BlogDto BlogDto { get; set; }
    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, BlogDto>
    {
        private readonly BlogAssembler _blogAssembler = new BlogAssembler();

        public async Task<BlogDto> Handle(Command request, CancellationToken cancellationToken)
        {
            Blog foundBlog = await context.Blogs.FindAsync([request.Id], cancellationToken)
                ?? throw new Exception("Blog does not exist.");
            
            Blog updatedBlog = _blogAssembler.DisassembleInto(request.BlogDto, foundBlog);
            await context.SaveChangesAsync(cancellationToken);

            return _blogAssembler.Assemble(updatedBlog);

        }
    }

}
