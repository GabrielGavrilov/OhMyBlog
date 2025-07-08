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
        public required BlogDto BlogDto { get; set; }
    }

    public class Handler(IBlogRepository repository, IBlogAssembler assembler, IBlogValidator validator) : IRequestHandler<Command, Result<BlogDto>>
    {
        public async Task<Result<BlogDto>> Handle(Command request, CancellationToken cancellationToken)
        {
            List<ValidationError> errors = validator.Validate(request.BlogDto);

            if (errors.Count != 0) 
            {
                return Result<BlogDto>.Failure(errors, (int)HttpStatusCode.BadRequest);
            }

            var existingBlog = await repository.GetById(request.Id);

            if (existingBlog == null)
            {
                return Result<BlogDto>.Failure((int)HttpStatusCode.NotFound);
            }
            
            await repository.UpdateAsync(assembler.DisassembleInto(request.BlogDto, existingBlog));
            return Result<BlogDto>.Success(assembler.Assemble(existingBlog));
        }
    }

}
