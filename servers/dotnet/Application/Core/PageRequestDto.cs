using System;

namespace Application.Core;

public class PageRequestDto
{
    public required int Size { get; set; }
    public required int Page { get; set; }
}
