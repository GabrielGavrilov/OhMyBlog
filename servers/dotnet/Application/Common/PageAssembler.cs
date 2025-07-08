using System;
using Application.Interfaces;

namespace Application.Common;

public class PageAssembler : IPageAssembler
{
    public PageResponseDto<T> Assemble<T>(List<T> content, PageRequestDto pageRequestDto, int totalElements)
    {
        return new()
        {
            Content = content,
            PageIndex = pageRequestDto.Page,
            Size = pageRequestDto.Size,
            TotalElements = totalElements,
            TotalPages = (int)Math.Ceiling((double)totalElements / pageRequestDto.Size)
        };
    }
}
