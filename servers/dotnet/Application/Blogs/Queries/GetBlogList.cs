using System;
using Application.Core;
using Domain;
using Domain.Blogs.Assemblers;
using Domain.Blogs.DTOs;
using Domain.Blogs.Entities;
using Domain.Blogs.Interfaces;
using Domain.Blogs.Repository;
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

    public class Handler(IBlogRepository blogRepository, BlogAssembler blogAssembler) : IRequestHandler<Query, Result<PageResponseDto<BlogDto>>>
    {
        public async Task<Result<PageResponseDto<BlogDto>>> Handle(Query request, CancellationToken cancellationToken)
        {
            List<Blog> blogs = blogRepository.Find(new BlogFilter { Page = request.PageRequestDto.Page, PerPage = request.PageRequestDto.Size });
            int totalElements = await blogRepository.Count();

            return Result<PageResponseDto<BlogDto>>.Success(new PageResponseDto<BlogDto>
            {
                Content = blogAssembler.Assemble(blogs),
                PageIndex = request.PageRequestDto.Page,
                Size = request.PageRequestDto.Size,
                TotalElements = totalElements,
                TotalPages = (int)Math.Ceiling((double)totalElements / request.PageRequestDto.Size)
            });
        }
    }
}
