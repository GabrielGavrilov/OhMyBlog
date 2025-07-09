using System;

namespace Application.Common;

public class PageRequestDto
{
    public int Size { get; set; } = 10;
    public int Page { get; set; } = 1;
}
