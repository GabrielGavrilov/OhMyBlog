using System;

namespace Application.Common;

public class PageResponseDto<T>
{
    public required List<T> Content { get; set; }
    public required int PageIndex { get; set; }
    public required int Size { get; set; }
    public required int TotalElements { get; set; }
    public required int TotalPages { get; set; }
}
