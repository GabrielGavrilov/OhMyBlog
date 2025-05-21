using System;

namespace Application.Core;

public class PageResponseDto<T>
{
    public required List<T> Content { get; set;  }
    public required int PageIndex { get; set; }
    public required int TotalPages { get; set; }
    public bool HasPreviousPage => PageIndex > 1;
    public bool HasNextPage => PageIndex < TotalPages;
}
