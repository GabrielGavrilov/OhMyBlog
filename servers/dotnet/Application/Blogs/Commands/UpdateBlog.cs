using System.Net;
using Application.Blogs.DTOs;
using Application.Common;
using Application.Interfaces;
using Domain.Blogs;
using MediatR;

namespace Application.Blogs.Commands;

public class UpdateBlog
{
    public class Command : IRequest<Result<BlogDto>>
    {
        public required string Id { get; set; }
        public required CreateBlogDto CreateBlogDto { get; set; }
    }

    public class Handler(IBlogRepository blogRepository, ICreateBlogAssembler blogAssembler, IBlogValidator blogValidator) : IRequestHandler<Command, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            List<ValidationError> errors = blogValidator.Validate(request.CreateBlogDto);

            if (errors.Count != 0) 
            {
                return Result<BlogDto>.Failure(errors, (int)HttpStatusCode.BadRequest);
            }

            var existingBlog = await blogRepository.GetByIdAsync(request.Id);

            if (existingBlog == null)
            {
                return Result<BlogDto>.Failure((int)HttpStatusCode.NotFound);
            }
            
            await blogRepository.UpdateAsync(blogAssembler.DisassembleInto(request.CreateBlogDto, existingBlog));
            return Result<BlogDto>.Success(blogAssembler.Assemble(existingBlog));
        }
    }

}
