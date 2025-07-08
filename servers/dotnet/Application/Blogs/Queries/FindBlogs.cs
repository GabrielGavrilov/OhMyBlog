using System;
using Application.Blogs.DTOs;
using Application.Core;
using Application.Interfaces;
using Domain.Blogs;
using MediatR;

namespace Application.Blogs.Queries;

public class FindBlogs
{
    public class Query : IRequest<Result<PageResponseDto<BlogDto>>>
    {
        public required PageRequestDto PageRequestDto { get;  set; }
    }

    public class Handler(IBlogRepository repository, IBlogAssembler assembler, IPageAssembler pageAssembler) : IRequestHandler<Query, Result<PageResponseDto<BlogDto>>>
    {
        public async Task<Result<PageResponseDto<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            BlogFilter blogFilter = new BlogFilter
            {
                Page = request.PageRequestDto.Page,
                PerPage = request.PageRequestDto.Size
            };

            List<Blog> blogs = repository.Find(blogFilter);
            int totalElements = await repository.Count(blogFilter);

            return Result<PageResponseDto<BlogDto>>.Success(pageAssembler.Assemble(assembler.Assemble(blogs), request.PageRequestDto, await repository.Count(blogFilter)));
        }
    }
}
