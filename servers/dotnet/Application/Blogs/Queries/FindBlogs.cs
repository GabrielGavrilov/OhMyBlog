using System;
using Application.Blogs.DTOs;
using Application.Common;
using Application.Interfaces;
using Domain.Blogs;
using MediatR;

namespace Application.Blogs.Queries;

public class FindBlogs
{
    public class Query : IRequest<Result<PageResponseDto<BlogDto>>>
    {
        public required BlogSearchCriteriaDto BlogSearchCriteriaDto { get; set; }
        public required PageRequestDto PageRequestDto { get; set; }
    }

    public class Handler(IBlogRepository blogRepository, IBlogAssembler blogAssembler, IPageAssembler pageAssembler) : IRequestHandler<Query, Result<PageResponseDto<BlogDto>>>
    {
        public async Task<Result<PageResponseDto<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            BlogFilter blogFilter = new()
            {
                UserIds = request.BlogSearchCriteriaDto.UserId.Any()
                    ? request.BlogSearchCriteriaDto.UserId
                    : null,
                Sort = request.BlogSearchCriteriaDto.Sort,
                SortBy = request.BlogSearchCriteriaDto.SortBy,
                Page = request.PageRequestDto.Page,
                PerPage = request.PageRequestDto.Size
            };

            List<Blog> blogs = blogRepository.Find(blogFilter);
            return Result<PageResponseDto<BlogDto>>.Success(pageAssembler.Assemble(blogAssembler.Assemble(blogs), request.PageRequestDto, await blogRepository.CountAsync(blogFilter)));
        }
    }
}
