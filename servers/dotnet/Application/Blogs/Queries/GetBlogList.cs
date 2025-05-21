using System;
using Application.Core;
using Domain;
using Domain.Blogs.Assemblers;
using Domain.Blogs.DTOs;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Blogs.Queries;

public class GetBlogList
{
    public class Query : IRequest<Result<PageResponseDto<BlogDto>>>
    {
        public required PageRequestDto PageRequestDto { get;  set; }
    }

    public class Handler(AppDbContext context, BlogAssembler blogAssembler) : IRequestHandler<Query, Result<PageResponseDto<BlogDto>>>
    {
        public Task<Result<PageResponseDto<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<BlogDto> blogDtoList = blogAssembler.Assemble(context.Blogs
                .Include(blog => blog.User)
                .AsEnumerable()
                .OrderByDescending(x => x.CreatedAt)
                .Skip((request.PageRequestDto.Page - 1) * request.PageRequestDto.Size)
                .Take(request.PageRequestDto.Size)
                .ToList()
            );

            return Task.FromResult(Result<PageResponseDto<BlogDto>>.Success(
                new PageResponseDto<BlogDto>
                {
                    Content = blogDtoList,
                    PageIndex = request.PageRequestDto.Page,
                    TotalPages = blogDtoList.Count
                }
            ));
        }
    }

}
