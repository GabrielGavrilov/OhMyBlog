using System;

namespace Application.Common;

public class PageRequestDto
{
    public int Size { get; set; } = 25;
    public int Page { get; set; } = 1;
}
